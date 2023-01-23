import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import { Camera } from "react-camera-pro";
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

    useEffect(() => {
        const scene = new THREE.Scene()

        const geometry = new THREE.PlaneGeometry( 2, 2 )
        const edges = new THREE.EdgesGeometry( geometry )
        const material = new THREE.LineBasicMaterial( { color: 0xF26419 } )
        const plane = new THREE.LineSegments( edges, material)
        scene.add( plane )
        plane.position.set(0, 0, -2)

        const camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000)
        camera.position.set(1, 1, 5)

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            canvas: document.getElementById('game-container'),
            antialias: true,
        })
        renderer.setPixelRatio(window.devicePixelRatio)

        const animate = () => {
            requestAnimationFrame( animate )

            renderer.render(scene, camera)
        }

        animate() 

    },[screenWidth, screenHeight])

    // useEffect(() => {
    //     getVideo(screenHeight, screenWidth)
    // }, [videoRef,screenHeight, screenWidth])

    return (
        <div className='game-page-container'>
            <canvas 
                id='game-container'
                className='game-container'
            />
            <Camera 
                id='video-container'
                className='video-container'
                ref={videoRef}
                facingMode='user'
                aspectRatio='cover'
            />

        </div>

    )
}


