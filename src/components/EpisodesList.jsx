import React from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";
import "../styles/EpisodesList.css";

function EpisodesList(props) {
    const createLinkArray = () => {
        let episodeButtons = [];
        for (let i = 1; i <= props.seriesEpisodes; i++) {
            episodeButtons.push(
                <div className="episode-box" id={`episode-${i}`} key={i}>
                    <Link to={`/vods/${props.currentSeries}/${i}`}>
                        <Segment inverted secondary textAlign="center">
                            <div className="episode-link-content">
                                <p>{i}</p>
                            </div>
                        </Segment>
                    </Link>
                </div>
            );
        }
        return episodeButtons;
    };

    return (
        <div className="episodes-list">
            <Segment inverted textAlign="center">
                <p className="episodes-list-header">Episodes</p>
                <div className="episode-box-wrapper">
                    {createLinkArray().map((episode) => episode)}
                </div>
            </Segment>
            <style jsx>
                {`
                    #episode-${props.currentEpisode} {
                        opacity: 10%;
                    }
                `}
            </style>
        </div>
    );
}

export default EpisodesList;
