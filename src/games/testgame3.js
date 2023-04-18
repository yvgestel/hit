import React, { useEffect, useRef, useState } from 'react';
import useWindowResize from '../hooks/useWindowResize'
import Measure from 'react-measure'
import * as THREE from 'three';
import './testgame.css';

export const TestGame = () => {
    const { screenWidth, screenHeight } = useWindowResize()
    const [container, setContainer] = useState({ height: 0, width: 0 });
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
        console.log(container)
        getVideo(container.height, container.width)
    }, [videoRef,container])

    function handleResize(contentRect) {
        console.log(contentRect)
        setContainer({
            height: contentRect.bounds.height,
            width: contentRect.bounds.width
          });
        
        // contentRect gebruiken voor resize
        // -> useWindowResize verbeteren met useCardRatio
        // useUserMedia / getVideo samenvoegen 
    }

    return (
        <div className='test'>
            <br></br>
            {screenWidth}*{screenHeight}
        </div>
    )
}


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