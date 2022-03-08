import React from "react";

import "semantic-ui-css/semantic.min.css";

import "../styles/Disclaimer.css";

function Disclaimer() {
    return (
        <div className="disclaimer">
            <p className="disclaimer-text">
                Senzu Streams is a non-profit fan project. We do not host the
                videos ourselves. All videos come from third party sources.
                Please contact the appropriate video host for removal. Dragon
                Ball, Dragon Ball Z, Dragon Ball GT, and Dragon Ball Super are
                all owned by Funimation, Toei Animation, Shueisha, and Akira
                Toriyama.
            </p>
        </div>
    );
}

export default Disclaimer;
