import React, { useRef, useState } from "react";
import styled from "styled-components";
import getConfig from "next/config";

const PlayIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right : 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    @media (max-width: 960px) {
      margin-bottom :7rem;
    }
  }
`;

const Video = styled.video`
  transform: translateX(-28%);
`

function CreationsPlay({ item }) {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  const [playButton, setPlayButton] = useState(true);
  const videoRef = useRef(null);

  function playPause() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlayButton(false);
      // video.play();
    } else {
      // video.pause();
      videoRef.current.pause();
      setPlayButton(true);
    }
  }


  return (
    <div style = {{position : 'relative' }} >
      <Video
        className="video"
        ref={videoRef}
        // autoPlay
        src={`${publicRuntimeConfig.API_URL}${item.url}`}
        alt=""
      >
        <source
          src={`${publicRuntimeConfig.API_URL}${item.url}`}
          type="video/mp4"
        />
      </Video>
      <PlayIcon>
        <img
          style={{ opacity: playButton ? 1 : 0}}
          src="/assets/images/video_play.png"
          onClick={playPause}
          width={100}
          height={100}
        />
      </PlayIcon>
    </div>
  );
}

export default CreationsPlay;
