import "../../css/PlayerControls.css";

interface PlayerControlsProps {
  width?: number;
}

export default function PlayerControls(props: PlayerControlsProps) {
  const styles = {
    // width: `${props.width}%`,
  };
  return <div id="player-controls-wrapper" style={styles}></div>;
}
