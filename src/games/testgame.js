import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import Webcam from "react-webcam";
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const videoRef = useRef(null)

    // const getVideo = (screenHeight, screenWidth) => {
    //     navigator.mediaDevices.getUserMedia({
    //         video: {width: screenWidth, height: screenHeight}
    //     }).then(stream => {
    //         let video = videoRef.current
    //         video.srcObject = stream
    //         video.play()
    //     }).catch(err => {
    //         console.error(err)
    //     })
    // }

    // useEffect(() => {
    //     getVideo(screenHeight, screenWidth)
    // }, [videoRef,screenHeight, screenWidth])

    return (
        <div className='game-page-container'>
            <div 
                style={{
                    width: screenWidth,
                    height: screenHeight,
                }}
            >
                <p>{screenHeight}+' '+{screenWidth}</p>
            </div>
        </div>

    )
}

// {/* <Webcam
// id='video-container'
// className='video-container' 
// audio={false}
// ref={videoRef}
// videoConstraints={{
//     width: screenWidth,
//     height: screenHeight,
//     facingMode: "user"
//   }}
// />
// <div 
// id='game-container'
// className='game-container'
// /> */}