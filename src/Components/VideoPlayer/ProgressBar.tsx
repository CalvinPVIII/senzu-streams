import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import "../../css/Slider.css";

interface ProgressBarProps {
  currentPlayerTime: number;
  handleSeek: (time: number) => void;
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <div id="player-progress-slider">
      <Slider minW="100px" value={props.currentPlayerTime} onChangeEnd={props.handleSeek} max={100} min={0}>
        <SliderTrack bg="green.100">
          <SliderFilledTrack bg="green.300" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </div>
  );
}
