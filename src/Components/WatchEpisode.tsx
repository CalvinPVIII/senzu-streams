import { useParams } from "react-router-dom";
import SeriesEpisodes from "./SeriesEpisodes";
import allSeries from "../ts/allSeries";
import Player from "./VideoPlayer/Player";
import "../css/WatchEpisode.css";
export default function WatchEpisode() {
  const { series, episode } = useParams();

  if (series && episode) {
    const foundSeries = allSeries[series];
    return (
      <div>
        <div id="watch-player-wrapper">
          <Player
            seriesName={foundSeries.name}
            episodeNumber={episode}
            playing={true}
            url={
              "https://workfields.backup-server222.lol/7d2473746a243c24296b63626f673029706f62636975294d6f6e60307e346f4c7f4b6732657455622975736429343532242a2475727463676b63744f62243c245f69737273646347686f6b63247b"
            }
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
          <SeriesEpisodes numberOfEpisodes={foundSeries.episodes} seriesName={foundSeries.shortName} />
        </div>
      </div>
    );
  }
}
