import "../../css/PlayerControls.css";
import { BsFillPlayFill, BsPauseFill, BsVolumeMuteFill, BsVolumeUpFill, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Popover, PopoverContent } from "@chakra-ui/react";

interface PlayerControlsProps {
  width?: number;
}

export default function PlayerControls(props: PlayerControlsProps) {
  const styles = {
    // width: `${props.width}%`,
  };
  return (
    <div id="player-controls-wrapper" style={styles}>
      <div id="player-controls">
        <div id="play-pause-buttons">
          <BsFillPlayFill />
        </div>
        <div id="volume-controls">
          <BsVolumeMuteFill /> ------ <BsVolumeUpFill />
        </div>
      </div>
    </div>
  );
}
