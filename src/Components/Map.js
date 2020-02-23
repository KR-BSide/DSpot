import React, { Component } from 'react';
import PropTypes from 'prop-types';

var map;
var markers = [];
var subways = [];
var totalList = [];
var spotIndex = 0;

const userLocationArr = [];
const chktraffic = [];
let resultdrawArr = [];
let resultMarker = [];
let routDetailArr = [];
class Map extends Component {


    componentDidMount() {
        this._getMap();
    }

    state = {
        routeDetails : []
    }

    _getMap = () => {
        map = new window.Tmapv2.Map("map_div", { // 지도가 생성될 div
            width: "100%", // 지도의 넓이
            height: "400px", // 지도의 높이
            zoom: 14

        });

        map.addListener("click", getLonlat);
    }

    _getSpot = () => {
        const location = this._getLocation(userLocationArr);
        this._getSubway({ dSpotlat: location.lat, dSpotlng: location.lng });
    }

    _getSubway = async ({ dSpotlat, dSpotlng }) => {
        const searchPoiInfo = await this._callSubwayCategoryApi({ dSpotlat, dSpotlng, category: "지하철;" });
        subways = searchPoiInfo.pois.poi;
        subways.map((subway, index) => {
            this._callCafeCategoryApi({ dSpotlat: parseFloat(subway.frontLat), dSpotlng: parseFloat(subway.frontLon), category: "스터디카페;카페;", i: index })
            .then (result => {
                if (result) {
                    const totalCount = result.searchPoiInfo.totalCount;
                    totalList.push({ totalCount: totalCount, index: index });
                    subways[index].cafes = result.searchPoiInfo    
                    if (subways.length == totalList.length) {
                        totalList.sort(function (a, b) { // 오름차순
                            return b["totalCount"] - a["totalCount"];
                        });
                        this._createDSpot();
                    }
                }
            });
        });
        
    }

    _callSubwayCategoryApi = async ({ dSpotlat, dSpotlng, category }) => {
        var url = "https://apis.openapi.sk.com/tmap/pois/search/around?version=1&"
        var params = {
            "categories": category,
            "resCoordType": "WGS84GEO",//응답 좌표계 유형
            "reqCoordType": "WGS84GEO",//요청 좌표계 유형
            "centerLon": dSpotlng,
            "centerLat": dSpotlat,
            "appKey": "l7xxbfb4b13f846e43b8b0924bbda1166055",
            "count": 10,
            "radius": 10
        }
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        return fetch(url + query)
            .then(response => response.json())
            .then(json => json.searchPoiInfo)
            .catch(err => console.log(err));
    }

    _callCafeCategoryApi = async ({ dSpotlat, dSpotlng, category, i }) => {
        var url = "https://apis.openapi.sk.com/tmap/pois/search/around?version=1&"
        var params = {
            "categories": category,
            "resCoordType": "WGS84GEO",//응답 좌표계 유형
            "reqCoordType": "WGS84GEO",//요청 좌표계 유형
            "centerLon": dSpotlng,
            "centerLat": dSpotlat,
            "appKey": "l7xxbfb4b13f846e43b8b0924bbda1166055",
            "count": 10,
            "radius": 5
        }
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        const response = await fetch(url + query)
            .catch(err => {
                console.log(err);
                return;
            });
        const responseOk = response && response.ok;
        if (responseOk) {
            return await response.json();
        }
    }

    _createDSpot() {
        if (totalList.length <= spotIndex) {
            alert("다음 검색 위치가 없습니다. 처음부터 다시 시작해주세요."); return;
        } 

        // 지도 라인 초기화
        if (spotIndex != 0) 
            this._initRoute();

        const index = totalList[spotIndex].index
        const marker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(subways[index].frontLat, subways[index].frontLon), //Marker의 중심좌표 설정.
            icon: 'http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_b.png', //Marker의 아이콘.
            map: map //Marker가 표시될 Map 설정.
        });
        resultMarker.push(marker);
        for (var i in userLocationArr)
            this._routeDSpot(i)
            
    }

    _initRoute = () => {
        this._resetList(resultMarker);
        this._resetList(resultdrawArr);
        this._resetRouteDetail();
        resultdrawArr = []; 
        resultMarker = [];
    }
    _routeDSpot = async(i) => {
        const startX = userLocationArr[i].lng;
        const startY = userLocationArr[i].lat;
        const endX = subways[totalList[spotIndex].index].frontLon;
        const endY = subways[totalList[spotIndex].index].frontLat;
        const header = {
            appKey : "l7xxbfb4b13f846e43b8b0924bbda1166055"            
        };
        const data = {
            startX : startX,
            startY : startY,
            endX :endX,
            endY : endY,
            reqCoordType : "WGS84GEO",
            resCoordType : "WGS84GEO",
            angle : "172",
            searchOption : "0",
            trafficInfo : "Y"
        }
        const url = "https://apis.openapi.sk.com/tmap/routes?version=1&format=json";
        const response = await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'appKey' : "l7xxbfb4b13f846e43b8b0924bbda1166055"    
            }, 
            body : JSON.stringify(data)
        })
        .catch(err => console.log(err));
        const responseOk = response && response.ok;
        if (responseOk) {
            const result = await response.json();
            this._setRoute(result.features);
        }
    }

    _setRoute = (result) => {
        
        const tDistance = (result[0].properties.totalDistance / 1000).toFixed(1);
        const tTime = (result[0].properties.totalTime / 60).toFixed(0);
        this._addRouteDetail({distance : tDistance, time : tTime});
        for (var i in result) {
            var geometry = result[i].geometry;
            var properties = result[i].properties;

            if (geometry.type == "LineString") {
                chktraffic.push(geometry.traffic);
                const sectionInfos = [];
                for (var j in geometry.coordinates) {
                    // 경로들의 결과값들을 포인트 객체로 변환 
                    const latlng = new window.Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                    const convertChange = new window.Tmapv2.LatLng(
                        latlng.y,
                        latlng.x); 
                    sectionInfos.push(convertChange);
                }
                const poli = new window.Tmapv2.Polyline({
                    path : sectionInfos,
                    strokeColor : "#DD0000",
                    strokeWeight : 6,
                    map : map
                });
                resultdrawArr.push(poli);  
            } else {
        
                var markerImg = "";
                var pType = "";

                if (properties.pointType == "S") { //출발지 마커
                    markerImg = "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                    pType = "S";
                } else if (properties.pointType == "E") { //도착지 마커
                    markerImg = "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                    pType = "E";
                } else { //각 포인트 마커
                    markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                    pType = "P"
                }

                // 경로들의 결과값들을 포인트 객체로 변환 
                var latlon = new window.Tmapv2.Point(
                        geometry.coordinates[0],
                        geometry.coordinates[1]);
                // 포인트 객체를 받아 좌표값으로 다시 변환
                var convertPoint = new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                        latlon);

                var routeInfoObj = {
                    markerImage : markerImg,
                    lng : latlon.x,
                    lat : latlon.y
                };                
            }  
        }    
    }

    _addRouteDetail = ({distance, time}) => {
        const {routeDetails} = this.state;
        this.setState({
            routeDetails : routeDetails.concat({
                distance : distance,
                time : time
            })
        });
    }

    _getLocation = (locationObj) => {
        let latList = [];
        let lngList = [];
        for (var i in locationObj) {
            latList.push(locationObj[i].lat);
            lngList.push(locationObj[i].lng);
        }
        return {lat : this._getMiddle(latList), lng : this._getMiddle(lngList) };
    }

    _getMiddle = (list) => {
        var max = list[0];
        var min = list[0];
        list.map(num => {
            if (max < num)
                max = num;
            if (min > num)
                min = num;
        })
        return min + ((max - min) / 2)
    }
    
    _nextSpot = () => {
        spotIndex++ 
        this._createDSpot();
    }


    _resetMap = () => {
        this._resetList(resultMarker);
        this._resetList(resultdrawArr);
        this._resetList(markers);
        this._resetRouteDetail();
        resultMarker = [];
        resultdrawArr = [];
        markers = [];
        spotIndex=0;
    }

    _resetList = (list) => {
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++)
                list[i].setMap(null);
        }
    }

    _resetRouteDetail = () => {
        const {routeDetails} = this.state;
        this.setState({
            routeDetails : []
        });
    }
    render() {
        const {routeDetails} = this.state;
        const list = routeDetails.map(
            ({distance, time}, index) => (
            <li key={index}>
                <p>
                    <span>거리 : </span>
                    <span>{distance}km</span>
                </p>
                <p>
                    <span>소요시간 : </span>
                    <span>{time}분</span>
                </p>
            </li>
            )
        );

        return (
            <div>
                <div id="map_div"></div>
                <button onClick={() => this._getSpot()}>중간지점</button>
                <button onClick={() => this._nextSpot()}>다른 역 찾기</button>
                <button onClick={() => this._resetMap()}>처음부터 다시</button>
                <hr/>
                <div>
                    <ul>{list}</ul>
                </div>
            </div>
        )
    };
}

function getLonlat(e) {
    addMarker({ lat : e.latLng.lat() , lng : e.latLng.lng()});
    userLocationArr.push({ lat : e.latLng.lat() , lng : e.latLng.lng()});
}

function addMarker(infoObj) {
    if (!infoObj.markerImage) {
        infoObj.markerImage = "http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_a.png"
    }
    const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(infoObj.lat, infoObj.lng), //Marker의 중심좌표 설정.
        map: map, //Marker가 표시될 Map 설정.
        icon : infoObj.markerImage
    });

    markers.push(marker);
}

export default Map;