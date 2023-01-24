import React, { useRef, useState } from "react";
import styled from "styled-components";
import getConfig from "next/config";

const PlayIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PlayButton({ item }) {
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
    <>
      <video
        className="video"
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          height: "80vh",
        }}
        // autoPlay
        src={`${publicRuntimeConfig.API_URL}${item.url}`}
        alt=""
      >
        <source
          src={`${publicRuntimeConfig.API_URL}${item.url}`}
          type="video/mp4"
        />
      </video>
      <PlayIcon>
        <img
          className="playIcon"
          style={{ opacity: playButton ? 1 : 0 }}
          src="/assets/images/video_play.png"
          onClick={playPause}
          width={140}
          height={140}
        />
      </PlayIcon>
    </>
  );
}

export default PlayButton;
