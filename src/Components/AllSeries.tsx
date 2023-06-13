import allMovies from "../ts/allMovies";
import allSeries from "../ts/allSeries";

import "../css/AllSeries.css";
import SeriesCards from "./SeriesCards";

export default function AllSeries() {
  return (
    <>
      <SeriesCards seriesType="series" seriesValues={Object.values(allSeries)} />
      <div>
        <h1 id="movies-break">Movies</h1>
        <SeriesCards seriesValues={allMovies} seriesType={"movie"} />
      </div>
    </>
  );
}
