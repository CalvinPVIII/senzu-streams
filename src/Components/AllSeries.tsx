import allMovies from "../ts/allMovies";
import allSeries from "../ts/allSeries";

import "../css/AllSeries.css";
import SeriesCard from "./SeriesCard";
import { Link } from "react-router-dom";

export default function AllSeries() {
  return (
    <>
      <div className="series-cards">
        {Object.values(allSeries).map((series) => (
          <div className="series-card">
            <Link to={`/vods/${series.shortName}`}>
              <SeriesCard name={series.name} info={series.episodes} shortname={series.shortName} image={series.image} type="series" />
            </Link>
          </div>
        ))}
      </div>
      <div>
        <h1 id="movies-break">Movies</h1>
        <div className="series-cards">
          {Object.values(allMovies).map((series) => (
            <div className="series-card">
              <Link to={`/vods/${series.series}/movie/${series.number}`}>
                <SeriesCard name={series.name} info={series.info} shortname={series.info} image={series.image} type="movie" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
