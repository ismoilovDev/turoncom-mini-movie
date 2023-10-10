import { memo } from 'react'
import ReactPlayer from 'react-player'

const Player = ({ videoUrl, playing, setPlaying }) => {
     return (
          <div className="video-player">
               <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="auto"
                    playing={playing}
                    onEnded={() => setPlaying(false)}
                    className="react-player"
               />
          </div>
     )
}

export default memo(Player)
