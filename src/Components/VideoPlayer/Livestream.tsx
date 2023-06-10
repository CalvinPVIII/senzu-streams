import Player from "./Player";
import "../../css/Livestream.css";
export default function LiveStream() {
  const playerStyles = {
    // this value should be dynamic so theater mode can change the width
    maxWidth: "55%",
  };
  return (
    <div id="livestream-wrapper">
      <div id="livestream-player" style={playerStyles}>
        <Player
          url={
            "https://monkey-d-luffy.site/v1/files?resolution=default&id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbmltZV9pZCI6Ik9UY3pOVEU9IiwidGltZXN0YW1wIjoxNjQ0MDExNTY0MTMwLCJpcCI6IjI2MDE6MWMwOjY5MDA6MjhkMDphYzA4OjEzMTc6NTk5OTo0NTk4IiwiaWF0IjoxNjQ0MDExNTY0fQ.V1N7azfxgtIkbk98_d8RLSSDA_aP4VnV3BX1DXTzL4w"
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
