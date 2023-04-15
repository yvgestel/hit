import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Measure from 'react-measure'
import { useUserMedia } from '../hooks/useUserMedia';
import { useCardRatio } from '../hooks/useCardRatio';
import { useOffsets } from '../hooks/useOffsets';

import { Icon } from '../components/atoms/icon/icon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './testgame.css';

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "user" },
};

export const TestGame = () => {
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const mediaStream = useUserMedia(CAPTURE_OPTIONS)
    const [container, setContainer] = useState({ height: 0, width: 0 });
    const [aspectRatio, calculateRatio] = useCardRatio(1.586);
    const offsets = useOffsets(
      videoRef.current && videoRef.current.videoWidth,
      videoRef.current && videoRef.current.videoHeight,
      container.width,
      container.height
    );

    console.log(offsets)

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream;
    }

    function handleCanPlay() {
        calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
        videoRef.current.play();
    }

    function handleResize(contentRect) {
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

    useEffect(() => {
    },[])

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

