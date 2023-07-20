import "../../css/PlayerControls.css";
import { file } from "../../../types";
import PlayPauseButton from "./PlayerControlButtons/PlayPauseButton";
import LanguageControlButton from "./PlayerControlButtons/LanguageControlButton";
import VolumeControl from "./PlayerControlButtons/VolumeControl";
import PlayerFileSettings from "./PlayerControlButtons/PlayerFileSettings";
import TheaterModeButton from "./PlayerControlButtons/TheaterModeButton";
import { EpisodeNavigationButton } from "./PlayerControlButtons/EpisodeNavigationButton";
import FullScreenButton from "./PlayerControlButtons/FullScreenButton";

interface PlayerControlsProps {
  handlePlayerVolume: React.Dispatch<React.SetStateAction<number>>;
  handlePlayerPlaying: () => void;
  playerPlaying: boolean;
  currentPlayerLanguage: "english" | "japanese";
  handlePlayerCurrentLanguage: (language: "english" | "japanese") => void;
  videoFiles: { [key: string]: file[] };
  currentSource: string;
  currentQuality: string;
  changeVideoFiles: (file: file, sourceName: string) => void;
  controlsType: "vod" | "stream";
  handleFullScreen: () => void;
  syncToStream?: (() => void) | null;
}

export default function PlayerControls(props: PlayerControlsProps) {
  const handleLiveClick = () => {
    if (props.syncToStream) {
      props.syncToStream();
    }
  };

  return (
    <div id="player-controls-wrapper">
      <div id="player-controls">
        {props.controlsType === "stream" ? (
          <p className="hoverable" onClick={handleLiveClick}>
            LIVE
          </p>
        ) : (
          <EpisodeNavigationButton type="prev" />
        )}

        <PlayPauseButton playerPlaying={props.playerPlaying} handlePlayerPlaying={props.handlePlayerPlaying} />

        <LanguageControlButton
          currentPlayerLanguage={props.currentPlayerLanguage}
          handlePlayerCurrentLanguage={props.handlePlayerCurrentLanguage}
          currentSource={props.currentSource}
        />

        <VolumeControl handlePlayerVolume={props.handlePlayerVolume} />

        <PlayerFileSettings
          currentSource={props.currentSource}
          changeVideoFiles={props.changeVideoFiles}
          videoFiles={props.videoFiles}
          currentQuality={props.currentQuality}
        />

        <FullScreenButton handleFullScreen={props.handleFullScreen} />

        {/* <TheaterModeButton
          setMaxWidth={props.setMaxWidth}
          maxWidth={props.maxWidth}
          theaterModeMaxWidth={props.theaterModeMaxWidth}
          currentMaxWidth={props.currentMaxWidth}
        /> */}

        {props.controlsType === "stream" ? <></> : <EpisodeNavigationButton type="next" />}
      </div>
    </div>
  );
}
