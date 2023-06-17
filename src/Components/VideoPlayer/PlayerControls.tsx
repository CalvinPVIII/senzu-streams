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
import { LuSettings } from "react-icons/lu";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, PopoverTrigger, PopoverCloseButton, PopoverHeader } from "@chakra-ui/react";
import { Popover, PopoverContent, PopoverBody, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { file } from "../../../types";

interface PlayerControlsProps {
  handlePlayerVolume: React.Dispatch<React.SetStateAction<number>>;
  handlePlayerPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerPlaying: boolean;
  currentPlayerLanguage: "english" | "japanese";
  handlePlayerCurrentLanguage: React.Dispatch<React.SetStateAction<"english" | "japanese">>;
  videoFiles: { [key: string]: file[] };
  currentSource: string;
  currentQuality: string;
  changeVideoFiles: (file: file, sourceName: string) => void;
}

export default function PlayerControls(props: PlayerControlsProps) {
  const [playing, setPlaying] = useState(props.playerPlaying);
  const [muted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [language, setLanguage] = useState<"english" | "japanese">(props.currentPlayerLanguage);
  const [activeSource, setActiveSource] = useState(props.currentSource);
  const [currentFocusedSource, setCurrentFocusedSource] = useState(props.currentSource);

  const handlePlaying = () => {
    setPlaying(!playing);
    props.handlePlayerPlaying(!playing);
  };
  const handleMuted = () => {
    setVolume(0);
    props.handlePlayerVolume(0);
  };

  const handleVolumeSlide = (value: number) => {
    setVolume(value);
    props.handlePlayerVolume(0.01 * value);
  };

  const handleChangeLanguage = () => {
    if (language === "english") {
      setLanguage("japanese");
    } else if (language === "japanese") {
      setLanguage("english");
    }
  };

  const handleChangeVideoFile = (sourceName: string, source: file) => {
    setActiveSource(sourceName);
    props.changeVideoFiles(source, sourceName);
  };

  return (
    <div id="player-controls-wrapper">
      <div id="player-controls">
        <div id="prev-episode" className="controls-sections clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<BsArrowLeft />} aria-label={"Previous Episode"} />
            </PopoverTrigger>
            <PopoverContent maxW="75px" color="white" borderColor="black" backgroundColor="black">
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
                icon={playing ? <BsPauseFill onClick={handlePlaying} size="20" /> : <BsFillPlayFill onClick={handlePlaying} size="20" />}
                aria-label={"Play"}
              />
            </PopoverTrigger>
            <PopoverContent maxW="75px" color="white" borderColor="black" backgroundColor="black">
              {playing ? <PopoverBody fontSize={"12px"}>Pause</PopoverBody> : <PopoverBody fontSize={"12px"}>Play</PopoverBody>}
            </PopoverContent>
          </Popover>
        </div>

        <div id="language-control-buttons" className="clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              {language === "japanese" ? (
                <span style={{ opacity: "0.5" }} onClick={handleChangeLanguage}>
                  <span className="fi fi-us"></span>
                </span>
              ) : (
                <span>
                  <span className="fi fi-us"></span>
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent maxW="90px" color="white" borderColor="black" backgroundColor="black">
              <PopoverBody fontSize={"10px"}>Set language to English</PopoverBody>
            </PopoverContent>
          </Popover>
          <span id="language-separator">/</span>
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              {language === "english" ? (
                <span style={{ opacity: "0.5" }} onClick={handleChangeLanguage}>
                  <span className="fi fi-jp"></span>
                </span>
              ) : (
                <span>
                  <span className="fi fi-jp"></span>
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent maxW="90px" color="white" borderColor="black" backgroundColor="black">
              <PopoverBody fontSize={"10px"}>Set language to Japanese</PopoverBody>
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
              <PopoverContent maxW="60px" color="white" borderColor="black" backgroundColor="black">
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

        <div id="settings" className="clickable">
          <Popover trigger="click" placement="top">
            <PopoverTrigger>
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<LuSettings />} aria-label={"Settings"} />
            </PopoverTrigger>
            <PopoverContent color="white" borderColor="black" backgroundColor="black" maxW="80%">
              <PopoverCloseButton />
              <PopoverHeader textAlign="center">Settings</PopoverHeader>
              <PopoverHeader display={"flex"} justifyContent={"space-around"} backgroundColor={"#1b1c1d"} fontSize={"small"}>
                {Object.keys(props.videoFiles).map((sourceName) => (
                  <>
                    {sourceName === currentFocusedSource ? (
                      <p key={sourceName}>{sourceName}</p>
                    ) : (
                      <p key={sourceName} onClick={() => setCurrentFocusedSource(sourceName)} style={{ opacity: "0.5" }}>
                        {sourceName}
                      </p>
                    )}
                  </>
                ))}
              </PopoverHeader>
              <PopoverBody fontSize={"small"}>
                {props.videoFiles[currentFocusedSource].map((source) => (
                  <>
                    {activeSource === currentFocusedSource && source.label === props.currentQuality ? (
                      <p style={{ fontWeight: "bold" }}>
                        •{source.label} {source.type}
                      </p>
                    ) : (
                      <p onClick={() => handleChangeVideoFile(currentFocusedSource, source)}>
                        {source.label} {source.type}
                      </p>
                    )}
                  </>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>

        <div id="next-episode" className="clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<BsArrowsFullscreen />} aria-label={"Full Screen"} />
            </PopoverTrigger>
            <PopoverContent maxW="60px" color="white" borderColor="black" backgroundColor="black">
              <PopoverBody fontSize={"10px"}>
                <span>Full screen</span>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>

        <div id="next-episode" className="clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton size="s" variant="ghost" colorScheme="white" icon={<BsArrowRight />} aria-label={"Next Episode"} />
            </PopoverTrigger>
            <PopoverContent maxW="75px" color="white" borderColor="black" backgroundColor="black">
              <PopoverBody fontSize={"10px"}>
                <span>Next Episode</span>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
