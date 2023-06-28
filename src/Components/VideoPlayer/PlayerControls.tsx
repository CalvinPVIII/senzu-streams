import "../../css/PlayerControls.css";
import { file } from "../../../types";
import PlayPauseButton from "./PlayerControlButtons/PlayPauseButton";
import LanguageControlButton from "./PlayerControlButtons/LanguageControlButton";
import VolumeControl from "./PlayerControlButtons/VolumeControl";
import PlayerFileSettings from "./PlayerControlButtons/PlayerFileSettings";
import FullScreenButton from "./PlayerControlButtons/FullScreenButton";
import { EpisodeNavigationButton } from "./PlayerControlButtons/EpisodeNavigationButton";

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
  return (
    <div id="player-controls-wrapper">
      <div id="player-controls">
        {props.controlsType === "stream" ? <></> : <EpisodeNavigationButton type="prev" />}

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

        <FullScreenButton />

        {props.controlsType === "stream" ? <></> : <EpisodeNavigationButton type="next" />}
      </div>
    </div>
  );
}
