import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import "../../css/Player.css";
import PlayerControls from "./PlayerControls";

// other things this component might need: start time of video, end time of video, call back functions to go to next episode/make another api call

// might also want to look into lazy loading dub/sub for performance reasons

interface VideoPlayerProps {
  url: string;
  playerHeader: string;

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
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "japanese">("english");

  const player = useRef(null);

  const styles = {
    boxShadow: "3px 3px 3px black",
  };

  return (
    <>
      <h1 id="player-header">{props.playerHeader}</h1>
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
          style={styles}
          className="main-video-player"
        />
      </div>
      <PlayerControls
        handlePlayerVolume={setVolume}
        handlePlayerPlaying={setPlaying}
        playerPlaying={playing}
        currentPlayerLanguage={currentLanguage}
        handlePlayerCurrentLanguage={setCurrentLanguage}
      />
    </>
  );
}
