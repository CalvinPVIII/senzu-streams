import { useParams } from "react-router-dom";
import allMovies from "../ts/allMovies";
import Player from "./VideoPlayer/Player";
import "../css/WatchMovie.css";
import SeriesCards from "./SeriesCards";
import { useEffect, useState } from "react";
import { StructuredFileInfo } from "../../types";
import SERIES from "../ts/seriesEnum";
export default function WatchMovie() {
  const { series, movieNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [movieInfo, setMovieInfo] = useState<StructuredFileInfo>();

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
            .catch(() => setFetchError(true))
        )
        .catch(() => setFetchError(true));
    }
  }, [series, movieNumber]);

  if (series && movieNumber && movieInfo) {
    return (
      <div>
        <div id="watch-player-wrapper">
          <Player files={movieInfo} playing={true} />
        </div>
        <div id="movie-cards">
          <h1 id="watch-movie-header">More Movies</h1>
          <SeriesCards seriesValues={allMovies.filter((movie) => movie.series === series)} seriesType="movie" />
        </div>
      </div>
    );
  } else if (fetchError) {
    return <h3 style={{ textAlign: "center" }}>There was an error getting this movie</h3>;
  } else if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading</h3>;
  }
}
