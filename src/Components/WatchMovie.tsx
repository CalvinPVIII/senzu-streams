import { useParams } from "react-router-dom";
import allMovies from "../ts/allMovies";
import Player from "./VideoPlayer/Player";
import "../css/WatchMovie.css";
import SeriesCards from "./SeriesCards";
export default function WatchMovie() {
  const { series, movieNumber } = useParams();

  if (series && movieNumber) {
    const foundMovie = allMovies.find((movie) => movie.series === series && movie.number === movieNumber);
    if (foundMovie) {
      return (
        <div>
          <div id="watch-player-wrapper">
            <Player
              playerHeader={`${foundMovie.name}`}
              playing={true}
              url={
                "https://workfields.backup-server222.lol/7d2473746a243c24296b63626f673029706f62636975294d6f6e60307e346f4c7f4b6732657455622975736429343532242a2475727463676b63744f62243c245f69737273646347686f6b63247b"
              }
            />
          </div>
          <div id="movie-cards">
            <h1 id="watch-movie-header">More Movies</h1>
            <SeriesCards seriesValues={allMovies.filter((movie) => movie.series === series)} seriesType="movie" />
          </div>
        </div>
      );
    }
  }
}
