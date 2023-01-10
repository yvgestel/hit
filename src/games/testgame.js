import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const videoRef = useRef(null)

    const getVideo = (screenHeight, screenWidth) => {
        let video = videoRef.current
        console.log(screenHeight, screenWidth)
        console.log(video.getBoundingClientRect())
        navigator.mediaDevices.getUserMedia({
            video: {width: video.getBoundingClientRect().width, height: video.getBoundingClientRect().height}
        }).then(stream => {
            //let video = videoRef.current
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
                ref={videoRef}
                id='video-container'
                className='video-container'            
            />
            <div 
                id='game-container'
                className='game-container'
            />
        </div>

    )
}