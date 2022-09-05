import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import "semantic-ui-css/semantic.min.css";
import { Segment, Flag, Popup, Progress } from "semantic-ui-react";
import "../styles/EpisodePlayer.css";
import QualitySelector from "./QualitySelector";
import WaitingForPlayer from "./WaitingForPlayer";

function EpisodePlayer(props) {
  const flagOpacity = {
    FULL: "1",
    HALF: "0.5",
  };
  let storage = window.sessionStorage;
  let videoPlayer = useRef(null);
  const [currentUrl, setCurrentUrl] = useState();
  const [currentTotalDuration, setCurrentTotalDuration] = useState();
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState();
  const [playing, setPlaying] = useState(true);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [muteButtonText, setMuteButtonText] = useState("Mute");
  const [playerWidth, setPlayerWidth] = useState("100%");
  const [playerHeight, setPlayerHeight] = useState("100%");
  const [usFlagOpacity, setUsFlagOpacity] = useState(flagOpacity.HALF);
  const [jpFlagOpacity, setJpFlagOpacity] = useState(flagOpacity.FULL);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [currentPlayedTime, setCurrentPlayedTime] = useState(0);
  const [willAutoPlay, setWillAutoPlay] = useState(true);

  let muteIcon = <i class="volume off icon" />;
  let unMuteIcon = <i class="volume up icon" />;
  const [currentMutedIcon, setCurrentMutedIcon] = useState(muteIcon);
  const [currentSources, setCurrentSources] = useState({ dub: "", sub: "" });
  let playIcon = <i class="play icon" />;
  let pauseIcon = <i class="pause icon" />;
  const [currentPlayIcon, setCurrentPlayIcon] = useState(pauseIcon);
  const [playButtonText, setPlayButtonText] = useState("Pause");

  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const [defaultDubSource, setDefaultDubSource] = useState(
    storage.defaultDubSource ? storage.defaultDubSource : "Anime Owl"
  );
  const [defaultSubSource, setDefaultSubSource] = useState(
    storage.defaultSubSource ? storage.defaultSubSource : "Anime Owl"
  );

  const history = useHistory();

  const setVideoInfo = (language, sourceName, fileIndex) => {
    const episodes = JSON.parse(storage.videoData);
    let videoLink;
    if (language === "en") {
      setUsFlagOpacity(flagOpacity.FULL);
      setJpFlagOpacity(flagOpacity.HALF);
      storage.currentDubSourceName = sourceName;
      storage.currentDubFileIndex = fileIndex;
      for (let i = 0; i < episodes.dub.length; i++) {
        if (episodes.dub[i].source === sourceName) {
          videoLink = episodes.dub[i].files[fileIndex].file;

          break;
        }
      }
      setCurrentSources({
        dub: storage.currentDubSourceName,
        dubQuality: storage.currentDubFileIndex,
      });
    }

    if (language === "jp") {
      setUsFlagOpacity(flagOpacity.HALF);
      setJpFlagOpacity(flagOpacity.FULL);
      storage.currentSubSourceName = sourceName;
      storage.currentSubFileIndex = fileIndex;
      for (let i = 0; i < episodes.dub.length; i++) {
        if (episodes.sub[i].source === sourceName) {
          videoLink = episodes.sub[i].files[fileIndex].file;
          break;
        }
      }
      setCurrentSources({
        sub: storage.currentSubSourceName,
        subQuality: storage.currentSubFileIndex,
      });
    }
    setCurrentUrl(videoLink);
    setIsVideoLoading(false);
  };

  const getVideoInfo = async () => {
    setIsVideoLoading(true);
    storage.currentVideoTime = 0;

    console.log("Getting video info");
    fetch(`${process.env.REACT_APP_API_CALL}${props.apiEndpoint}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        storage.setItem("videoData", JSON.stringify(data));
        data.dub.forEach((source) => {
          if (source.source === "Gogoapi" || source.source === "Gogo") {
            storage.defaultDubSource = source.source;
            setDefaultDubSource(source.source);
          } else {
            storage.defaultDubSource = "Anime Owl";
          }
        });
        data.sub.forEach((source) => {
          if (source.source === "Gogoapi" || source.source === "Gogo") {
            storage.defaultSubSource = source.source;
            setDefaultSubSource(source.source);
          } else {
            storage.defaultSubSource = "Anime Owl";
          }
        });

        setVideoInfo("en", storage.defaultDubSource, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!storage.currentLink) {
      storage.setItem("currentLink", window.location.href);
    }
    if (!storage.currentVideoTime) {
      storage.setItem("currentVideoTime", 0);
    }

    if (storage.currentLink === window.location.href) {
      if (storage.videoData) {
        setVideoInfo("en", defaultDubSource, 0);
      } else {
        getVideoInfo();
      }
    } else {
      storage.setItem("currentLink", window.location.href);
      getVideoInfo();
    }
  }, []);
  if (isVideoLoading) {
    return <WaitingForPlayer />;
  } else {
    const onFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        setPlayerWidth("100%");
        setPlayerHeight("100%");

        document
          .getElementsByClassName("controls-wrapper")[0]
          .classList.remove("fullscreen-controls");
      } else {
        setPlayerWidth("100%");
        setPlayerHeight("100%");
        document
          .getElementsByClassName("controls-wrapper")[0]
          .classList.add("fullscreen-controls");
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);

    let seconds;
    const onControlsFlagClick = (flag) => {
      seconds = videoPlayer.current.getCurrentTime();
      storage.setItem("currentVideoTime", seconds);

      if (flag === "us" && jpFlagOpacity === flagOpacity.HALF) {
        setUsFlagOpacity(flagOpacity.HALF);
        setJpFlagOpacity(flagOpacity.FULL);

        let sourceName = storage.currentDubSourceName
          ? storage.currentDubSourceName
          : defaultDubSource;
        let fileIndex = storage.currentDubFileIndex
          ? storage.currentDubFileIndex
          : 0;

        setVideoInfo("en", sourceName, fileIndex);
      }
      if (flag === "jp" && usFlagOpacity === flagOpacity.HALF) {
        setUsFlagOpacity(flagOpacity.FULL);
        setJpFlagOpacity(flagOpacity.HALF);

        let sourceName = storage.currentSubSourceName
          ? storage.currentSubSourceName
          : defaultSubSource;
        let fileIndex = storage.currentSubFileIndex
          ? storage.currentSubFileIndex
          : 0;

        setVideoInfo("jp", sourceName, fileIndex);
      }
    };

    const onControlsMuteClick = () => {
      if (currentMutedIcon.props.class === "volume off icon") {
        setCurrentMutedIcon(unMuteIcon);
        setMuteButtonText("Mute");
      }
      if (currentMutedIcon.props.class === "volume up icon") {
        setCurrentMutedIcon(muteIcon);
        setMuteButtonText("Unmute");
      }
      setMuted(!muted);
    };
    const onControlsPlayClick = () => {
      if (currentPlayIcon.props.class === "play icon") {
        setCurrentPlayIcon(pauseIcon);
        setPlayButtonText("Pause");
        setPlaying(true);
      }
      if (currentPlayIcon.props.class === "pause icon") {
        setCurrentPlayIcon(playIcon);
        setPlayButtonText("Play");
        setPlaying(false);
      }
    };

    const onVolumeSliderChange = (e) => {
      setVolume(e.target.value / 100);
    };

    const onFullscreenClick = () => {
      if (!document.fullscreenElement) {
        document.getElementById("player").requestFullscreen();
      }

      if (document.fullscreenElement) {
        document.exitFullscreen();

        setPlayerWidth("100%");
        setPlayerHeight("100%");
      }
    };

    const formatTime = (timeInSeconds) => {
      let hours = Math.floor(timeInSeconds / 3600)
        .toString()
        .padStart(2, "0");
      let minutes = Math.floor((timeInSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      let seconds = Math.floor(timeInSeconds % 60)
        .toString()
        .padStart(2, "0");

      return hours + ":" + minutes + ":" + seconds;
    };

    const onVideoProgress = (progress) => {
      if (isNaN(currentTotalDuration) && videoPlayer.current.getDuration()) {
        setCurrentTotalDuration(videoPlayer.current.getDuration());
      }
      setProgressBarPercent(
        (progress.playedSeconds / currentTotalDuration) * 100
      );

      setPlayedSeconds(progress.playedSeconds);
      const time = formatTime(progress.playedSeconds);
      setCurrentPlayedTime(time);
      storage.setItem("currentVideoTime", playedSeconds);
    };

    const onSeekSliderInput = (e) => {
      videoPlayer.current.seekTo(e.target.value);
      setProgressBarPercent((e.target.value / currentTotalDuration) * 100);
      const time = formatTime(playedSeconds);
      setCurrentPlayedTime(time);
      storage.setItem("currentVideoTime", playedSeconds);
    };
    const onVideoStart = () => {
      videoPlayer.current.seekTo(storage.currentVideoTime);
      setCurrentTotalDuration(videoPlayer.current.getDuration());
    };

    const moveToNextEpisode = (episodeNum) => {
      const lastEps = [
        "/vods/db/153",
        "/vods/dbz/291",
        "/vods/dbkai/167",
        "/vods/dbs/131",
        "/vods/dbgt/64",
      ];
      if (
        !lastEps.includes(window.location.pathname) &&
        !window.location.pathname.includes("movie")
      ) {
        let urlArray = window.location.pathname.split("/");
        urlArray[urlArray.length - 1] =
          parseInt(urlArray[urlArray.length - 1]) + episodeNum;
        const urlString = urlArray.join("/");
        history.push(urlString);
      }
    };

    const checkAutoPlay = () => {
      if (willAutoPlay) {
        moveToNextEpisode(1);
      }
    };

    const onAutoPlayBoxClick = (e) => {
      setWillAutoPlay(!willAutoPlay);
    };

    return (
      <div className="episode-player" id="player">
        <ReactPlayer
          ref={videoPlayer}
          url={currentUrl}
          muted={muted}
          playing={playing}
          volume={volume}
          onReady={() => {}}
          onStart={() => {
            onVideoStart();
          }}
          onEnded={() => {
            checkAutoPlay();
          }}
          onProgress={(progress) => onVideoProgress(progress)}
          width={playerWidth}
          height={playerHeight}
          config={{
            file: {
              attributes: {
                preload: "",
              },
            },
          }}
        />
        <div className="video-seek-wrapper">
          <Popup
            trigger={
              <input
                type="range"
                max={currentTotalDuration}
                min="0"
                onInput={(e) => onSeekSliderInput(e)}
                className="seek-slider"
              />
            }
            inverted
            basic
            position="top center"
            size="mini"
            content={currentPlayedTime}
          />
        </div>
        <Progress
          attached="top"
          inverted
          percent={progressBarPercent}
          className={"progress-bar"}
          size="tiny"
        />
        <div className="controls-wrapper">
          <Segment inverted className="controls">
            <span id="nextButtonWrapper">
              <Popup
                inverted
                basic
                position="bottom center"
                trigger={
                  <i
                    id="prevIcon"
                    class="arrow left icon"
                    onClick={() => moveToNextEpisode(-1)}
                  />
                }
                content="Previous Episode"
              />
              <Popup
                inverted
                basic
                position="bottom center"
                trigger={
                  <i
                    id="nextIcon"
                    class="arrow right icon"
                    onClick={() => moveToNextEpisode(1)}
                  />
                }
                content="Next Episode"
              />
            </span>
            <span id="autoplayWrapper">
              <input
                type="checkbox"
                name="autoplay"
                onChange={(e) => onAutoPlayBoxClick(e)}
                checked={willAutoPlay}
                id="autoPlayButton"
              />
              <label htmlFor="autoplay" id="autoplayText">
                Auto Play
              </label>
            </span>
            <span>
              <Popup
                inverted
                basic
                position="bottom right"
                trigger={
                  <Flag
                    name="us"
                    onClick={() => onControlsFlagClick("us")}
                    className="us-flag control-icon"
                  />
                }
                content="Set language to English"
                size="mini"
              />
              /{" "}
              <Popup
                inverted
                basic
                position="bottom left"
                trigger={
                  <Flag
                    name="jp"
                    onClick={() => onControlsFlagClick("jp")}
                    className="jp-flag control-icon"
                  />
                }
                content="Set language to Japanese"
                size="mini"
              />
            </span>
            <span
              className="play-button-wrapper control-icon"
              onClick={() => onControlsPlayClick()}
            >
              <Popup
                trigger={currentPlayIcon}
                inverted
                basic
                position="bottom center"
                size="mini"
                content={playButtonText}
              />{" "}
            </span>
            <span
              className="mute-button-wrapper control-icon"
              onClick={() => onControlsMuteClick()}
            >
              <Popup
                trigger={currentMutedIcon}
                inverted
                basic
                position="bottom center"
                size="mini"
                content={muteButtonText}
              />{" "}
            </span>

            <span>
              {" "}
              <input
                type="range"
                min="0"
                max="100"
                id="stream-volume-slider"
                onInput={(e) => onVolumeSliderChange(e)}
              />
            </span>
            <span className="fullscreen-icon-wrapper control-icon">
              <QualitySelector
                dubFiles={JSON.parse(storage.videoData).dub}
                subFiles={JSON.parse(storage.videoData).sub}
                selector={setVideoInfo}
                currentQuality={currentSources}
              />
            </span>
            <span
              className="video-settings-icon-wrapper control-icon"
              onClick={() => onFullscreenClick()}
            >
              <Popup
                trigger={<i className="expand arrows alternate icon" />}
                inverted
                basic
                position="top center"
                size="mini"
                content="Fullscreen"
              />
            </span>
          </Segment>
        </div>
        <style jsx>
          {`
            .controls-wrapper {
              width: ${playerWidth};
            }
            .us-flag {
              opacity: ${usFlagOpacity};
            }
            .jp-flag {
              opacity: ${jpFlagOpacity};
            }
            .progress-bar {
              width: ${playerWidth};
            }
          `}
        </style>
      </div>
    );
  }
}

export default EpisodePlayer;
