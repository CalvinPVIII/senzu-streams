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
import { useState, Fragment } from "react";
import { file } from "../../../types";

interface PlayerControlsProps {
  handlePlayerVolume: React.Dispatch<React.SetStateAction<number>>;
  handlePlayerPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerPlaying: boolean;
  currentPlayerLanguage: "english" | "japanese";
  handlePlayerCurrentLanguage: (language: "english" | "japanese", updateSourceCallback: React.Dispatch<React.SetStateAction<string>>) => void;
  videoFiles: { [key: string]: file[] };
  currentSource: string;
  currentQuality: string;
  changeVideoFiles: (file: file, sourceName: string) => void;
  controlsType: "vod" | "stream";
}

export default function PlayerControls(props: PlayerControlsProps) {
  const [playing, setPlaying] = useState(props.playerPlaying);
  const [muted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [language, setLanguage] = useState<"english" | "japanese">(props.currentPlayerLanguage);
  const [currentFocusedSource, setCurrentFocusedSource] = useState(props.currentSource);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      props.handlePlayerCurrentLanguage("japanese", setCurrentFocusedSource);
    } else if (language === "japanese") {
      setLanguage("english");
      props.handlePlayerCurrentLanguage("english", setCurrentFocusedSource);
    }
  };

  const handleChangeVideoFile = (sourceName: string, source: file) => {
    props.changeVideoFiles(source, sourceName);
  };

  const handleFullscreen = () => {
    const currentPlayerId = language === "english" ? "dub-player" : "sub-player";
    if (!document.fullscreenElement) {
      document.getElementById("players")?.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(true);
    }
  };

  return (
    <div id="player-controls-wrapper">
      <div id="player-controls">
        {props.controlsType === "stream" ? (
          <></>
        ) : (
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
        )}

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
                  <Fragment key={sourceName}>
                    {sourceName === currentFocusedSource ? (
                      <p>{sourceName}</p>
                    ) : (
                      <p onClick={() => setCurrentFocusedSource(sourceName)} style={{ opacity: "0.5" }}>
                        {sourceName}
                      </p>
                    )}
                  </Fragment>
                ))}
              </PopoverHeader>
              <PopoverBody fontSize={"small"}>
                {props.videoFiles[currentFocusedSource].map((source, index) => (
                  <Fragment key={index}>
                    {currentFocusedSource === props.currentSource && source.label === props.currentQuality ? (
                      <p style={{ fontWeight: "bold" }} onClick={() => handleChangeVideoFile(currentFocusedSource, source)}>
                        •{source.label} {source.type}
                      </p>
                    ) : (
                      <p onClick={() => handleChangeVideoFile(currentFocusedSource, source)}>
                        {source.label} {source.type}
                      </p>
                    )}
                  </Fragment>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>

        <div id="fullscreen" className="clickable">
          <Popover trigger="hover" placement="bottom">
            <PopoverTrigger>
              <IconButton
                size="s"
                variant="ghost"
                colorScheme="white"
                icon={<BsArrowsFullscreen />}
                aria-label={"Full Screen"}
                onClick={handleFullscreen}
              />
            </PopoverTrigger>
            <PopoverContent maxW="60px" color="white" borderColor="black" backgroundColor="black">
              <PopoverBody fontSize={"10px"}>
                <span>Full screen</span>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>

        {props.controlsType === "stream" ? (
          <></>
        ) : (
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
        )}
      </div>
    </div>
  );
}
