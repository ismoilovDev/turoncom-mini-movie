import { useRef, memo } from 'react';

const Player = ({ src, isPlaying, setIsPlaying }) => {
   const videoRef = useRef(null);

   const togglePlay = () => {
      if (!isPlaying) {
         videoRef.current.play();
         setIsPlaying(true);
      } else {
         videoRef.current.pause();
         setIsPlaying(false);
      }
   };

   return (
      <div className='video-player'>
         <video
            ref={videoRef}
            src={src}
            controls
            onClick={togglePlay}
         />
      </div>
   );
};

export default memo(Player);
