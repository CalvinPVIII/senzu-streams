import React from "react";
import { Card } from "semantic-ui-react";
import "../styles/SeriesCard.css";

function SeriesCard(props) {
    return (
        <div className="series-episodes">
            <Card color="black">
                <img
                    src={props.seriesImage}
                    className="series-image"
                    alt={props.seriesName}
                />
                <Card.Content>
                    <Card.Header>{props.seriesName} </Card.Header>
                    <Card.Meta>{props.seriesLength} Episodes</Card.Meta>
                </Card.Content>
            </Card>
        </div>
    );
}

export default SeriesCard;
