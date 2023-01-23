import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import { Camera } from "react-camera-pro";
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
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

        const geometry = new LineGeometry();
        geometry.setPositions([ 1, 1, 0, 1, 2, 0, 2, 2, 0, 2, 1, 0, 1, 1, 0 ]); // [ x1, y1, z1,  x2, y2, z2, ... ] format
        const material = new LineMaterial({
            color: 'green',
            linewidth: 5, // px
            resolution: new THREE.Vector2(screenWidth, screenHeight) // resolution of the viewport
        });

        console.log(material)

        const myLine = new Line2(geometry, material);
        scene.add(myLine)

        myLine.computeLineDistances();

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


