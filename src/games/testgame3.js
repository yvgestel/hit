import React, { useEffect, useRef } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    const getVideo = (screenHeight, screenWidth) => {
        let video = videoRef.current
        navigator.mediaDevices.getUserMedia({
            video: {width: screenWidth, height: screenHeight}
        }).then(stream => {
            video.srcObject = stream
            video.play()
        }).catch(err => {
            console.error(err)
        })
    }

    // useEffect(() => {
    //     const scene = new THREE.Scene()
    //     const geometry = new THREE.BoxGeometry(1, 1, 1)
    //     const material = new THREE.MeshBasicMaterial({color: '#0000FF'})
    //     const cube = new THREE.Mesh(geometry, material)

    //     scene.add(cube)
    //     cube.position.set(0, 0, -2)
    //     cube.rotation.set(0, Math.PI/4, 0)

    //     const camera = new THREE.PerspectiveCamera()
    //     camera.position.set(1, 1, 5)

    //     const renderer = canvasRef.current
    //     renderer.render(scene, camera)
    // },[])

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
            <video
                id='video-container'
                className='video-container'
                ref={videoRef}
            /> 
        </div> 
    )
}

{/* <div className='game-container' ref={canvasRef}>
<br/>
<p>Afmetingen</p>
<span>Window size: {screenWidth} x {screenHeight}</span>
<br />
<span>Ratio: {screenRatio}</span>
<br/>
{canvasRef.current && <span>Ref size: {canvasRef.current.clientWidth} x {canvasRef.current.clientHeight}</span>}
</div> */}


{/* <Measure 
bounds 
onResize={handleResize}
>
{({measureRef}) => (
    <div 
        className='game-page-container'
        ref={measureRef}
    >
        <canvas 
            id='game-container'
            className='game-container'
            ref={canvasRef}
        />  
        <video
            id='video-container'
            className='video-container'
            ref={videoRef}
        /> 
    </div>
)}
</Measure> */}