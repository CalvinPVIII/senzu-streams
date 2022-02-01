import React from "react";
import { Link } from "react-router-dom";
import SeriesCard from "./SeriesCard";

import "../styles/SeriesSelect.css";

import { Popup } from "semantic-ui-react";

function SeriesSelector(props) {
    return (
        <div className="series-select">
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
                                    seriesLength={series.episodes}
                                />
                            </Link>
                        </div>
                    }
                />
            ))}
        </div>
    );
}

export default SeriesSelector;
