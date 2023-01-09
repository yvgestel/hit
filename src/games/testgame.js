import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const videoRef = useRef(null)

    // const videoElement = document.getElementById('video-container')
    // const rect = videoElement.getBoundingClientRect()
    // const width = rect.width > rect.height ? rect.width : rect.height
    // const height = rect.width > rect.height ? rect.height : rect.width
    // console.log(width, height)

    // useEffect(() => {
    //     const scene = new THREE.Scene()

    //     const geometry = new THREE.BoxGeometry(1, 1, 1)
    //     const material = new THREE.MeshBasicMaterial({color: '#0000FF'})
    //     const cube = new THREE.Mesh(geometry, material)

    //     scene.add(cube)
    //     cube.position.set(0 , 0, -2)
    //     cube.rotation.set(0, Math.PI/4, 0)

    //     const camera = new THREE.PerspectiveCamera()
    //     camera.position.set(1, 1, 5)

    //     const renderer = new THREE.WebGLRenderer({alpha: true})
    //     const width = document.getElementById('game-container').offsetWidth
    //     const height = document.getElementById('game-container').offsetHeight
    //     renderer.setSize(width, height)
    //     renderer.render(scene, camera)

    //     const video = document.getElementById('video-container')
    //     navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
    //         video.srcObject = stream
    //         video.play()
    //     })

    //     document.getElementById('game-container').appendChild(renderer.domElement)

    //   }, []);

    const getVideo = (screenHeight, screenWidth) => {
        console.log(screenHeight, screenWidth)
        navigator.mediaDevices.getUserMedia({
            video: {width: screenWidth, height: screenHeight}
        }).then(stream => {
            let video = videoRef.current
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