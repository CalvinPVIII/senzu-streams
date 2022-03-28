import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "../styles/Episode.css";
import { useParams } from "react-router-dom";
import EpisodePlayer from "./EpisodePlayer";
import EpisodesList from "./EpisodesList";

function Episode(props) {
    const [allSeries, setAllSeries] = useState();
    const [currentMovie, setCurrentMovie] = useState();

    const episodeNumber = useParams().episode;
    const seriesShortName = useParams().series;
    useEffect(() => {
        if (window.location.href.includes("movie")) {
            setCurrentMovie(
                props.getMovie(props.allMovies, episodeNumber, seriesShortName)
            );
        } else {
            if (!props.allSeries) {
                props.getAllSeries(setAllSeries);
            } else {
                setAllSeries(props.allSeries);
            }
        }
    }, [props, episodeNumber, seriesShortName]);
    let seriesInfo;
    if (allSeries) {
        seriesInfo = props.allSeries[seriesShortName];
        seriesInfo.fullTitle = `${seriesInfo.name} Episode ${episodeNumber}`;
    } else if (currentMovie) {
        seriesInfo = currentMovie;
        seriesInfo.fullTitle = currentMovie.name;
    }
    if (seriesInfo) {
        return (
            <div className="episode" key={episodeNumber}>
                <div className="episode-title-wrapper">
                    <p className="episode-title">{seriesInfo.fullTitle}</p>
                </div>
                {window.location.href.includes("movie") ? (
                    <>
                        <div className="episode-player-wrapper">
                            <EpisodePlayer
                                apiEndpoint={`/movie/${seriesShortName}/${episodeNumber}`}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {" "}
                        <div className="episode-player-wrapper">
                            <EpisodePlayer
                                apiEndpoint={`/episode/${seriesShortName}/${episodeNumber}`}
                            />
                        </div>
                        <div className="episodes-list-wrapper">
                            <EpisodesList
                                seriesEpisodes={
                                    allSeries[seriesShortName].episodes
                                }
                                currentEpisode={episodeNumber}
                                currentSeries={seriesShortName}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    } else {
        return <div className="episode">Please wait</div>;
    }
}

export default Episode;
