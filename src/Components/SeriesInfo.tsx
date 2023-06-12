import allSeries from "../ts/allSeries";
import SeriesCard from "./SeriesCard";
import SeriesEpisodes from "./SeriesEpisodes";
import { useParams } from "react-router-dom";

export default function SeriesInfo() {
  const { series } = useParams();

  if (series) {
    const foundSeries = allSeries[series];

    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SeriesCard type={"series"} name={foundSeries.name} info={foundSeries.episodes} image={foundSeries.image} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
          <SeriesEpisodes numberOfEpisodes={foundSeries.episodes} seriesName={foundSeries.shortName} />
        </div>
      </>
    );
  }
}
