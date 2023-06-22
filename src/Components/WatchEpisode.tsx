import { useParams } from "react-router-dom";
import SeriesEpisodes from "./SeriesEpisodes";
import allSeries from "../ts/allSeries";
import Player from "./VideoPlayer/Player";
import "../css/WatchEpisode.css";
import SERIES from "../ts/seriesEnum";
import { useEffect, useState } from "react";

import { StructuredFileInfo } from "../../types";

export default function WatchEpisode() {
  const [episodeInfo, setEpisodeInfo] = useState<StructuredFileInfo>();
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onLoadCallback, setOnLoadCallback] = useState();
  const { series, episode } = useParams();

  useEffect(() => {
    if (series && episode) {
      fetch(`${import.meta.env.VITE_API_URL}/episodes/${SERIES[series]}/${episode}`)
        .then((response) =>
          response
            .json()
            .then((result) => {
              setEpisodeInfo(result);
              setLoading(false);
            })
            .catch(() => {
              setFetchError(true);
            })
        )
        .catch(() => {
          setFetchError(true);
        });
    }
  }, [episode, series]);
  // WIP
  const setVideoToPrevTime = (player: any, language: "dub" | "sub") => {
    if (series && episode) {
      const vodEpisode = localStorage.getItem("vodEpisodeInfo");
      if (vodEpisode === series + episode) {
        const playerTime = localStorage.getItem(`${language}Time`);
        if (playerTime) {
          player.current.seekTo(parseInt(playerTime));
        }
      } else {
        localStorage.setItem("vodEpisodeInfo", series + episode);
      }
    }
  };

  if (series && episode && episodeInfo) {
    const foundSeries = allSeries[series];
    return (
      <div>
        <div id="watch-player-wrapper">
          <Player playing={true} files={episodeInfo} onStart={setVideoToPrevTime} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
          <SeriesEpisodes numberOfEpisodes={foundSeries.episodes} seriesName={foundSeries.shortName} />
        </div>
      </div>
    );
  } else if (fetchError) {
    return (
      <>
        <h3>There was an error getting this episode</h3>
      </>
    );
  } else if (loading) {
    return (
      <>
        <h3>Loading</h3>
      </>
    );
  }
}
