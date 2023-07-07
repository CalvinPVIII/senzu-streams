import { useParams } from "react-router-dom";
import SeriesEpisodes from "./SeriesEpisodes";
import allSeries from "../ts/allSeries";
import Player from "./VideoPlayer/Player";
import "../css/WatchEpisode.css";
import SERIES from "../ts/seriesEnum";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Loading from "./Loading";

import { StructuredFileInfo } from "../../types";

export default function WatchEpisode() {
  const [episodeInfo, setEpisodeInfo] = useState<StructuredFileInfo>();
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

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
              setLoading(false);
            })
        )
        .catch(() => {
          setFetchError(true);
          setLoading(false);
        });
    }
  }, [episode, series]);

  console.log(episodeInfo);

  const setVideoToPrevTime = (language: "dub" | "sub", player: React.RefObject<ReactPlayer>, syncCallback: (syncFrom: "dub" | "sub") => void) => {
    if (series && episode) {
      const vodEpisode = localStorage.getItem("vodEpisodeInfo");
      if (vodEpisode === series + episode) {
        const playerTime = localStorage.getItem(`${language}Time`);
        if (playerTime && player.current) {
          player.current.seekTo(parseInt(playerTime));
          syncCallback(language);
        }
      } else {
        localStorage.setItem("vodEpisodeInfo", series + episode);
        localStorage.setItem("dubTime", "0");
        localStorage.setItem("subTime", "0");
      }
    }
  };

  const episodeFinishedMessage = { dub: "The English Episode Has Finished", sub: "The Japanese Episode Has Finished" };

  if (series && episode && !fetchError) {
    const foundSeries = allSeries[series];
    return (
      <div>
        {loading ? (
          <Loading />
        ) : episodeInfo ? (
          <div id="watch-player-wrapper">
            <Player
              playing={true}
              files={episodeInfo}
              onVodStart={setVideoToPrevTime}
              playerType="vod"
              episodeFinishedMessage={episodeFinishedMessage}
            />
          </div>
        ) : (
          <></>
        )}

        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
          <SeriesEpisodes numberOfEpisodes={foundSeries.episodes} seriesName={foundSeries.shortName} />
        </div>
      </div>
    );
  } else if (fetchError) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>There was an error getting this episode</h1>
      </>
    );
  }
}
