import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Measure from 'react-measure'
import { useUserMedia } from '../hooks/useUserMedia';
import { useCardRatio } from '../hooks/useCardRatio';
import { useOffsets } from '../hooks/useOffsets';

import { Icon } from '../components/atoms/icon/icon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './testgame.css';

export const TestGame = () => {
    const [container, setContainer] = useState({ height: 0, width: 0 });
    const [aspectRatio, calculateRatio] = useCardRatio(1.586);

    const CAPTURE_OPTIONS = {
        video: {width: container.height, height: container.width}
    };

    const navigate = useNavigate()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const mediaStream = useUserMedia(CAPTURE_OPTIONS)

    const offsets = useOffsets(
      videoRef.current && videoRef.current.videoWidth,
      videoRef.current && videoRef.current.videoHeight,
      container.width,
      container.height
    );

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    function handleCanPlay() {
        console.log('videoRef.current.videoHeight', videoRef.current.videoHeight)
        console.log('videoRef.current.videoWidth', videoRef.current.videoWidth)
        calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
        videoRef.current.play();
    }

    function handleResize(contentRect) {
        //console.log(contentRect)
        setContainer({
            height: Math.round(contentRect.bounds.width / aspectRatio),
            width: contentRect.bounds.width
          });
    }

    const goBack = () => {
      try {
        navigate(-1)
      } catch (error) {
        navigate('/', { replace: true }); 
      }
    }

    // useEffect(() => {
    //     console.log(container)
    //     console.log(videoRef.current.videoHeight)
    // },[container])

    return (
        <Measure 
            bounds 
            onResize={handleResize}
        >
            {({measureRef}) => (
                <div 
                    className='game-page-container'
                    ref={measureRef}
                >
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
                    <video
                        id='video-container'
                        className='video-container'
                        ref={videoRef}
                        onCanPlay={handleCanPlay}
                        autoPlay
                        playsInline
                        muted
                    />
                </div>
            )}
        </Measure>


    )
}

