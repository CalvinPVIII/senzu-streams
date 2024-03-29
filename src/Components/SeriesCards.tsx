import { MovieInfo, SeriesInfo } from "../../types";
import SeriesCard from "./SeriesCard";
import { Link } from "react-router-dom";
import "../css/SeriesCards.css";

interface SeriesCardsProps {
  seriesValues: Array<SeriesInfo> | Array<MovieInfo>;
  seriesType: "movie" | "series";
}

export default function SeriesCards(props: SeriesCardsProps) {
  return (
    <div className="series-cards">
      {Object.values(props.seriesValues).map((series, index) => (
        <div className="series-card" key={index}>
          {props.seriesType === "movie" ? (
            <a href={`/vods/${series.series}/movie/${series.number}`}>
              <SeriesCard name={series.name} info={series.info} shortname={series.info} image={series.image} type={props.seriesType} />
            </a>
          ) : (
            <Link to={`/vods/${series.shortName}`}>
              <SeriesCard name={series.name} info={series.episodes} shortname={series.shortName} image={series.image} type={props.seriesType} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
