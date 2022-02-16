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
        <div className="livestream-wrapper">
            <div className="livestream-player-wrapper">
                <LivestreamPlayer
                    onTheaterModeClick={onTheaterModeClick}
                    setSourceErrorMessage={setSourceErrorMessage}
                    fetchLink={"http://localhost:3001/streaminfo"}
                />

                <p className="source-error-message">{sourceErrorMessage}</p>
            </div>

            <div className="chat-wrapper">
                <iframe
                    title="chat"
                    className="chat"
                    src="https://www.twitch.tv/embed/sensustreams/chat?parent=localhost"
                ></iframe>
            </div>
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
        </div>
    );
}

export default Livestream;
