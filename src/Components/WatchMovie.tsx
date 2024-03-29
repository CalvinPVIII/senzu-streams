import { useParams } from "react-router-dom";
import allMovies from "../ts/allMovies";
import Player, { offsets } from "./VideoPlayer/Player";
import "../css/WatchMovie.css";
import SeriesCards from "./SeriesCards";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { StructuredFileInfo } from "../../types";
import SERIES from "../ts/seriesEnum";
import Loading from "./Loading";
export default function WatchMovie() {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [movieInfo, setMovieInfo] = useState<StructuredFileInfo>();
  const { series, movieNumber } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (series && movieNumber) {
      fetch(`${import.meta.env.VITE_API_URL}/movies/${SERIES[series]}/${movieNumber}`)
        .then((response) =>
          response
            .json()
            .then((result) => {
              setMovieInfo(result);
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
  }, [series, movieNumber]);

  const setVideoToPrevTime = (
    language: "dub" | "sub",
    dubPlayer: React.RefObject<ReactPlayer>,
    subPlayer: React.RefObject<ReactPlayer>,
    dubOffsets: offsets,
    subOffsets: offsets
  ) => {
    if (series && movieNumber) {
      const vodEpisode = localStorage.getItem("vodEpisodeInfo");
      if (vodEpisode === series + movieNumber) {
        console.log(language);
        const subPlayerTime = localStorage.getItem(`subTime`);
        const dubPlayerTime = localStorage.getItem(`subTime`);
        if (subPlayerTime && dubPlayerTime && dubPlayer.current && subPlayer.current) {
          subPlayer.current.seekTo(parseInt(subPlayerTime) - subOffsets.intro);
          dubPlayer.current.seekTo(parseInt(dubPlayerTime) - dubOffsets.intro);
          // syncCallback(language);
        }
      } else {
        localStorage.setItem("vodEpisodeInfo", series + movieNumber);
        localStorage.setItem("dubTime", "0");
        localStorage.setItem("subTime", "0");
      }
    }
  };
  const episodeFinishedMessage = { dub: "The English Episode Has Finished", sub: "The Japanese Episode Has Finished" };

  if (series && movieNumber && !fetchError) {
    return (
      <div>
        <div id="watch-player-wrapper">
          {loading ? (
            <Loading />
          ) : movieInfo ? (
            <Player
              files={movieInfo}
              playing={true}
              episodeFinishedMessage={episodeFinishedMessage}
              onVodStart={setVideoToPrevTime}
              playerType="vod"
              maxWidth={1200}
              theaterModeMaxWidth={1300}
            />
          ) : (
            <></>
          )}
        </div>
        <div id="movie-cards">
          <h1 id="watch-movie-header">More Movies</h1>
          <SeriesCards seriesValues={allMovies.filter((movie) => movie.series === series)} seriesType="movie" />
        </div>
      </div>
    );
  } else if (fetchError) {
    return <h1 style={{ textAlign: "center" }}>There was an error getting this movie</h1>;
  }
}
