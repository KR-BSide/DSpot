import React, { Component } from 'react';

function Step({ stepCnt, message }) {
    return (
        <div about="step-info">
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>Step {stepCnt}</div>
            <div>{message}</div>
        </div>
    )
}