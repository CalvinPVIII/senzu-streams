import React from "react";
import { Link } from "react-router-dom";
import SeriesCard from "./SeriesCard";

import "../styles/SeriesSelect.css";

import { Popup } from "semantic-ui-react";

function SeriesSelector(props) {
    return (
        <div className="series-select">
            <div className="shows">
                {Object.values(props.allSeries).map((series) => (
                    <Popup
                        key={series.name}
                        inverted
                        basic
                        position="bottom center"
                        content={series.name}
                        trigger={
                            <div className="series-card">
                                <Link to={`/vods/${series.shortName}`}>
                                    <SeriesCard
                                        seriesName={series.name}
                                        seriesImage={series.image}
                                        seriesInfo={
                                            series.episodes + " Episodes"
                                        }
                                    />
                                </Link>
                            </div>
                        }
                    />
                ))}
            </div>
            <div className="movies-header">
                <h3>Movies</h3>
            </div>
            <div className="movies">
                {Object.values(props.allMovies).map((movie) => (
                    <Popup
                        key={movie.name}
                        inverted
                        basic
                        position="bottom center"
                        content={movie.name}
                        trigger={
                            <div className="series-card">
                                <Link
                                    to={`/vods/${movie.series}/movie/${movie.number}`}
                                >
                                    <SeriesCard
                                        seriesName={movie.name}
                                        seriesImage={movie.image}
                                        seriesInfo={movie.info}
                                    />
                                </Link>
                            </div>
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default SeriesSelector;
