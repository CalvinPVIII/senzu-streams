import "../../css/PlayerControls.css";
import {
  BsFillPlayFill,
  BsPauseFill,
  BsVolumeMuteFill,
  BsVolumeUpFill,
  BsArrowLeft,
  BsArrowRight,
  BsArrowsFullscreen,
  BsVolumeOffFill,
} from "react-icons/bs";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, PopoverTrigger } from "@chakra-ui/react";
import { Popover, PopoverContent, PopoverBody, IconButton } from "@chakra-ui/react";
import { useState } from "react";

interface PlayerControlsProps {
  width?: number;
}

export default function PlayerControls(props: PlayerControlsProps) {
  const [paused, setPaused] = useState(false);
  const [muted] = useState(false);
  const [volume, setVolume] = useState(0);

  const handlePause = () => {
    setPaused(!paused);
  };
  const handleMuted = () => {
    setVolume(0);
  };

  const handleVolumeSlide = (value: number) => {
    setVolume(value);
  };

  return (
    <div id="player-controls-wrapper">
      <div id="player-controls">
        <div id="prev-episode" className="controls-sections clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<BsArrowLeft />} aria-label={"Previous Episode"} />
            </PopoverTrigger>
            <PopoverContent maxW="75px">
              <PopoverBody fontSize={"10px"}>
                <span>Previous Episode</span>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>

        <div id="play-pause-buttons" className="clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton
                size="s"
                variant="ghost"
                colorScheme="white"
                icon={paused ? <BsFillPlayFill onClick={handlePause} size="20" /> : <BsPauseFill onClick={handlePause} size="20" />}
                aria-label={"Play"}
              />
            </PopoverTrigger>
            <PopoverContent maxW="75px">
              {paused ? <PopoverBody fontSize={"12px"}>Play</PopoverBody> : <PopoverBody fontSize={"12px"}>Pause</PopoverBody>}
            </PopoverContent>
          </Popover>
        </div>

        <div id="volume-controls" className="controls-sections">
          <span className="clickable">
            <Popover trigger="hover" placement="bottom">
              <PopoverTrigger>
                <div className="speaker-icon">
                  <IconButton
                    size="s"
                    variant="ghost"
                    colorScheme="white"
                    icon={muted || volume === 0 ? <BsVolumeMuteFill size="20" /> : <BsVolumeOffFill onClick={handleMuted} size="20" />}
                    aria-label={"Mute"}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent maxW="60px">
                <PopoverBody fontSize={"12px"}>Mute</PopoverBody>
              </PopoverContent>
            </Popover>
          </span>

          <Slider minW="100px" value={volume} colorScheme="green" onChange={handleVolumeSlide}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <span className="clickable">
            <div className="speaker-icon">
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<BsVolumeUpFill size="20" />} aria-label={"Volume Up"} />
            </div>
          </span>
        </div>

        <div id="next-episode" className="clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<BsArrowRight />} aria-label={"Next Episode"} />
            </PopoverTrigger>
            <PopoverContent maxW="75px">
              <PopoverBody fontSize={"10px"}>
                <span>Next Episode</span>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>

        <div id="next-episode" className="clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<BsArrowsFullscreen />} aria-label={"Full Screen"} />
            </PopoverTrigger>
            <PopoverContent maxW="75px">
              <PopoverBody fontSize={"10px"}>
                <span>Full screen</span>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
