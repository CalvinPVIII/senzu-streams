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
  onStart?: (player: any, language: "dub" | "sub") => void;
  onProgress?: () => void;
  onDuration?: () => void;
  onPause?: () => void;
  onBuffer?: () => void;
  onSeek?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  lazyLoad?: boolean;
}

// next steps: organize all files given from API, have option to pick between them in controls. Go back and change EpisodeFiles to not have any type

export default function Player(props: VideoPlayerProps) {
  const [playing, setPlaying] = useState(props.playing || false);
  const [dubPlayerVolume, setDubPlayerVolume] = useState(0);
  const [subPlayerVolume, setSubPlayerVolume] = useState(0);

  const playerLanguage = localStorage.getItem("playerLanguage");
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "japanese">(
    playerLanguage === "english" || playerLanguage === "japanese" ? playerLanguage : "english"
  );
  console.log(playerLanguage);
  console.log(currentLanguage);

  const [currentDubLink, setCurrentDubLink] = useState<file>();
  const [currentDubSource, setCurrentDubSource] = useState("");
  const [currentDubQuality, setCurrentDubQuality] = useState("");
  const [currentSubLink, setCurrentSubLink] = useState<file>();
  const [currentSubSource, setCurrentSubSource] = useState("");
  const [currentSubQuality, setCurrentSubQuality] = useState("");

  const defaultDubPlayerVisibility = playerLanguage === "english" ? "block" : playerLanguage === null ? "block" : "none";
  const defaultSubPlayerVisibility = playerLanguage === "japanese" ? "block" : "none";
  const [dubPlayerVisibility, setDubPlayerVisibility] = useState<"block" | "none">(defaultDubPlayerVisibility);
  const [subPlayerVisibility, setSubPlayerVisibility] = useState<"block" | "none">(defaultSubPlayerVisibility);

  const dubPlayer = useRef(null);
  const subPlayer = useRef(null);
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
  }, [props.files]);

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
  }, [props.files]);

  const updateVideo = (file: file, sourceName: string) => {
    if (currentLanguage === "english") {
      setCurrentDubLink(file);
      setCurrentDubQuality(file.label);
      setCurrentDubSource(sourceName);

      // const dubTime = localStorage.getItem("dubTime");
      // if (dubTime && dubPlayer.current) {
      //   dubPlayer.current.seekTo(parseInt(dubTime));
      //   console.log(dubTime);
      //   console.log(dubPlayer.current.seekTo);
      // }
    }
    if (currentLanguage === "japanese") {
      setCurrentSubLink(file);
      setCurrentSubQuality(file.label);
      setCurrentSubSource(sourceName);
    }
  };

  const changePlayerLanguage = (language: "english" | "japanese", updateSourceCallback: React.Dispatch<React.SetStateAction<string>>) => {
    if (language === "english") {
      localStorage.setItem("playerLanguage", "english");
      setCurrentLanguage("english");
      setDubPlayerVisibility("block");
      setSubPlayerVisibility("none");
      setDubPlayerVolume(subPlayerVolume);
      setSubPlayerVolume(0);
      updateSourceCallback(currentDubSource);
    } else if (language === "japanese") {
      localStorage.setItem("playerLanguage", "japanese");
      setCurrentLanguage("japanese");
      setDubPlayerVisibility("none");
      setSubPlayerVisibility("block");
      setSubPlayerVolume(dubPlayerVolume);
      updateSourceCallback(currentSubSource);
      setDubPlayerVolume(0);
    }
  };

  const handleProgress = (e: any, playerLanguage: "dub" | "sub") => {
    localStorage.setItem(`${playerLanguage}Time`, e.playedSeconds);
  };

  const styles = {
    boxShadow: "3px 3px 3px black",
  };

  return currentDubLink && currentSubLink ? (
    <>
      <h1 id="player-header">{props.files.episodeInfo}</h1>
      <div id="dub-player">
        <div style={{ display: dubPlayerVisibility }} className="player">
          <ReactPlayer
            ref={dubPlayer}
            url={currentDubLink.file}
            playing={playing}
            volume={dubPlayerVolume}
            width="100%"
            height="100%"
            onBuffer={props.onBuffer}
            onProgress={props.onProgress ? props.onProgress : (e) => handleProgress(e, "dub")}
            onDuration={props.onDuration}
            onEnded={props.onEnded}
            onStart={() => props.onStart(dubPlayer, "dub")}
            style={styles}
            className="main-video-player"
          />
        </div>
      </div>
      <div id="sub-player">
        <div style={{ display: subPlayerVisibility }} className="player">
          <ReactPlayer
            ref={subPlayer}
            url={currentSubLink.file}
            playing={playing}
            volume={subPlayerVolume}
            width="100%"
            height="100%"
            onBuffer={props.onBuffer}
            onProgress={props.onProgress ? props.onProgress : (e) => handleProgress(e, "sub")}
            onDuration={props.onDuration}
            onEnded={props.onEnded}
            onStart={props.onStart}
            style={styles}
            className="main-video-player"
          />
        </div>
        <PlayerControls
          handlePlayerVolume={currentLanguage === "english" ? setDubPlayerVolume : setSubPlayerVolume}
          handlePlayerPlaying={setPlaying}
          playerPlaying={playing}
          currentPlayerLanguage={currentLanguage}
          handlePlayerCurrentLanguage={changePlayerLanguage}
          videoFiles={currentLanguage === "english" ? props.files.dub : props.files.sub}
          currentSource={currentLanguage === "english" ? currentDubSource : currentSubSource}
          currentQuality={currentLanguage === "english" ? currentDubQuality : currentSubQuality}
          changeVideoFiles={updateVideo}
        />
      </div>
    </>
  ) : (
    <p>Loading</p>
  );
}
