import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import "../../css/Player.css";
import PlayerControls from "./PlayerControls";

interface VideoPlayerProps {
  url?: string;
  playing?: boolean;
  width?: number;
  onReady?: () => void;
  onStart?: () => void;
  onProgress?: () => void;
  onDuration?: () => void;
  onPause?: () => void;
  onBuffer?: () => void;
  onSeek?: () => void;
  onEnded?: () => void;
  onError?: () => void;
}

export default function Player(props: VideoPlayerProps) {
  const [url, setUrl] = useState("" || props.url);
  const [playing, setPlaying] = useState(props.playing || false);
  const [volume, setVolume] = useState(0);
  const [width, setWidth] = useState(props.width || 65);
  const [height, setHeight] = useState(20);
  const player = useRef(null);

  const styles = {
    // maxWidth: `${width}%`,
    // maxHeight: `${height}vh`,
    // border: "1px solid orange",
  };

  return (
    <>
      <div style={styles}>
        <ReactPlayer
          ref={player}
          url={url}
          playing={playing}
          volume={volume}
          width="100%"
          height="100%"
          onBuffer={props.onBuffer}
          onProgress={props.onProgress}
          onDuration={props.onDuration}
          onEnded={props.onEnded}
          onStart={props.onStart}
          className="main-video-player"
        />
      </div>
      <PlayerControls width={width} />
    </>
  );
}
