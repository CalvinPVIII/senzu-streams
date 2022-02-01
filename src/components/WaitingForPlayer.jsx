import React from "react";

import "semantic-ui-css/semantic.min.css";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import "../styles/WaitingForPlayer.css";

function WaitingForPlayer(props) {
    return (
        <div className="Waiting-for-player">
            <Segment>
                <div className="waiting-for-player-wrapper">
                    <Dimmer active>
                        <Loader>Loading Video</Loader>
                    </Dimmer>
                </div>
            </Segment>
        </div>
    );
}

export default WaitingForPlayer;
