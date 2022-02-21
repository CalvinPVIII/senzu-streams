import ReactPlayer from "react-player";
import React, { useState, useRef, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Segment, Flag, Progress, Popup } from "semantic-ui-react";
import WaitingForPlayer from "./WaitingForPlayer";
import QualitySelector from "./QualitySelector";
import "../styles/LivestreamPlayer.css";

function LivestreamPlayer(props) {
    let storage = window.sessionStorage;
    let subPlayer = useRef(null);
    let dubPlayer = useRef(null);
    const [apiError, setApiError] = useState(false);
    const [isDubOver, setIsDubOver] = useState(false);
    const [isSubOver, setIsSubOver] = useState(false);
    const [subReady, setSubReady] = useState(false);
    const [dubReady, setDubReady] = useState(false);
    const [subPlaying, setSubPlaying] = useState(false);
    const [dubPlaying, setDubPlaying] = useState(false);

    const [videoFileSegmentDisplay, setVideoFileSegmentDisplay] =
        useState("none");
    const [episodeInfo, setEpisodeInfo] = useState();
    const [dubVideoLink, setDubVideoLink] = useState();
    const [subVideoLink, setSubVideoLink] = useState();
    const [playerWidth, setPlayerWidth] = useState("70%");
    const [playerHeight, setPlayerHeight] = useState("70%");
    const [playerOpacity, setPlayerOpacity] = useState(1);
    const [secondsTillNextVideo, setSecondsTillNextVideo] = useState();
    const [dubMuted, setDubMuted] = useState(true);
    const [volume, setVolume] = useState();
    const [subMuted, setSubMuted] = useState(true);
    const [activePlayer, setActivePlayer] = useState(
        storage.currentLanguage === "en" ? dubPlayer : subPlayer
    );
    const [subFiles, setSubFiles] = useState();
    const [dubFiles, setDubFiles] = useState();
    const [progressPercent, setProgressPercent] = useState(0);
    const [episodeDuration, setEpisodeDuration] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [muteButtonText, setMuteButtonText] = useState("Mute");
    const [overlayVisibilty, setOverlayVisibility] = useState("none");
    const [overlayHeight, setOverlayHeight] = useState("33%");
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isSubBuffering, setIsSubBuffering] = useState("");
    const [isDubBuffering, setIsDubBuffering] = useState("");
    const [fullscreenControlsVisibility, setFullscreenControlsVisibility] =
        useState("none");
    let muteIcon = <i class="volume off icon" />;
    let unMuteIcon = <i class="volume up icon" />;
    const [currentMutedIcon, setCurrentMutedIcon] = useState(muteIcon);

    const setVideoQuality = (language, sourceName, fileIndex) => {
        console.log(language, sourceName, fileIndex);
        if (language === "en") {
            storage.dubSource = sourceName;
            storage.dubQuality = fileIndex;
        } else if (language === "jp") {
            storage.subSource = sourceName;
            storage.subQuality = fileIndex;
        }
        window.location.reload();
    };

    const setVideoInfo = () => {
        setIsVideoLoading(true);
        fetch(props.fetchLink)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.isInitialized) {
                    setIsVideoLoading(false);

                    setOverlayVisibility("none");
                    setPlayerOpacity(1);
                    setEpisodeInfo(data.episodeInfo);
                    // this gets the source. If no source has already been set in storage, it will look for Gogo, if there is no Gogo it will pick the first option
                    let dubSource = data.currentDubFiles[0];
                    data.currentDubFiles.forEach((source) => {
                        if (
                            source.source === "Gogoanime" &&
                            !storage.dubSource
                        ) {
                            dubSource = source;
                        }
                        if (source.source === storage.dubSource) {
                            dubSource = source;
                            console.log(dubSource);
                        }
                    });
                    let dubLink;
                    if (
                        storage.dubQuality &&
                        dubSource.files[storage.dubQuality]
                    ) {
                        dubLink = dubSource.files[storage.dubQuality].file;
                    } else {
                        dubLink = dubSource.files[0].file;
                    }

                    let subSource = data.currentSubFiles[0];
                    data.currentSubFiles.forEach((source) => {
                        if (
                            source.source === "Gogoanime" &&
                            !storage.subSource
                        ) {
                            subSource = source;
                        }
                        if (source.source === storage.subSource) {
                            subSource = source;
                        }
                    });
                    let subLink;
                    if (
                        storage.subQuality &&
                        subSource.files[storage.subQuality]
                    ) {
                        subLink = subSource.files[storage.subQuality].file;
                    } else {
                        subLink = subSource.files[0].file;
                    }

                    setDubVideoLink(dubLink);
                    setSubVideoLink(subLink);

                    setSubFiles(data.currentSubFiles);
                    setDubFiles(data.currentDubFiles);

                    setIsDubOver(false);
                    setIsSubOver(false);
                    setEpisodeDuration(data.episodeDuration);
                    setCurrentTime(data.currentTime);

                    if (data.dubLoadError) {
                        props.setSourceErrorMessage(
                            "There was an error loading the dub, the sub is only available for this episode"
                        );
                    } else if (data.subLoadError) {
                        props.setSourceErrorMessage(
                            "There was an error loading the sub, the dub is only available for this episode"
                        );
                    } else {
                        props.setSourceErrorMessage("");
                    }

                    // the current duration has passed the end of the dub episode (i.e the sub is longer)
                    if (data.currentTime >= data.dubDuration) {
                        console.log("yes");
                        // set the dubPlayer to the end of the video
                        dubPlayer.current.seekTo(data.dubDuration - 0.1);
                        // set the subPlayer to the current time
                        subPlayer.current.seekTo(data.currentTime);
                    }
                    // the current duration has passed the end of the sub episode (i.e the dub is longer)
                    if (data.currentTime >= data.subDuration) {
                        // set the subPlayer to the end of the video
                        subPlayer.current.seekTo(data.subDuration - 0.1);
                        // set the dubPlayer to the current time
                        dubPlayer.current.seekTo(data.currentTime);
                    }
                    if (
                        data.currentTime < data.dubDuration &&
                        data.currentTime < data.subDuration
                    ) {
                        dubPlayer.current.seekTo(data.currentTime);
                        subPlayer.current.seekTo(data.currentTime);
                    }
                } else {
                    setTimeout(() => {
                        console.log("getting new info");
                        setVideoInfo();
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        setVideoInfo();
    }, []);

    const onVideoEnd = (language, player) => {
        if (language === "en") {
            setIsDubOver(true);
        } else if (language === "jp") {
            setIsSubOver(true);
        }
        // if secondsTillNextVideo has already been set, return
        if (secondsTillNextVideo !== undefined) {
            return;
        } else {
            if (!activePlayer.current.player.isPlaying) {
                setOverlayVisibility("inline");
            }

            let secondsToSubtract;
            if (currentTime > player.current.getDuration()) {
                secondsToSubtract = currentTime;
            } else {
                secondsToSubtract = player.current.getDuration();
            }
            const episodeDurationDifference = Math.round(
                episodeDuration - secondsToSubtract
            );

            setSecondsTillNextVideo(episodeDurationDifference);
            let seconds = episodeDurationDifference;
            const timer = setInterval(() => {
                seconds--;
                setSecondsTillNextVideo(seconds);
                if (seconds <= 0) {
                    clearInterval(timer);
                    setSecondsTillNextVideo(undefined);
                    onBothVideosEnd();
                }
            }, 1000);
        }
    };
    // const onDubVideoEnd = () => {
    //     setIsDubOver(true);

    //     if (isSubOver === true) {
    //         onBothVideosEnd();
    //     }

    //     if (
    //         subPlayer.current === null ||
    //         subPlayer.current.getCurrentTime() <
    //             subPlayer.current.getDuration() / 2
    //     ) {
    //         console.log("Sub frozen, moving to next episode");
    //         onBothVideosEnd();
    //     }

    //     if (!isSubOver) {
    //         setOverlayVisibility("inline");
    //     }
    // };

    // const onSubVideoEnd = () => {
    //     setIsSubOver(true);

    //     if (isDubOver === true) {
    //         onBothVideosEnd();
    //     }
    //     if (
    //         dubPlayer.current === null ||
    //         dubPlayer.current.getCurrentTime() <
    //             dubPlayer.current.getDuration() / 2
    //     ) {
    //         console.log("Dub frozen, moving to next episode");
    //         onBothVideosEnd();
    //     }
    //     if (!isDubOver) {
    //         setOverlayVisibility("inline");
    //     }
    // };

    const onBothVideosEnd = () => {
        setOverlayVisibility("none");
        setTimeout(() => {
            console.log("getting new info");
            setVideoInfo();
        }, 3000);
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
        if (activePlayer === dubPlayer) {
            setDubMuted(!dubMuted);
        }
        if (activePlayer === subPlayer) {
            setSubMuted(!subMuted);
        }
    };

    const onControlsFlagClick = (flag) => {
        if (flag === "us" && activePlayer !== dubPlayer) {
            setActivePlayer(dubPlayer);

            storage.currentLanguage = "en";
            if (isDubOver) {
                console.log("yes");
                setOverlayVisibility("inline");
            } else if (!isDubOver) {
                setOverlayVisibility("none");
            }
            setDubMuted(subMuted);
            setSubMuted(true);
        }
        if (flag === "jp" && activePlayer !== subPlayer) {
            setActivePlayer(subPlayer);

            storage.currentLanguage = "jp";
            if (isSubOver) {
                setOverlayVisibility("inline");
            } else if (!isSubOver) {
                setOverlayVisibility("none");
            }
            setSubMuted(dubMuted);
            setDubMuted(true);
        }
    };

    const onFullscreenChange = () => {
        if (
            !document.fullscreenElement &&
            !document.webkitIsFullScreen &&
            !document.mozFullScreen &&
            !document.msFullscreenElement
        ) {
            setPlayerWidth("70%");
            setPlayerHeight("70%");
            setFullscreenControlsVisibility("none");
        } else {
            setPlayerWidth("100%");
            setPlayerHeight("100%");
            setFullscreenControlsVisibility("inline");
        }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);

    const onFullscreenClick = () => {
        if (!document.fullscreenElement) {
            if (activePlayer === dubPlayer) {
                dubPlayer.current.wrapper.parentElement.requestFullscreen();
            }
            if (activePlayer === subPlayer) {
                subPlayer.current.wrapper.parentElement.requestFullscreen();
            }
        }

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    const onVolumeSliderChange = (e) => {
        setVolume(e.target.value / 100);
    };

    const onTheaterModeClick = () => {
        props.onTheaterModeClick();
        if (overlayHeight === "33%") {
            setOverlayHeight("43%");
        } else if (overlayHeight === "43%") {
            setOverlayHeight("33%");
        }
    };

    const onVideoProgress = () => {
        setProgressPercent(
            (activePlayer.current.getCurrentTime() / episodeDuration) * 100
        );
    };

    const handleOnPlayerReady = (player) => {
        if (player === "sub") {
            console.log("sub");
            setSubReady(true);
        }
        if (player === "dub") {
            console.log("dub");
            setDubReady(true);
        }
    };

    let subPlayerVisibility;
    let dubPlayerVisibility;
    let usFlagOpacity;
    let jpFlagOpacity;
    if (activePlayer === dubPlayer) {
        dubPlayerVisibility = "visible";
        subPlayerVisibility = "hidden";
        usFlagOpacity = "50%";
        jpFlagOpacity = "100%";
    } else if (activePlayer === subPlayer) {
        subPlayerVisibility = "visible";
        dubPlayerVisibility = "hidden";
        jpFlagOpacity = "50%";
        usFlagOpacity = "100%";
    }

    let muteButton = (
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
    );

    let volumeSlider = (
        <input
            type="range"
            min="0"
            max="100"
            id="stream-volume-slider"
            onInput={(e) => onVolumeSliderChange(e)}
        />
    );

    let fullscreenButton = (
        <span
            className="fullscreen-icon-wrapper control-icon"
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
    );

    let fullScreenControls = (
        <div className="fullscreen-controls">
            {" "}
            <Segment inverted className="controls">
                {muteButton}
                {volumeSlider}
                {fullscreenButton}{" "}
            </Segment>{" "}
        </div>
    );

    const onFileClick = (file, index) => {
        storage.videoQuality = index;
        window.location.reload();
    };

    let playerTitle;
    if (episodeInfo) {
        playerTitle = episodeInfo;
    } else {
        playerTitle = <></>;
    }

    if (apiError) {
        return (
            <p className="api-error-message">
                Sensu Streams is currently down. Please come back later
            </p>
        );
    } else if (isVideoLoading) {
        console.log("Video is loading");
        return <WaitingForPlayer />;
    } else {
        return (
            <div className="livestream-player">
                <div className="overlay">
                    <h2>
                        {" "}
                        Please Wait {secondsTillNextVideo} Seconds For the Next
                        Video
                    </h2>
                </div>

                <p className="episode-title">{playerTitle}</p>

                <div className="dub-player-wrapper ">
                    <ReactPlayer
                        ref={dubPlayer}
                        url={dubVideoLink}
                        muted={dubMuted}
                        playing={true}
                        volume={volume}
                        width={playerWidth}
                        height={playerHeight}
                        onBuffer={() => setIsDubBuffering(true)}
                        onBufferEnd={() => setIsDubBuffering(false)}
                        onProgress={(progress) =>
                            onVideoProgress(progress, "en")
                        }
                        className="player"
                        onEnded={() => onVideoEnd("en", dubPlayer)}
                        onReady={() => handleOnPlayerReady("dub")}
                        config={{
                            file: {
                                attributes: {
                                    preload: "",
                                },
                            },
                        }}
                    />
                    {fullScreenControls}
                </div>

                <div className="sub-player-wrapper ">
                    <ReactPlayer
                        ref={subPlayer}
                        url={subVideoLink}
                        muted={subMuted}
                        playing={true}
                        volume={volume}
                        width={playerWidth}
                        height={playerHeight}
                        onBuffer={() => setIsSubBuffering(true)}
                        onBufferEnd={() => setIsSubBuffering(false)}
                        onProgress={(progress) =>
                            onVideoProgress(progress, "jp")
                        }
                        className="player"
                        onEnded={() => onVideoEnd("jp", subPlayer)}
                        onReady={() => handleOnPlayerReady("sub")}
                        config={{
                            file: {
                                attributes: {
                                    preload: "",
                                },
                            },
                        }}
                    />
                    {fullScreenControls}
                </div>

                <Progress
                    attached="top"
                    percent={progressPercent}
                    inverted
                    className="progress-bar"
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
                                position="bottom right"
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
                        <QualitySelector
                            dubFiles={dubFiles}
                            subFiles={subFiles}
                            selector={setVideoQuality}
                        />
                        {muteButton}

                        {volumeSlider}

                        <span
                            className="theater-mode-icon-wrapper control-icon"
                            onClick={() => onTheaterModeClick()}
                        >
                            <Popup
                                trigger={<i className="expand icon" />}
                                inverted
                                basic
                                position="bottom center"
                                size="mini"
                                content="Theater mode"
                            />
                        </span>
                        {fullscreenButton}
                    </Segment>
                </div>

                <p className="video-error-refresh-text">
                    Problems playing the video? Click{" "}
                    <span
                        onClick={() => window.location.reload()}
                        className="refresh"
                    >
                        here
                    </span>{" "}
                    to refresh, or try a different source.
                </p>

                <style jsx>
                    {`
                        .sub-player-wrapper {
                            visibility: ${subPlayerVisibility};
                            max-height: 100%;
                        }
                        .dub-player-wrapper {
                            visibility: ${dubPlayerVisibility};
                            max-height: 0;
                        }
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
                        .overlay {
                            width: ${playerWidth};
                            display: ${overlayVisibilty};
                        }

                        .fullscreen-controls {
                            display: ${fullscreenControlsVisibility};
                        }

                        .video-file-segment {
                            display: ${videoFileSegmentDisplay};
                        }
                        .player {
                            opacity: ${playerOpacity};
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default LivestreamPlayer;
