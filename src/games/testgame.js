import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const videoRef = useRef(null)
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

    const getVideo = (screenWidth, screenHeight) => {
        console.log('getvideo')
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
        const screenWidth = document.getElementById('game-container').offsetWidth
        const screenWidth2 = window.screen.width
        const screenWidth3 = window.innerWidth
        const screenWidth4 = window.screen.availWidth
        const screenHeight = document.getElementById('game-container').offsetHeight
        console.log("width: "+screenWidth+" "+screenWidth2+" "+screenWidth3+" "+screenWidth4)
        getVideo(screenWidth, screenHeight)
    }, [videoRef])

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