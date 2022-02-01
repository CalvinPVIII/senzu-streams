import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "semantic-ui-css/semantic.min.css";
import { Segment, Flag, Popup, Progress } from "semantic-ui-react";
import "../styles/EpisodePlayer.css";
import WaitingForPlayer from "./WaitingForPlayer";

function EpisodePlayer(props) {
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
    const [usFlagOpacity, setUsFlagOpacity] = useState("50%");
    const [jpFlagOpacity, setJpFlagOpacity] = useState("100%");
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [currentPlayedTime, setCurrentPlayedTime] = useState(0);
    const [videoFile, setVideoFile] = useState();
    const [currentVideoQuality, setCurrentVideoQuality] = useState("360 P");

    let muteIcon = <i class="volume off icon" />;
    let unMuteIcon = <i class="volume up icon" />;
    const [currentMutedIcon, setCurrentMutedIcon] = useState(muteIcon);

    let playIcon = <i class="play icon" />;
    let pauseIcon = <i class="pause icon" />;
    const [currentPlayIcon, setCurrentPlayIcon] = useState(pauseIcon);
    const [playButtonText, setPlayButtonText] = useState("Pause");

    const [isVideoLoading, setIsVideoLoading] = useState(true);

    const setVideoInfo = (videoObject, language) => {
        let videoLink;
        if (language === "en") {
            for (let i = 0; i < videoObject.dub.files.length; i++) {
                if (videoObject.dub.files[i].label === currentVideoQuality) {
                    videoLink = videoObject.dub.files[i].file;
                    break;
                } else {
                }
            }

            setCurrentUrl(videoLink);
            setCurrentTotalDuration(videoObject.dub.episodeLength);
        }
        if (language === "jp") {
            for (let i = 0; i < videoObject.sub.files.length; i++) {
                if (videoObject.sub.files[i].label === currentVideoQuality) {
                    videoLink = videoObject.sub.files[i].file;
                    break;
                } else {
                }
            }
            setCurrentUrl(videoLink);
            setCurrentTotalDuration(videoObject.sub.episodeLength);
        }
        setVideoFile(videoObject);

        setIsVideoLoading(false);
    };

    const getVideoInfo = async () => {
        setIsVideoLoading(true);
        console.log("Getting video info");
        fetch(`http://localhost:3001/${props.series}/${props.episode}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                storage.setItem("videoData", JSON.stringify(data));
                setVideoInfo(data, "en");
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
                setVideoInfo(
                    JSON.parse(storage.videoData),
                    "en",
                    JSON.parse(storage.videoData).dub.files[
                        JSON.parse(storage.videoData).dub.files.length - 1
                    ]
                );
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

            if (flag === "us") {
                setUsFlagOpacity("50%");
                setJpFlagOpacity("100%");

                setVideoInfo(videoFile, "en");
                videoPlayer.current.seekTo(storage.currentVideoTime, "seconds");
            }
            if (flag === "jp") {
                setUsFlagOpacity("100%");
                setJpFlagOpacity("50%");

                setVideoInfo(videoFile, "jp");
                videoPlayer.current.seekTo(storage.currentVideoTime, "seconds");
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
            setProgressBarPercent(
                (e.target.value / currentTotalDuration) * 100
            );
            const time = formatTime(playedSeconds);
            setCurrentPlayedTime(time);
            storage.setItem("currentVideoTime", playedSeconds);
        };
        const onVideoQualityOptionClick = (file, language) => {
            setCurrentVideoQuality(file.label);
            setVideoInfo(videoFile, language);
        };
        let videoSettingsMenu;
        if (usFlagOpacity === "50%") {
            videoSettingsMenu = (
                <>
                    <p>Settings</p>
                    {videoFile.dub.files.map((qualityOption) => (
                        <p
                            key={qualityOption.label}
                            className={`video-quality-option ${qualityOption.label.substring(
                                0,
                                qualityOption.label.indexOf(" ")
                            )}`}
                            onClick={() => {
                                onVideoQualityOptionClick(qualityOption, "en");
                            }}
                        >
                            {qualityOption.label}
                        </p>
                    ))}
                </>
            );
        } else if (jpFlagOpacity === "50%") {
            videoSettingsMenu = (
                <>
                    <p>Settings</p>
                    {videoFile.sub.files.map((qualityOption) => (
                        <p
                            key={qualityOption.label}
                            className={`video-quality-option ${qualityOption.label.substring(
                                0,
                                qualityOption.label.indexOf(" ")
                            )}`}
                            onClick={() => {
                                onVideoQualityOptionClick(qualityOption, "jp");
                            }}
                        >
                            {qualityOption.label}
                        </p>
                    ))}
                </>
            );
        }

        return (
            <div className="episode-player" id="player">
                <ReactPlayer
                    ref={videoPlayer}
                    url={currentUrl}
                    muted={muted}
                    playing={playing}
                    volume={volume}
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
                        <span>
                            <Popup
                                inverted
                                basic
                                position="bottom right"
                                trigger={
                                    <Flag
                                        name="us"
                                        onClick={() =>
                                            onControlsFlagClick("us")
                                        }
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
                                        onClick={() =>
                                            onControlsFlagClick("jp")
                                        }
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
                            <Popup
                                trigger={<i className="cog alternate icon" />}
                                inverted
                                basic
                                position="top center"
                                size="mini"
                                content={videoSettingsMenu}
                                on="click"
                                pinned
                            />
                        </span>
                        <span
                            className="video-settings-icon-wrapper control-icon"
                            onClick={() => onFullscreenClick()}
                        >
                            <Popup
                                trigger={
                                    <i className="expand arrows alternate icon" />
                                }
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
