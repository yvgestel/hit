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
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({color: '#0000FF'})
        const cube = new THREE.Mesh(geometry, material)

        scene.add(cube)
        cube.position.set(0, 0, -2)
        cube.rotation.set(0, Math.PI/4, 0)

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
            cube.rotation.x += 0.01
            cube.rotation.y += 0.005
            cube.rotation.z += 0.01

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


