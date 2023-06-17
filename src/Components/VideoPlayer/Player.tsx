import ReactPlayer from "react-player";
import { useState, useRef, useEffect } from "react";
import "../../css/Player.css";
import PlayerControls from "./PlayerControls";

import { StructuredFileInfo, file } from "../../../types";

// other things this component might need: start time of video, end time of video, call back functions to go to next episode/make another api call

// might also want to look into lazy loading dub/sub for performance reasons

interface VideoPlayerProps {
  files: StructuredFileInfo;

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
  const [playing, setPlaying] = useState(props.playing || false);
  const [volume, setVolume] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "japanese">("english");
  const [currentDubLink, setCurrentDubLink] = useState<file>();
  const [currentDubSource, setCurrentDubSource] = useState("");
  const [currentDubQuality, setCurrentDubQuality] = useState("");
  const [currentSubLink, setCurrentSubLink] = useState<file>();
  const [currentSubSource, setCurrentSubSource] = useState("");
  const [currentSubQuality, setCurrentSubQuality] = useState("");

  const player = useRef(null);

  useEffect(() => {
    // setting default source
    let source;
    let sourceName;
    if (props.files.dub["Gogoapi"]) {
      sourceName = "Gogoapi";
      source = props.files.dub["Gogoapi"];
    } else {
      source = Object.values(props.files.dub)[0];
      sourceName = Object.keys(props.files.dub)[0];
    }

    const selectedSource = localStorage.getItem("selectedDubSource");
    if (selectedSource && props.files.dub[selectedSource]) {
      source = props.files.dub[selectedSource];
    }
    const selectedQuality = localStorage.getItem("selectedDubQuality");
    setCurrentDubLink(source.find((file) => file.label === selectedQuality) || source[0]);
    setCurrentDubSource(sourceName);
    setCurrentDubQuality(selectedQuality || source[0].label);
  }, []);

  useEffect(() => {
    let source;
    let sourceName;
    if (props.files.sub["Gogoapi"]) {
      sourceName = "Gogoapi";
      source = props.files.sub["Gogoapi"];
    } else {
      source = Object.values(props.files.sub)[0];
      sourceName = Object.keys(props.files.sub)[0];
    }

    const selectedSource = localStorage.getItem("selectedSubSource");
    if (selectedSource && props.files.sub[selectedSource]) {
      source = props.files.sub[selectedSource];
    }
    const selectedQuality = localStorage.getItem("selectedSubQuality");
    setCurrentSubLink(source.find((file) => file.label === selectedQuality) || source[0]);
    setCurrentSubSource(sourceName);
    setCurrentSubQuality(selectedQuality || source[0].label);
  }, []);

  const updateVideo = (file: file, sourceName: string) => {
    // if (language === "dub") {
    setCurrentDubLink(file);
    setCurrentDubQuality(file.label);
    setCurrentDubSource(sourceName);
    // }
    // if (language === "sub") {
    //   setCurrentSubLink(file);
    //   setCurrentSubQuality(file.label);
    //   setCurrentSubSource(sourceName);
    // }
  };

  const styles = {
    boxShadow: "3px 3px 3px black",
  };

  return currentDubLink ? (
    <>
      <h1 id="player-header">{props.files.episodeInfo}</h1>
      <div style={styles}>
        <ReactPlayer
          ref={player}
          url={currentDubLink.file}
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
        videoFiles={props.files.dub}
        currentSource={currentDubSource}
        currentQuality={currentDubQuality}
        changeVideoFiles={updateVideo}
      />
    </>
  ) : (
    <p>Loading</p>
  );
}
