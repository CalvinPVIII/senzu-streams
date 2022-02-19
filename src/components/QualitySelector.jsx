import React from "react";

import "semantic-ui-css/semantic.min.css";

import "../styles/QualitySelector.css";

function QualitySelector(props) {
    console.log("quality props");
    console.log(props);
    return (
        <div className="quality-selector">
            <div className="dub-sources">
                <h1>Dub Sources</h1>
                {props.currentDubFiles.map((source) => (
                    <>
                        <p>{source.source}</p>

                        {Object.values(source.files).map((file) => (
                            <p
                                onClick={() => {
                                    props.videoQualityChanger(
                                        "en",
                                        source.source,
                                        source.files.indexOf(file)
                                    );
                                }}
                            >
                                {file.file}
                            </p>
                        ))}
                    </>
                ))}
            </div>
            <div className="sub-sources">
                <h1>Sub Sources</h1>
                {props.currentSubFiles.map((source) => (
                    <>
                        <p>{source.source}</p>

                        {Object.values(source.files).map((file) => (
                            <p
                                onClick={() => {
                                    props.videoQualityChanger(
                                        "jp",
                                        source.source,
                                        source.files.indexOf(file)
                                    );
                                }}
                            >
                                {file.file}
                            </p>
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
}

export default QualitySelector;
