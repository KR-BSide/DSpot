import React, { Component } from 'react';
import KakaoLink from '../Components/KakaoLink'

class SharingPage extends Component {

    // hwoop WIP
    render() {
        return (
            <div>
                <div style={{ backgroundColor: "red" }}>Beside Place</div>
                <hr />
                <div style={{ fontWeight: 'bold', fontSize: 24 }}>Step 4</div>
                <div>이제 멤버들에게 공유하면 끝!</div>
                <div>이번 모임도 성공적일거에요 :)</div>
                <div />
                <div style={{ fontWeight: 'bold', fontSize: 18 }}>모임 날짜 설정</div>
                <div>
                    <div style={{ float: 'left' }}>
                        <input></input>
                    </div>
                    <div style={{ float: 'left' }}>
                        <input></input>
                    </div>
                </div>
                <KakaoLink></KakaoLink>
            </div>
        );
    }
}

export default SharingPage;