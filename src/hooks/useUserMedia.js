import { useState, useEffect } from "react";

export function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia); 
        setMediaStream(stream);
      } catch(err) {
        // Removed for brevity
        alert(err)
      }
    }

    if (!mediaStream) {
      // console.log('Not mediastream')
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          // console.log('Cleanup')
          // console.log(track)
          track.stop();
        });
      }
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}