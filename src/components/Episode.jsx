import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "../styles/Episode.css";
import { useParams } from "react-router-dom";
import EpisodePlayer from "./EpisodePlayer";
import EpisodesList from "./EpisodesList";

function Episode(props) {
    const [allSeries, setAllSeries] = useState();

    const episodeNumber = useParams().episode;
    const seriesShortName = useParams().series;
    useEffect(() => {
        if (!props.allSeries) {
            props.getAllSeries(setAllSeries);
        } else {
            setAllSeries(props.allSeries);
        }
    }, [props]);
    if (allSeries) {
        const seriesInfo = props.allSeries[seriesShortName];

        const currentEpisode = episodeNumber;

        return (
            <div className="episode" key={episodeNumber}>
                <div className="episode-title-wrapper">
                    <p className="episode-title">
                        {seriesInfo.name} Episode {episodeNumber}
                    </p>
                </div>
                <div className="episode-player-wrapper">
                    <EpisodePlayer
                        episode={currentEpisode}
                        series={seriesShortName}
                    />
                </div>
                <div className="episodes-list-wrapper">
                    <EpisodesList
                        seriesEpisodes={allSeries[seriesShortName].episodes}
                        currentEpisode={episodeNumber}
                        currentSeries={seriesShortName}
                    />
                </div>
            </div>
        );
    } else {
        return <div className="episode">wait</div>;
    }
}

export default Episode;
