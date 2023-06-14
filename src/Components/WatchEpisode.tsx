import { useParams } from "react-router-dom";
import SeriesEpisodes from "./SeriesEpisodes";
import allSeries from "../ts/allSeries";
import Player from "./VideoPlayer/Player";
import "../css/WatchEpisode.css";
import SERIES from "../ts/seriesEnum";
import { useEffect, useState } from "react";

import { episode } from "../../types";

export default function WatchEpisode() {
  const [episodeInfo, setEpisodeInfo] = useState<episode>();
  const { series, episode } = useParams();

  useEffect(() => {
    if (series && episode) {
      fetch(`${import.meta.env.VITE_API_URL}/episodes/${SERIES[series]}/${episode}`).then((response) =>
        response.json().then((result) => {
          console.log(result);
          setEpisodeInfo(result);
        })
      );
    }
  }, [episode]);

  if (series && episode && episodeInfo) {
    const foundSeries = allSeries[series];
    return (
      <div>
        <div id="watch-player-wrapper">
          <Player playing={true} files={episodeInfo} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
          <SeriesEpisodes numberOfEpisodes={foundSeries.episodes} seriesName={foundSeries.shortName} />
        </div>
      </div>
    );
  }
}
