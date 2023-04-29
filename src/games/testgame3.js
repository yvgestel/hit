import React, { useEffect, useRef } from 'react';
import { useWindowResize }from '../hooks/useWindowResize'
import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const getVideo = async (screenHeight, screenWidth) => {
        try {
            let video = videoRef.current
            let stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: {exact: 'user'},
                        autoFocus: 'continuous',
                        flashMode: 'off',
                        whiteBalance: 'continuous',
                        zoom: 0,
                        focusDepth: 0,
                        aspectRatio: 0.75,
                        // width: {ideal: screenWidth },
                        // height: {ideal: screenHeight },
                        video: true,
                        audio: false,
                    }
                })
            video.srcObject = stream
            video.play()
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getVideo(screenHeight, screenWidth)
    }, [videoRef,screenHeight, screenWidth])

    return (
        <div className='game-page-container'>
            <canvas 
                id='game-container'
                className='game-container'
                ref={canvasRef}
            />  
            <div className='video-container'>
                <video
                    id='video-container'
                    className='video-source'
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                /> 
            </div>
        </div> 
    )
}

// const getVideo = (screenHeight, screenWidth) => {
//     let video = videoRef.current
//     navigator.mediaDevices.getUserMedia({
//         video: {
//             // width: {ideal: screenWidth },
//             // height: {ideal: screenHeight },
//             video: true,
//             audio: false,
//             facingMode: 'user',
//         }
//     }).then(stream => {
//         video.srcObject = stream
//         video.play()
//     }).catch(err => {
//         alert(err)
//     })
// }

// useEffect(() => {
//     const color = '#be4d25'

//     const scene = new THREE.Scene()

//     const geometry = new LineGeometry();
//     geometry.setPositions([ 1, 1, 0, 1, 2, 0, 2, 2, 0, 2, 1, 0, 1, 1, 0 ]); // [ x1, y1, z1,  x2, y2, z2, ... ] format
//     const material = new LineMaterial({
//         linewidth: 5, // px
//         resolution: new THREE.Vector2(screenWidth, screenHeight) // resolution of the viewport
//     });

//     const plane = new Line2(geometry, material);
//     plane.material.color.set(color)
//     scene.add(plane)

//     plane.computeLineDistances()

//     const camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000)
//     camera.position.set(1, 1, 5)

//     const renderer = new THREE.WebGLRenderer({
//         alpha: true,
//         canvas: document.getElementById('game-container'),
//         antialias: true,
//     })
//     //renderer.setPixelRatio(window.devicePixelRatio)

//     const animate = async () => {
//         requestAnimationFrame( animate )

//         renderer.render(scene, camera)
//     }

//     animate() 

// },[])

