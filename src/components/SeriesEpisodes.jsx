import React from "react";
import { useParams } from "react-router-dom";
import EpisodesList from "./EpisodesList";
import SeriesCard from "./SeriesCard";
import "../styles/SeriesEpisodes.css";

function SeriesEpisodes(props) {
    const shortName = useParams().series;
    const seriesInfo = props.allSeries[shortName];

    return (
        <div className="series-episodes">
            <div className="series-card-wrapper">
                <SeriesCard
                    seriesImage={seriesInfo.image}
                    seriesName={seriesInfo.name}
                    seriesInfo={seriesInfo.episodes + " Episodes"}
                />
            </div>

            <div className="episode-list-wrapper">
                <EpisodesList
                    seriesEpisodes={seriesInfo.episodes}
                    currentSeries={shortName}
                />
            </div>
        </div>
    );
}

export default SeriesEpisodes;
