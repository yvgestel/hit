import { useState, useEffect } from "react";

function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    screenRatio: null,
  });

  useEffect(() => {
    function handleResize() {
      const isLandscape = window.innerHeight <= window.innerWidth;
      const ratio = isLandscape ? 
        window.innerHeight / window.innerWidth : 
        window.innerWidth / window.innerHeight
      // console.log(isLandscape)
      // console.log(ratio)
        setWindowSize({
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          screenRatio: ratio
        });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowResize;