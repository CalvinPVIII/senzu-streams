import Player from "./VideoPlayer/Player";
import "../css/Livestream.css";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
export default function LiveStream() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);

  const [streamFiles, setStreamFiles] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/stream`)
      .then((response) =>
        response
          .json()
          .then((result) => {
            console.log(result);
            setStreamFiles(result.currentFiles);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
          })
      )
      .catch(() => {
        setError(true);
      });
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

  // when the current episode is 4:3, min-width should be 55vw, if its 16:9 it should be 75
  if (!error && !loading && streamFiles) {
    return (
      <div id="livestream-wrapper">
        <div className="livestream-player">
          <Player playing={true} files={streamFiles} onStreamStart={syncToStream} playerType="stream" />
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
  }
}
