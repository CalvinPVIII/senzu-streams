import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import "../../css/Player.css";
import PlayerControls from "./PlayerControls";

import { ApiEpisodeResponse } from "../../../types";

// other things this component might need: start time of video, end time of video, call back functions to go to next episode/make another api call

// might also want to look into lazy loading dub/sub for performance reasons

interface VideoPlayerProps {
  files: ApiEpisodeResponse;

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

// next steps: organize all files given from API, have option to pick between them in controls. Go back and change EpisodeFiles to not have any type

export default function Player(props: VideoPlayerProps) {
  console.log(props.files);
  const [playing, setPlaying] = useState(props.playing || false);
  const [volume, setVolume] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "japanese">("english");

  const player = useRef(null);

  const styles = {
    boxShadow: "3px 3px 3px black",
  };

  // console.log(props.files.files.dub[0][0].file);

  return (
    <>
      <h1 id="player-header">{props.files.episodeInfo}</h1>
      <div style={styles}>
        <ReactPlayer
          ref={player}
          // url={props.files.files.dub[0][0].file}
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
