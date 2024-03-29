/* eslint-disable react/prop-types */
import styles from "../../styles/_VideoPlayer.module.scss";
import YouTube from "react-youtube";
import { useRef, useState } from "react";
const VideoPlayer = ({ videoId, thumbnail }) => {
  const playerRef = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const opts = {
    playerVars: {
      loop: 1,
      controls: 1,
      modestbranding: true,
    },
  };
  const onReady = (event) => {
    playerRef.current = event.target;
  };
  const playVideo = () => {
    setIsPlay(true);
    playerRef.current.playVideo();
  };
  return (
    <div className={styles.video}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        className={`${styles.mainVideo} ${isPlay ? styles.show : ""}`}
      />
      <div className={`${styles.customVideo} ${isPlay ? styles.hide : ""}`}>
        <img src={thumbnail} alt="video-img" loading="lazy" />
        <div className={styles.overlay} />
        <button className={styles.play} onClick={playVideo}>
          <img src="/playButton.svg" alt="play-img" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
