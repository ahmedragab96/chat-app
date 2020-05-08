import React from 'react'
import { FaRocketchat } from "react-icons/fa";

function LandingPage(props) {
    console.log('in landing page', props ? props.user : 'nothing');
    return (
        <>
        <div className="app">
            <FaRocketchat style={{ fontSize: '4rem' }} /><br />
            <span style={{ fontSize: '2rem' }}>Let's Start Chatting!</span>
        </div>
        <div style={{ float:'right' }}>Thanks For Using This Website</div>
        </>
    )
}

export default LandingPage
