import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Step({ stepCnt, messages }) {
    return (
        <div about="step-info">
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>Step {stepCnt}</div>
            <ul>
                {
                    messages.map((value, idx) => {
                        return (typeof value === 'string') ?
                            <li style={{listStyleType: 'none'}} key={idx}>{value}</li> :
                            <li>error</li>;
                    })
                }
            </ul>
        </div>
    )
}

Step.prototypes = {
    stepCnt: PropTypes.number.isRequired,
    messages: PropTypes.array.isRequired
}

export default Step;