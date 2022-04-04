import React, { useState, useEffect } from "react";
import LivestreamPlayer from "./LivestreamPlayer";
import "../styles/Livestream.css";

function Livestream(props) {
    const [sourceErrorMessage, setSourceErrorMessage] = useState("");
    const theaterModeOption = {
        NORMAL: "75%",
        EXPANDED: "100%",
    };
    const [livestreamPlayerWidth, setLivestreamPlayerWidth] = useState(
        theaterModeOption.NORMAL
    );

    const onTheaterModeClick = () => {
        if (livestreamPlayerWidth === theaterModeOption.NORMAL) {
            setLivestreamPlayerWidth(theaterModeOption.EXPANDED);

            document
                .getElementsByClassName("livestream-player-wrapper")[0]
                .classList.add("theater-expanded");
            document
                .getElementsByClassName("livestream-player-wrapper")[0]
                .classList.remove("theater-normal");
        }

        if (livestreamPlayerWidth === theaterModeOption.EXPANDED) {
            setLivestreamPlayerWidth(theaterModeOption.NORMAL);

            document
                .getElementsByClassName("livestream-player-wrapper")[0]
                .classList.add("theater-normal");
            document
                .getElementsByClassName("livestream-player-wrapper")[0]
                .classList.remove("theater-expanded");
        }
    };
    return (
        <>
            <div className="livestream-player-wrapper">
                <LivestreamPlayer
                    onTheaterModeClick={onTheaterModeClick}
                    setSourceErrorMessage={setSourceErrorMessage}
                    fetchLink={`${process.env.REACT_APP_API_CALL}/streaminfo`}
                />

                <p className="source-error-message">{sourceErrorMessage}</p>
            </div>
            <iframe
                src={`https://www.twitch.tv/embed/senzustreams/chat?parent=${process.env.REACT_APP_TWITCH_CHAT_PARENT}&darkpopout`}
                title="chat"
                className="chat"
            ></iframe>

            <style jsx>
                {`
                    .livestream-player-wrapper {
                        width: ${livestreamPlayerWidth};
                    }
                    @keyframes theaterExpand {
                        0% {
                            width: ${theaterModeOption.NORMAL};
                        }
                        100% {
                            width: ${theaterModeOption.EXPANDED};
                        }
                    }

                    @keyframes theaterShrink {
                        from {
                            width: ${theaterModeOption.EXPANDED};
                        }
                        to {
                            width: ${theaterModeOption.NORMAL};
                        }
                    }

                    .theater-expanded {
                        animation: theaterExpand 1s;
                    }

                    .theater-normal {
                        animation: theaterShrink 1s;
                    }
                `}
            </style>
        </>
    );
}

export default Livestream;
