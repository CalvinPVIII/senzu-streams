import React from "react";

import { Icon, Popup, Grid, Header, Flag } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import "../styles/QualitySelector.css";

function QualitySelector(props) {
    if (props.dubFiles && props.subFiles) {
        return (
            <div className="quality-selector">
                <Popup
                    on="click"
                    trigger={<Icon name="setting" />}
                    inverted
                    flowing
                    size="mini"
                    position="bottom center"
                >
                    <Grid centered divided columns="2">
                        <Grid.Column>
                            <div className="dub-sources">
                                <Header>
                                    <Flag name="us" /> Sources
                                </Header>
                                {props.dubFiles.map((source) => (
                                    <>
                                        {Object.values(source.files).map(
                                            (file) => (
                                                <p
                                                    onClick={() => {
                                                        props.selector(
                                                            "en",
                                                            source.source,
                                                            source.files.indexOf(
                                                                file
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <span className="quality-selector-option">
                                                        {props.currentQuality
                                                            .dub ===
                                                            source.source &&
                                                        parseInt(
                                                            props.currentQuality
                                                                .dubQuality
                                                        ) ===
                                                            parseInt(
                                                                source.files.indexOf(
                                                                    file
                                                                )
                                                            ) ? (
                                                            <>
                                                                •{source.source}{" "}
                                                                {file.label} •
                                                            </>
                                                        ) : (
                                                            <>
                                                                {source.source}{" "}
                                                                {file.label}
                                                            </>
                                                        )}
                                                    </span>
                                                </p>
                                            )
                                        )}
                                    </>
                                ))}
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="sub-sources">
                                <Header>
                                    <Flag name="jp" /> Sources
                                </Header>
                                {props.subFiles.map((source) => (
                                    <>
                                        {Object.values(source.files).map(
                                            (file) => (
                                                <p
                                                    onClick={() => {
                                                        props.selector(
                                                            "jp",
                                                            source.source,
                                                            source.files.indexOf(
                                                                file
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <span className="quality-selector-option">
                                                        {props.currentQuality
                                                            .sub ===
                                                            source.source &&
                                                        parseInt(
                                                            props.currentQuality
                                                                .subQuality
                                                        ) ===
                                                            parseInt(
                                                                source.files.indexOf(
                                                                    file
                                                                )
                                                            ) ? (
                                                            <>
                                                                •{source.source}{" "}
                                                                {file.label} •
                                                            </>
                                                        ) : (
                                                            <>
                                                                {source.source}{" "}
                                                                {file.label}
                                                            </>
                                                        )}
                                                    </span>
                                                </p>
                                            )
                                        )}
                                    </>
                                ))}
                            </div>
                        </Grid.Column>
                    </Grid>
                </Popup>
            </div>
        );
    } else {
        return <></>;
    }
}

export default QualitySelector;
