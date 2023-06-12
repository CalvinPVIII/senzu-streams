import Player from "./Player";
import "../../css/Livestream.css";
export default function LiveStream() {
  // when the current episode is 4:3, min-width should be 55vw, if its 16:9 it should be 75
  return (
    <div id="livestream-wrapper">
      <div id="livestream-player">
        <Player
          seriesName="Dragon Ball Super"
          episodeNumber="1"
          url={
            "https://monkey-d-luffy.site/v1/files?resolution=default&id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbmltZV9pZCI6Ik9Ua3dORFk9IiwidGltZXN0YW1wIjoxNjQ0MDEzNTUyMDYxLCJpcCI6IjI2MDE6MWMwOjY5MDA6MjhkMDphYzA4OjEzMTc6NTk5OTo0NTk4IiwiaWF0IjoxNjQ0MDEzNTUyfQ.xZIcFOb2mCoPC86t-_scOHpf5qrXXkBNe2hqWfgqQGM"
          }
          playing={true}
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
}
