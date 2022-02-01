import React from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";
import "../styles/Header.css";
import senzuLogo from "../icons/senzubean.png";

function Header(props) {
    return (
        <div className="header">
            <Segment inverted size="large" raised>
                <div className="header-wrapper">
                    <div className="header-left">
                        <img
                            src={senzuLogo}
                            alt="Senzu Bean"
                            className="senzu-logo"
                        />
                        <p className="header-title">Senzu Streams *BETA*</p>
                    </div>
                    <div className="header-right">
                        <Link to="/">
                            <p className="header-links">Live</p>
                        </Link>
                        <Link to="/vods">
                            <p className="header-links">VODs</p>
                        </Link>
                    </div>
                </div>
            </Segment>
        </div>
    );
}

export default Header;
