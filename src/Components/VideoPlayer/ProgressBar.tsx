import { Tooltip } from "@chakra-ui/react";
import "../../css/ProgressBar.css";
import { useState, useEffect } from "react";

interface ProgressBarProps {
  currentPlayerTimePercent: number;
  handleSeek: (value: number) => void;
  getDuration: () => number;
  playerType: "vod" | "stream";
  currentPlayerTime: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const [toolTipValue, setToolTipValue] = useState<string>("0:00:00");

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

  useEffect(() => {
    setToolTipValue(formatTime(props.currentPlayerTime));
  }, [props.currentPlayerTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.playerType === "vod") {
      props.handleSeek((props.getDuration() * parseInt(e.target.value)) / 100);
    }
  };

  return (
    <div id="player-progress-slider">
      <Tooltip label={toolTipValue} color="#92c407" bg="black">
        <div id="progress-background">
          <div id="progress-filled" style={{ width: `${props.currentPlayerTimePercent}%` }}>
            <input
              className={props.playerType === "vod" ? "hoverable" : ""}
              type="range"
              value={props.currentPlayerTimePercent}
              max="100"
              min="0"
              step="0.01"
              onInput={handleChange}
              id="video-progress-input"
            />
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
