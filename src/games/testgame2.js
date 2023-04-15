import React, { useEffect, useRef, useState } from 'react';
import useWindowResize from '../hooks/useWindowResize'
//import { Camera } from "react-camera-pro";
import Webcam from "react-webcam";
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import * as THREE from 'three';

import { Icon } from '../components/atoms/icon/icon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'

import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight, screenRatio } = useWindowResize()
    const [prediction, setPrediction] = useState(null);
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const goBack = () => {
      console.log('Go back')
    }

    const detectWebcamFeed = async (posenet_model) => {
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
          // Make Estimation
          const pose = await posenet_model.estimateSinglePose(video);
          setPrediction(pose.score)
        }
        tf.dispose()
      };

      const runPosenet = async () => {
        const posenet_model = await posenet.load({
          inputResolution: { width: screenWidth, height: screenHeight },
          scale: 0.8
        });
        //
        setInterval(() => {
          detectWebcamFeed(posenet_model);
        }, 200);
      };

    // useEffect(() => {
    //     tf.ready().then(() => {
    //     runPosenet();
    //     });
    //     tf.dispose()
    // }, []);

    useEffect(() => {
        const color = prediction>0.3 ? '#49be25' : '#be4d25'

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
        //renderer.setPixelRatio(window.devicePixelRatio)

        const animate = async () => {
            requestAnimationFrame( animate )

            renderer.render(scene, camera)
        }

        animate() 

    },[screenWidth, screenHeight, prediction])

    return (
        <div className='game-page-container'>
          <div className='back-from-game-icon'>
            <Icon 
              onClick={goBack}
              icon={faArrowLeft}
            />
          </div>
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

// const loadModel = async () => {
//     try {
//     const model = await posenet.load({
//         inputResolution: {width:screenWidth, height: screenHeight},
//         scale: 0.5
//     }); // input parameters
//     console.log(model)
//     setModel(model);
//     console.log(model)
//     console.log("set loaded Model");
//     } 
//     catch (err) {
//     console.log(err);
//     console.log("failed load model");
//     }
// }
    
// useEffect(() => {
//     tf.ready().then(() => {
//     loadModel();
//     });
// }, []);


// const detectPose = async () => {
//     if (
//         typeof videoRef.current !== "undefined" &&
//         videoRef.current !== null &&
//         videoRef.current.video.readyState === 4
//       ) {
//         // Get Video Properties
//         const video = videoRef.current.video;
//         const videoWidth = videoRef.current.video.videoWidth;
//         const videoHeight = videoRef.current.video.videoHeight;
  
//         // Set video width
//         videoRef.current.video.width = videoWidth;
//         videoRef.current.video.height = videoHeight;
  
//         // Set canvas height and width
//         canvasRef.current.width = videoWidth;
//         canvasRef.current.height = videoHeight;
  
//         // Make Detections
//         const detection = await model.estimateSinglePose(video)
//         console.log(detection)
// }}