import { useState, useEffect } from 'react';
import './test.css'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const Component = () => {
    const { height, width } = useWindowDimensions();
  
    return (
        <div className='container'>
            <div className='test'> 
                <p className='test-text'>width: {width} ~ height: {height}</p> 
            </div>
        </div>
    );
  }