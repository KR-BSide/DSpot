import React, { Component } from 'react';
import KakaoLink from '../Components/KakaoLink'
import Map from '../Components/Map'
import Step from '../Components/Step'
import RegisterMember from '../Components/RegisterMember'

class SharingPage extends Component {

    // hwoop WIP
    render() {
        return (
            <div>
                <div style={{ backgroundColor: "red" }}>Beside Place</div>

                <hr />

                <Step stepCnt={4}
                    messages={
                        [
                            "이제 멤버들에게 공유하면 끝!",
                            "이번 모임도 성공적일거에요 :)"
                        ]
                    }>
                </Step>

                <div about="meeting-date">
                    <div style={{ float: 'left', fontWeight: 'bold', fontSize: 18 }}>모임 날짜 설정</div>

                    <div style={{ clear: 'both' }}>
                        <div style={{ float: 'left', marginLeft: 0, marginRight: 5 }} >
                            <input></input>
                        </div>
                        <div style={{ float: 'left', marginLeft: 5, marginRight: 5 }}>
                            <input></input>
                        </div>
                    </div>
                </div>

                <div>
                    <input readOnly style={{ clear: 'both', float: 'left' }}></input>
                </div>

                <div style={{ height: "35%", width: "35%", clear: 'both', float: 'left' }}>
                    <Map />
                </div>

                <div style={{ clear: 'both', float: 'left' }}>
                    <KakaoLink />
                </div>
            </div >
        );
    }
}

export default SharingPage;