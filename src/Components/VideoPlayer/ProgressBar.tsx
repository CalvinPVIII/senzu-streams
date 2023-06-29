import { Tooltip } from "@chakra-ui/react";
import "../../css/ProgressBar.css";
import { useState } from "react";

interface ProgressBarProps {
  currentPlayerTime: number;
  handleSeek: (value: number) => void;
  getDuration: () => number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const [toolTipValue, setToolTipValue] = useState<string>("0:00:00");

  const [hoverValue, setHoverValue] = useState(0);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");

    return hours + ":" + minutes + ":" + seconds;
  };

  const onHover = (e: any) => {
    const hoverTime = (((e.clientX - e.target.offsetLeft) / e.target.clientWidth) * 100).toFixed(2);
    const duration = (props.getDuration() * parseInt(hoverTime)) / 100;
    setHoverValue(duration);
    setToolTipValue(formatTime(duration));
  };

  const handleChange = () => {
    props.handleSeek(hoverValue);
  };

  return (
    <div id="player-progress-slider">
      <Tooltip label={toolTipValue} bg="#92c407">
        <input
          type="range"
          value={props.currentPlayerTime}
          max="100"
          min="0"
          onMouseMove={onHover}
          onInput={handleChange}
          id="video-progress-input"
        />
      </Tooltip>
    </div>
  );
}
