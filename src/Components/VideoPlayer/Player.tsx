import ReactPlayer from "react-player";
import { useState, useRef, useEffect } from "react";
import "../../css/Player.css";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";

import { StructuredFileInfo, file } from "../../../types";
import { OnProgressProps } from "react-player/base";

// some things to consider: adding intro offset to specific video sources. If one source has an offset, then the other source needs to account for that. I.E: If the dub source doesnt have an intro, every time the sub source seeks/gets set/time changes in general, the offset from the dub source needs to be applied.

// might also want to look into lazy loading dub/sub for performance reasons
// with lazy loading, I would need to store the current time of the previous player before switching to the next player, potentially need to update the syncPlayers function to have another optional parameter of time to sync to.

export type watchVodStartCallback = (
  language: "dub" | "sub",
  dubPlayer: React.RefObject<ReactPlayer>,
  subPlayer: React.RefObject<ReactPlayer>,
  dubOffsets: offsets,
  subOffsets: offsets
) => void;

export type offsets = { intro: number; outro: number };

export type watchStreamStartCallback = (
  dubPlayer: React.RefObject<ReactPlayer>,
  subPlayer: React.RefObject<ReactPlayer>,
  playerTime: number,
  dubOffsets: offsets,
  subOffsets: offsets
) => void;

interface VideoPlayerProps {
  files: StructuredFileInfo;

  playing?: boolean;
  width?: number;
  onReady?: () => void;
  onVodStart?: watchVodStartCallback;
  onStreamStart?: watchStreamStartCallback;
  onProgress?: () => void;
  onDuration?: () => void;
  onPause?: () => void;
  onBuffer?: () => void;
  onSeek?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  lazyLoad?: boolean;
  playerType: "vod" | "stream";
  episodeFinishedMessage: { dub: string; sub: string };
  maxWidth: number;
  theaterModeMaxWidth: number;
}

export default function Player(props: VideoPlayerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState(props.playing || false);
  const [dubPlayerVolume, setDubPlayerVolume] = useState(0);
  const [subPlayerVolume, setSubPlayerVolume] = useState(0);

  const playerLanguage = localStorage.getItem("playerLanguage");
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "japanese">(
    playerLanguage === "english" || playerLanguage === "japanese" ? playerLanguage : "english"
  );

  const [availableLanguages, setAvaiableLanguages] = useState<Array<string>>([]);

  const [currentDubLink, setCurrentDubLink] = useState<file>();
  const [currentDubSource, setCurrentDubSource] = useState("");
  const [currentDubQuality, setCurrentDubQuality] = useState("");
  const [currentSubLink, setCurrentSubLink] = useState<file>();
  const [currentSubSource, setCurrentSubSource] = useState("");
  const [currentSubQuality, setCurrentSubQuality] = useState("");

  // const defaultDubPlayerVisibility = playerLanguage === "english" ? "block" : playerLanguage === null ? "block" : "none";
  // const defaultSubPlayerVisibility = playerLanguage === "japanese" ? "block" : "none";
  const [dubPlayerVisibility, setDubPlayerVisibility] = useState<"block" | "none">();
  const [subPlayerVisibility, setSubPlayerVisibility] = useState<"block" | "none">();

  const [dubPlayerProgressPercent, setDubPlayerProgressPercent] = useState<number>(0);
  const [subPlayerProgressPercent, setSubPlayerProgressPercent] = useState<number>(0);

  const [currentPlayerTime, setCurrentPlayerTime] = useState<number>(0);

  const [isDubFinished, setIsDubFinished] = useState(false);
  const [isSubFinished, setIsSubFinished] = useState(false);

  const [dubOffsets, setDubOffsets] = useState<offsets>({ intro: 0, outro: 0 });
  const [subOffsets, setSubOffsets] = useState<offsets>({ intro: 0, outro: 0 });

  const [fullScreen, setIsFullScreen] = useState(false);

  const dubPlayer = useRef<ReactPlayer>(null);
  const subPlayer = useRef<ReactPlayer>(null);

  const resetPlayer = () => {
    setIsDubFinished(false);
    setIsSubFinished(false);
    setPlaying(true);
  };

  useEffect(() => {
    resetPlayer();
  }, [props.files]);

  useEffect(() => {
    setLoading(true);
    // setting default source
    if (Object.keys(props.files.dub).length > 0) {
      let source;
      let sourceName;
      if (props.files.dub["Gogoapi"] && props.files.dub["Gogoapi"].files.length > 0) {
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
      setCurrentDubLink(source.files.find((file) => file.label === selectedQuality) || source.files[0]);
      setCurrentDubSource(sourceName);
      setCurrentDubQuality(selectedQuality || source.files[0].label);
      setDubOffsets({ intro: source.introOffset, outro: source.outroOffset });
      if (!availableLanguages.includes("english")) {
        setAvaiableLanguages([...availableLanguages, "english"]);
      }
    }
  }, [props.files]);

  useEffect(() => {
    setLoading(true);
    if (Object.values(props.files.sub).length > 0) {
      let source;
      let sourceName;

      if (props.files.sub["Gogoapi"] && props.files.sub["Gogoapi"].files.length > 0) {
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
      setCurrentSubLink(source.files.find((file) => file.label === selectedQuality) || source.files[0]);
      setCurrentSubSource(sourceName);
      setCurrentSubQuality(selectedQuality || source.files[0].label);
      setSubOffsets({ intro: source.introOffset, outro: source.outroOffset });
      if (!availableLanguages.includes("japanese")) {
        setAvaiableLanguages([...availableLanguages, "japanese"]);
      }
    }
  }, [props.files]);

  useEffect(() => {
    const playerLanguage = localStorage.getItem("playerLanguage");
    if ((playerLanguage === "english" && currentDubLink) || !currentSubLink) {
      setCurrentLanguage("english");
      setDubPlayerVisibility("block");
      setSubPlayerVisibility("none");
    } else if ((playerLanguage === "japanese" && currentSubLink) || !currentDubLink) {
      setCurrentLanguage("japanese");
      setDubPlayerVisibility("none");
      setSubPlayerVisibility("block");
    } else {
      setCurrentLanguage("english");
      setDubPlayerVisibility("block");
      setSubPlayerVisibility("none");
    }
    setLoading(false);
  }, [currentDubLink, currentSubLink]);

  useEffect(() => {
    const players = document.getElementById("players");
    // attach event listener first so state will update
    if (players && !players.onfullscreenchange) {
      players.onfullscreenchange = () => {
        if (document.fullscreenElement) {
          setIsFullScreen(true);
          console.log("enter");
        } else {
          setIsFullScreen(false);
          console.log("exit");
        }
      };
    }
  });

  const updateVideo = (file: file, sourceName: string, offsets: offsets) => {
    if (currentLanguage === "english") {
      setCurrentDubLink(file);
      setCurrentDubQuality(file.label);
      setCurrentDubSource(sourceName);
      setDubOffsets(offsets);
    }
    if (currentLanguage === "japanese") {
      setCurrentSubLink(file);
      setCurrentSubQuality(file.label);
      setCurrentSubSource(sourceName);
      setSubOffsets(offsets);
    }
  };

  const syncPlayers = (syncFrom: "dub" | "sub") => {
    console.log(subOffsets);
    console.log(dubOffsets);
    if (dubPlayer.current && subPlayer.current) {
      let subOffset = 0;
      let dubOffset = 0;

      if (subOffsets.intro > 0 && dubOffsets.intro === 0) {
        console.log("sub offset");
        subOffset = subOffsets.intro;
        dubOffset = -1 * subOffsets.intro;
      } else if (dubOffsets.intro > 0 && subOffsets.intro === 0) {
        console.log("dubOffset");
        subOffset = -1 * dubOffsets.intro;
        dubOffset = dubOffsets.intro;
      } else if (subOffsets.intro === dubOffsets.intro) {
        console.log("same");
        subOffset = 0;
        dubOffset = 0;
      }

      // could I pause the other player here? would that do anything?
      if (syncFrom === "dub") {
        subPlayer.current.seekTo(dubPlayer.current.getCurrentTime() + subOffset);
      } else if (syncFrom === "sub") {
        console.log(subPlayer.current.getCurrentTime() + dubOffset);
        dubPlayer.current.seekTo(subPlayer.current.getCurrentTime() + dubOffset);
      }
    }
  };

  const changePlayerLanguage = (language: "english" | "japanese") => {
    if (language === "english") {
      localStorage.setItem("playerLanguage", "english");
      setCurrentLanguage("english");
      setDubPlayerVisibility("block");
      setSubPlayerVisibility("none");
      setDubPlayerVolume(subPlayerVolume);
      setSubPlayerVolume(0);
      syncPlayers("sub");
    } else if (language === "japanese") {
      localStorage.setItem("playerLanguage", "japanese");
      setCurrentLanguage("japanese");
      setDubPlayerVisibility("none");
      setSubPlayerVisibility("block");
      setSubPlayerVolume(dubPlayerVolume);
      syncPlayers("dub");
      setDubPlayerVolume(0);
    }
  };

  const getVideoDuration = (): number => {
    let videoDuration = 0;
    if (currentLanguage === "english" && dubPlayer.current) {
      videoDuration = dubPlayer.current.getDuration();
    } else if (currentLanguage === "japanese" && subPlayer.current) {
      videoDuration = subPlayer.current.getDuration();
    }
    return videoDuration;
  };

  const handleProgress = (e: OnProgressProps, playerLanguage: "dub" | "sub") => {
    if (props.playerType === "vod") {
      localStorage.setItem(`${playerLanguage}Time`, `${e.playedSeconds}`);
    }
    const videoDuration = getVideoDuration();

    if (playerLanguage === "dub" && currentLanguage === "english") {
      const percentage = (e.playedSeconds / videoDuration) * 100;
      setDubPlayerProgressPercent(percentage);
    } else if (playerLanguage === "sub" && currentLanguage === "japanese") {
      const percentage = (e.playedSeconds / videoDuration) * 100;
      setSubPlayerProgressPercent(percentage);
    }
    setCurrentPlayerTime(e.playedSeconds);
  };

  const handleSeek = (value: number) => {
    if (subPlayer.current) {
      subPlayer.current.seekTo(value);
      setIsSubFinished(false);
    }
    if (dubPlayer.current) {
      dubPlayer.current.seekTo(value);
      setIsDubFinished(false);
    }
  };

  const handleEnd = (language: string) => {
    console.log(`${language} end`);
    if (language === "dub") {
      setIsDubFinished(true);
    }
    if (language === "sub") {
      setIsSubFinished(true);
    }

    if ((language === "dub" && isSubFinished) || (language === "sub" && isDubFinished)) {
      setPlaying(false);
      if (props.onEnded) {
        console.log("both ended");
        props.onEnded();
      }
    }
    localStorage.setItem(`${language}Time`, "0");
  };

  const handleStart = () => {
    if (props.playerType === "vod" && props.onVodStart) {
      const language = currentLanguage === "english" ? "dub" : "sub";
      props.onVodStart(language, dubPlayer, subPlayer, subOffsets, dubOffsets);
    } else if (props.playerType === "stream" && props.onStreamStart) {
      const player = dubPlayer.current ? dubPlayer.current : subPlayer.current;
      if (player) {
        props.onStreamStart(dubPlayer, subPlayer, player.getCurrentTime(), dubOffsets, subOffsets);
      }
    }
    setIsDubFinished(false);
    setIsSubFinished(false);
  };

  const syncToStream = (): void => {
    if (props.onStreamStart && props.playerType === "stream") {
      const player = dubPlayer.current ? dubPlayer.current : subPlayer.current;
      if (player) {
        props.onStreamStart(dubPlayer, subPlayer, player.getCurrentTime(), dubOffsets, subOffsets);
      }
    }
  };

  const handleFullScreen = (): void => {
    const players = document.getElementById("players");

    if (!document.fullscreenElement) {
      players?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handlePlaying = (): void => {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
      setIsDubFinished(false);
      setIsSubFinished(false);
    }
  };

  const styles = {
    boxShadow: "3px 3px 3px black",
  };

  return loading ? (
    <></>
  ) : (
    <>
      <h1 id="player-header">{props.files.episodeInfo}</h1>
      <div id="players">
        {currentDubLink ? (
          <div id="dub-player">
            <div style={{ display: dubPlayerVisibility }} className="player">
              {isDubFinished ? (
                <div className="player-finished">
                  <h1 className="player-finished-message">{props.episodeFinishedMessage.dub}</h1>
                </div>
              ) : (
                <></>
              )}
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
                onEnded={() => handleEnd("dub")}
                onStart={handleStart}
                style={styles}
                className="main-video-player"
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {currentSubLink ? (
          <div id="sub-player">
            <div style={{ display: subPlayerVisibility }} className="player">
              {isSubFinished ? (
                <div className="player-finished">
                  <h1 className="player-finished-message">{props.episodeFinishedMessage.sub}</h1>
                </div>
              ) : (
                <></>
              )}
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
                onEnded={() => handleEnd("sub")}
                onStart={handleStart}
                style={styles}
                className="main-video-player"
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className={fullScreen ? "fullscreen-controls controls" : "controls"}>
          <ProgressBar
            currentPlayerTimePercent={currentLanguage === "english" ? dubPlayerProgressPercent : subPlayerProgressPercent}
            handleSeek={handleSeek}
            getDuration={getVideoDuration}
            playerType={props.playerType}
            currentPlayerTime={currentPlayerTime}
          />
          <PlayerControls
            syncToStream={props.playerType === "stream" ? syncToStream : null}
            handlePlayerVolume={currentLanguage === "english" ? setDubPlayerVolume : setSubPlayerVolume}
            handlePlayerPlaying={handlePlaying}
            playerPlaying={playing}
            currentPlayerLanguage={currentLanguage}
            handlePlayerCurrentLanguage={changePlayerLanguage}
            videoFiles={currentLanguage === "english" ? props.files.dub : props.files.sub}
            currentSource={currentLanguage === "english" ? currentDubSource : currentSubSource}
            currentQuality={currentLanguage === "english" ? currentDubQuality : currentSubQuality}
            changeVideoFiles={updateVideo}
            controlsType={props.playerType}
            handleFullScreen={handleFullScreen}
            availableLanguages={availableLanguages}
          />
        </div>
      </div>
    </>
  );
}
