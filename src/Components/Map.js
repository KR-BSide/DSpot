import React, { Component } from 'react';
import PropTypes from 'prop-types';

var map;
var markers = [];
var subways = [];
var totalList = [];
var nextIndex = 0;

const userLocationArr = [];
const chktraffic = [];
const resultdrawArr = [];
class Map extends Component {

    componentDidMount() {
        this._getMap();
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
        subways.map(async (subway, index) => {
            await this._callCafeCategoryApi({ dSpotlat: parseFloat(subway.frontLat), dSpotlng: parseFloat(subway.frontLon), category: "스터디카페;카페;", i: index });
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
            .catch(err => console.log(err));
        const responseOk = response && response.ok;
        if (responseOk) {
            const result = await response.json();
            const totalCount = result.searchPoiInfo.totalCount;
            totalList.push({ totalCount: totalCount, index: i });
            subways[i].cafes = result.searchPoiInfo
            if (subways.length == totalList.length) {
                totalList.sort(function (a, b) { // 오름차순
                    return b["totalCount"] - a["totalCount"];
                });
                this._createDSpot(0);
            }
        }
    }

    _createDSpot(j) {
        const index = totalList[j].index
        const marker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(subways[index].frontLat, subways[index].frontLon), //Marker의 중심좌표 설정.
            icon: 'http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_b.png', //Marker의 아이콘.
            map: map //Marker가 표시될 Map 설정.
        });
        for (var i in userLocationArr)
            this._routeDSpot(i,j);
    }

    _routeDSpot = async(i,j) => {
        const startX = userLocationArr[i].lng;
        const startY = userLocationArr[i].lat;
        const endX = subways[totalList[j].index].frontLon;
        const endY = subways[totalList[j].index].frontLat;
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
        
        var tDistance = "총 거리 : " + (result[0].properties.totalDistance / 1000).toFixed(1) + "km,";
        var tTime = " 총 시간 : " + (result[0].properties.totalTime / 60).toFixed(0) + "분,";
        var tFare = " 총 요금 : " + result[0].properties.totalFare + "원,";
        var taxiFare = " 예상 택시 요금 : " + result[0].properties.taxiFare + "원";
        console.log(tDistance , tTime, tFare, taxiFare);
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
              /*  new window.Tmapv2.Polyline({
                    path: convertPoint,
                    strokeColor: "#ff0000", 
                    strokeWeight: 6,
                    map: map
                });
*/
                //this._drawLine(sectionInfos, geometry.traffic);
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
                   // pointType : pType
                };
                // 마커 추가
                //addMarker(routeInfoObj);
                
            }

            
        }
    }

    _drawLine = (arrPoint, traffic) => {
        var polyline_;
        
        if (chktraffic.length != 0) {

            // 교통정보 혼잡도를 체크
            // strokeColor는 교통 정보상황에 다라서 변화
            // traffic :  0-정보없음, 1-원활, 2-서행, 3-지체, 4-정체  (black, green, yellow, orange, red)

            var lineColor = "";
            if (traffic != "0") {
                if (traffic.length == 0) { //length가 0인것은 교통정보가 없으므로 검은색으로 표시

                    lineColor = "#06050D";
                    //라인그리기[S]
                    polyline_ = new window.Tmapv2.Polyline({
                        path : arrPoint,
                        strokeColor : lineColor,
                        strokeWeight : 6,
                        map : map
                    });
                    resultdrawArr.push(polyline_);
                    //라인그리기[E]
                } else { //교통정보가 있음

                    if (traffic[0][0] != 0) { //교통정보 시작인덱스가 0이 아닌경우
                        var trafficObject = "";
                        var tInfo = [];

                        for (var z = 0; z < traffic.length; z++) {
                            trafficObject = {
                                "startIndex" : traffic[z][0],
                                "endIndex" : traffic[z][1],
                                "trafficIndex" : traffic[z][2],
                            };
                            tInfo.push(trafficObject)
                        }

                        var noInfomationPoint = [];

                        for (var p = 0; p < tInfo[0].startIndex; p++) {
                            noInfomationPoint.push(arrPoint[p]);
                        }

                        //라인그리기[S]
                        polyline_ = new window.Tmapv2.Polyline({
                            path : noInfomationPoint,
                            strokeColor : "#06050D",
                            strokeWeight : 6,
                            map : map
                        });
                        //라인그리기[E]
                        resultdrawArr.push(polyline_);

                        for (var x = 0; x < tInfo.length; x++) {
                            var sectionPoint = []; //구간선언

                            for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                                sectionPoint.push(arrPoint[y]);
                            }

                            if (tInfo[x].trafficIndex == 0) {
                                lineColor = "#06050D";
                            } else if (tInfo[x].trafficIndex == 1) {
                                lineColor = "#61AB25";
                            } else if (tInfo[x].trafficIndex == 2) {
                                lineColor = "#FFFF00";
                            } else if (tInfo[x].trafficIndex == 3) {
                                lineColor = "#E87506";
                            } else if (tInfo[x].trafficIndex == 4) {
                                lineColor = "#D61125";
                            }

                            //라인그리기[S]
                            polyline_ = new window.Tmapv2.Polyline({
                                path : sectionPoint,
                                strokeColor : lineColor,
                                strokeWeight : 6,
                                map : map
                            });
                            //라인그리기[E]
                            resultdrawArr.push(polyline_);
                        }
                    } else { //0부터 시작하는 경우

                        var trafficObject = "";
                        var tInfo = [];

                        for (var z = 0; z < traffic.length; z++) {
                            trafficObject = {
                                "startIndex" : traffic[z][0],
                                "endIndex" : traffic[z][1],
                                "trafficIndex" : traffic[z][2],
                            };
                            tInfo.push(trafficObject)
                        }

                        for (var x = 0; x < tInfo.length; x++) {
                            var sectionPoint = []; //구간선언

                            for (var y = tInfo[x].startIndex; y <= tInfo[x].endIndex; y++) {
                                sectionPoint.push(arrPoint[y]);
                            }

                            if (tInfo[x].trafficIndex == 0) {
                                lineColor = "#06050D";
                            } else if (tInfo[x].trafficIndex == 1) {
                                lineColor = "#61AB25";
                            } else if (tInfo[x].trafficIndex == 2) {
                                lineColor = "#FFFF00";
                            } else if (tInfo[x].trafficIndex == 3) {
                                lineColor = "#E87506";
                            } else if (tInfo[x].trafficIndex == 4) {
                                lineColor = "#D61125";
                            }

                            //라인그리기[S]
                            polyline_ = new window.Tmapv2.Polyline({
                                path : sectionPoint,
                                strokeColor : lineColor,
                                strokeWeight : 6,
                                map : map
                            });
                            //라인그리기[E]
                            resultdrawArr.push(polyline_);
                        }
                    }
                }
            } else {

            }
        } else {
            polyline_ = new window.Tmapv2.Polyline({
                path : arrPoint,
                strokeColor : "#DD0000",
                strokeWeight : 6,
                map : map
            });
            resultdrawArr.push(polyline_);
        }
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
        nextIndex++;
        if (totalList.length <= nextIndex) {
            alert("다른역 없습니다.");
            return;
        }

        this._createDSpot(nextIndex);
    }

    _last

    render() {
        return (
            <div>
                <div id="map_div"></div>
                <button onClick={() => this._getSpot()}>중간지점</button>
                <button onClick={() => this._nextSpot()}>다른 역 찾기</button>
            </div>
        )
    };
}

function getLonlat(e) {
    //Marker 객체 생성.
    addMarker({ lat : e.latLng.lat() , lng : e.latLng.lng()});
    userLocationArr.push({ lat : e.latLng.lat() , lng : e.latLng.lng()});

}

function addMarker(infoObj) {
    //Marker 객체 생성.
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