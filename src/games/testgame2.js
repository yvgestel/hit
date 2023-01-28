import React, { useEffect, useRef, useState } from 'react';
import useWindowResize from '../hooks/useWindowResize'
//import { Camera } from "react-camera-pro";
import Webcam from "react-webcam";
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import * as THREE from 'three';

import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'

import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight, screenRatio } = useWindowResize()
    const [handDetected, sethandDetected] = useState(false)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const runHandpose = async () => {
        const net = await handpose.load()
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
            detectHand(net);
        }, 50);
      };

    const detectHand = async (net) => {
        if (
            typeof videoRef.current !== "undefined" &&
            videoRef.current !== null &&
            videoRef.current.video.readyState === 4
          ) {
            // Get Video Properties
            const video = videoRef.current.video;
            const videoWidth = videoRef.current.video.videoWidth;
            const videoHeight = videoRef.current.video.videoHeight;
      
            // Set video width
            videoRef.current.video.width = videoWidth;
            videoRef.current.video.height = videoHeight;
      
            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
      
            // Make Detections
            const hand = await net.estimateHands(video);
            sethandDetected(hand.length > 0 ? true : false)
            console.log(handDetected);
    }}

    useEffect(() => {
        runHandpose()
    },[])

    useEffect(() => {
        const color = handDetected ? '#49be25' : '#be4d25'

        const scene = new THREE.Scene()

        const geometry = new LineGeometry();
        geometry.setPositions([ 1, 1, 0, 1, 2, 0, 2, 2, 0, 2, 1, 0, 1, 1, 0 ]); // [ x1, y1, z1,  x2, y2, z2, ... ] format
        const material = new LineMaterial({
            linewidth: 5, // px
            resolution: new THREE.Vector2(screenWidth, screenHeight) // resolution of the viewport
        });

        const plane = new Line2(geometry, material);
        plane.material.color.set(color)
        scene.add(plane)

        plane.computeLineDistances()

        const camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000)
        camera.position.set(1, 1, 5)

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            canvas: document.getElementById('game-container'),
            antialias: true,
        })
        renderer.setPixelRatio(window.devicePixelRatio)

        const animate = async () => {
            requestAnimationFrame( animate )

            renderer.render(scene, camera)
        }

        animate() 

    },[screenWidth, screenHeight, handDetected])

    return (
        <div className='game-page-container'>
            <canvas 
                id='game-container'
                className='game-container'
                ref={canvasRef}
            />
        <Webcam 
            height={screenHeight} 
            width={screenWidth}
            videoConstraints={{
                facingMode: 'user', 
                aspectRatio: screenRatio,
                width: screenWidth,
                height: screenHeight,
            }}
            ref={videoRef} 
        />
        </div>

    )
}

{/* <Camera 
id='video-container'
className='video-container'
ref={videoRef}
facingMode='user'
aspectRatio='cover'
/>  */}
