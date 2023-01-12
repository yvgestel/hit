import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const videoRef = useRef(null)

    const getVideo = (screenHeight, screenWidth) => {
        let video = videoRef.current
        navigator.mediaDevices.getUserMedia({
            video: {width: screenWidth, height: screenHeight}
        }).then(stream => {
            video.srcObject = stream
            video.play()
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        getVideo(screenHeight, screenWidth)
    }, [videoRef,screenHeight, screenWidth])

    return (
        <div className='game-page-container'>
            <video
                id='video-container'
                className='video-container'
                ref={videoRef}
            /> 
            <div 
                id='game-container'
                className='game-container'
            >
                <h1>Test</h1>
            </div>  
        </div>

    )
}


