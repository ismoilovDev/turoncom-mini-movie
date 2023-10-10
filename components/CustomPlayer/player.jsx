'use client'

import { useState, useRef, memo } from 'react';

const Player = ({ src }) => {
   const videoRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);

   const togglePlay = () => {
      if (videoRef.current.paused) {
         videoRef.current.play();
         setIsPlaying(true);
      } else {
         videoRef.current.pause();
         setIsPlaying(false);
      }
   };

   return (
      <div>
         <video ref={videoRef} src={src} controls />
         <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
         </button>
      </div>
   );
};

export default memo(Player);
