import Player from "./VideoPlayer/Player";
import "../css/Livestream.css";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Loading from "./Loading";
export default function LiveStream() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  const [noStream, setNoStream] = useState(false);

  const [streamFiles, setStreamFiles] = useState();

  const fetchStreamInfo = () => {
    setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}/stream`)
        .then((response) =>
          response
            .json()
            .then((result) => {
              if (result.isActive) {
                setStreamFiles(result.currentFiles);
              } else if (!result.isActive) {
                setNoStream(true);
              }
              setLoading(false);
            })
            .catch(() => {
              setError(true);
              setLoading(false);
            })
        )
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }, 2000);
  };

  useEffect(() => {
    fetchStreamInfo();
  }, []);

  const syncToStream = (dubPlayer: React.RefObject<ReactPlayer>, subPlayer: React.RefObject<ReactPlayer>) => {
    fetch(`${import.meta.env.VITE_API_URL}/stream`).then((response) =>
      response.json().then((result) => {
        if (dubPlayer.current && subPlayer.current) {
          dubPlayer.current.seekTo(result.currentTime);
          subPlayer.current.seekTo(result.currentTime);
        }
      })
    );
  };
  const episodeFinishedMessage = {
    dub: "The English episode has finished. Please wait for the Japanese Episode",
    sub: "The Japanese episode has finished. Please wait for the English episode",
  };
  // when the current episode is 4:3, min-width should be 55vw, if its 16:9 it should be 75
  if (!error && !loading && streamFiles) {
    return (
      <div id="livestream-wrapper">
        <div className="livestream-player">
          <Player
            playing={true}
            files={streamFiles}
            onStreamStart={syncToStream}
            playerType="stream"
            onEnded={fetchStreamInfo}
            episodeFinishedMessage={episodeFinishedMessage}
            maxWidth={1000}
            theaterModeMaxWidth={1300}
          />
        </div>
        <div id="livestream-chat">
          <iframe
            src={`https://www.twitch.tv/embed/senzustreams/chat?parent=${import.meta.env.VITE_TWITCH_CHAT_PARENT}&darkpopout`}
            title="chat"
            className="chat"
          ></iframe>
        </div>
      </div>
    );
  } else if (noStream) {
    return <h1 style={{ textAlign: "center" }}>There currently is no livestream</h1>;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    return <h1 style={{ textAlign: "center" }}>Senzu Streams is currently down. Please check back later</h1>;
  }
}
