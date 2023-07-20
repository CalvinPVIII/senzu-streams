import { Tooltip } from "@chakra-ui/react";
import "../../css/ProgressBar.css";
import { useState } from "react";

interface ProgressBarProps {
  currentPlayerTimePercent: number;
  handleSeek: (value: number) => void;
  getDuration: () => number;
  playerType: "vod" | "stream";
  currentPlayerTime: number;
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

  const onHover = (e: React.MouseEvent<HTMLInputElement>) => {
    if (props.playerType === "vod") {
      const target = e.target as HTMLInputElement;
      const hoverTime = (((e.clientX - target.offsetLeft) / target.clientWidth) * 100).toFixed(2);
      const duration = (props.getDuration() * parseInt(hoverTime)) / 100;
      setHoverValue(duration);
      setToolTipValue(formatTime(duration));
      console.log(formatTime(duration));
    } else if (props.playerType === "stream") {
      setToolTipValue(formatTime(props.currentPlayerTime));
    }
  };

  const handleChange = (e: any) => {
    if (props.playerType === "vod") {
      props.handleSeek((props.getDuration() * parseInt(e.target.value)) / 100);
    }
  };

  return (
    <div id="player-progress-slider">
      {/* <Tooltip label={toolTipValue} color="#92c407" bg="black">
        <input
          className={props.playerType === "vod" ? "hoverable" : ""}
          type="range"
          value={props.currentPlayerTimePercent}
          max="100"
          min="0"
          onMouseMove={onHover}
          onInput={handleChange}
          id="video-progress-input"
        />
      </Tooltip> */}
      <div id="progress-background">
        <div id="progress-filled" style={{ width: `${props.currentPlayerTimePercent}%` }}>
          <input
            className={props.playerType === "vod" ? "hoverable" : ""}
            type="range"
            value={props.currentPlayerTimePercent}
            max="100"
            min="0"
            step="0.1"
            onMouseMove={onHover}
            onInput={handleChange}
            id="video-progress-input"
          />
        </div>
      </div>
    </div>
  );
}
