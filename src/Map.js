import React, { Component }  from 'react';
import PropTypes from 'prop-types';

var map;
var markers = [];
const lotList = [];
const latList = [];
var subways = [];
var totalList = [];
var totalIndex = [];
class Map extends Component {

    componentDidMount() {
        this._getMap();
    }
    
    _getMap  = () => {
        map = new window.Tmapv2.Map("map_div", { // 지도가 생성될 div
			width : "100%", // 지도의 넓이
            height : "400px", // 지도의 높이
            zoom : 14
            
        });

        map.addListener("click", getLonlat);
    }

    _getSpot = () => {
        const lot = this._getlotLat(lotList);
        const lat = this._getlotLat(latList);
        const marker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(lat,lot), //Marker의 중심좌표 설정.
			icon: 'http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_b.png', //Marker의 아이콘.
			map: map //Marker가 표시될 Map 설정.
        });

        this._getSubway({dSpotlat : lat, dSpotlot : lot});   
    }

    _getSubway = async ({dSpotlat, dSpotlot}) => {
        const searchPoiInfo = await this._callSubwayCategoryApi({dSpotlat, dSpotlot, category : "지하철;"});
        subways = searchPoiInfo.pois.poi;
        subways.map(async(subway, index) => {
            await this._callCafeCategoryApi({dSpotlat : parseFloat(subway.frontLat), dSpotlot : parseFloat(subway.frontLon), category : "스터디카페;카페;", i : index});            
        });
    }

    _callSubwayCategoryApi = ({dSpotlat, dSpotlot, category}) => {
        var url = "https://apis.openapi.sk.com/tmap/pois/search/around?version=1&"
        var params = {
            "categories" : category,
            "resCoordType" : "WGS84GEO",//응답 좌표계 유형
            "reqCoordType" : "WGS84GEO",//요청 좌표계 유형
            "centerLon" : dSpotlot,
            "centerLat" : dSpotlat,
            "appKey" : "l7xxbfb4b13f846e43b8b0924bbda1166055",
            "count" : 10,
            "radius" : 10
        }
        var esc = encodeURIComponent;
        var query = Object.keys(params)
                    .map(k => esc(k) + '=' + esc(params[k]))
                    .join('&');             
        return fetch(url +query)
        .then(response => response.json())
        .then(json => json.searchPoiInfo)
        .catch(err => console.log(err));
    }
    
    _callCafeCategoryApi = async ({dSpotlat, dSpotlot, category, i}) => {
        var url = "https://apis.openapi.sk.com/tmap/pois/search/around?version=1&"
        var params = {
            "categories" : category,
            "resCoordType" : "WGS84GEO",//응답 좌표계 유형
            "reqCoordType" : "WGS84GEO",//요청 좌표계 유형
            "centerLon" : dSpotlot,
            "centerLat" : dSpotlat,
            "appKey" : "l7xxbfb4b13f846e43b8b0924bbda1166055",
            "count" : 10,
            "radius" : 5
        }
        var esc = encodeURIComponent;
        var query = Object.keys(params)
                    .map(k => esc(k) + '=' + esc(params[k]))
                    .join('&');             
        const response = await fetch(url +query)
        .catch(err => console.log(err));
        const responseOk = response && response.ok; 
        if (responseOk) {
            const result = await response.json();
            const totalCount = result.searchPoiInfo.totalCount;
            totalList.push( { totalCount : totalCount, index : i} );
            subways[i].cafes = result.searchPoiInfo
            if (subways.length == totalList.length) {
                totalList.sort(function(a, b) { // 오름차순
                    return b["totalCount"] - a["totalCount"];
                });
                this._createDSpot();
            }
        }
    }

    _createDSpot() {
        const index = totalList[0].index
        const marker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(subways[index].frontLat,subways[index].frontLon), //Marker의 중심좌표 설정.
			icon: 'http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_b.png', //Marker의 아이콘.
			map: map //Marker가 표시될 Map 설정.
        }); 
    }
     
    _getlotLat = (list) => {
        var max = list[0];
        var min = list[0];
        list.map(num=> {
            if (max < num)
                max = num;       
            if (min > num)
                min = num;
        })
        return min +((max - min) / 2)
    }

    render() {
        return (
            <div>
                <div id="map_div"></div>
                <button  onClick={() => this._getSpot()}>중간지점</button>
            </div>        
        )
    };
}

function getLonlat(e)  {
    const lonlat = e.latLng;
	//Marker 객체 생성.
    const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(lonlat.lat(),lonlat.lng()), //Marker의 중심좌표 설정.
        map: map //Marker가 표시될 Map 설정.

    });
    markers.push(marker);
    latList.push(lonlat.lat());
    lotList.push(lonlat.lng());
}

export default Map;