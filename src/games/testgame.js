import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const videoRef = useRef(null)

    const getVideo = (screenHeight, screenWidth) => {
        let video = videoRef.current
        video.setAttribute('width', screenWidth);
        video.setAttribute('height', screenHeight);
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
                id='game-container'
                className='game-container'
                ref={videoRef}
            /> 
        </div>

    )
}

// {/* <div 
// id='game-container'
// className='game-container'
// />  */}


//   var video = $('body > video')[0];
  
//   navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  
//   navigator.getMedia({ video: !0, audio: !1 }, function(stream)
//   {
//     if ('srcObject' in video) {
//         video.srcObject = stream;
//       } else {
//         video.src = vu.createObjectURL(stream);
//       }
//     video.play();
//   }, function(error)


  
//   video.addEventListener('canplay', function(ev)
//   {
//     if(!streaming)
//     {
//       height = video.videoHeight / (video.videoWidth / width);
//       video.setAttribute('width', width);
//       video.setAttribute('height', height);
//       streaming = !0;
//     }
//   }, !1);
