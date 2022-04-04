import React, { useState } from "react";

import "semantic-ui-css/semantic.min.css";

import "../styles/Admin.css";

function Admin() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [securityTokenForm, setSecurityTokenForm] = useState("");
    const [nonWorkingSourceForm, setNonWorkingSourceForm] = useState("Gogo");
    const [changePlaylistForm, setChangePlaylistForm] = useState("main");
    const [setEpisodeForm, setSetEpisodeForm] = useState(0);
    const [startStopStreamForm, setStartStopStreamForm] = useState("start");
    const [apiToken, setApiToken] = useState("");
    const [apiReturn, setApiReturn] = useState("");

    const onFormSubmit = (e, action, data) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_CALL}/admin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: apiToken,
                action: action,
                data: data,
            }),
        })
            .then((response) => console.log(response))
            .then((data) => {
                console.log(data);
            });
    };

    const onSecurityFormSubmit = (event) => {
        event.preventDefault();
        console.log(securityTokenForm);
        if (securityTokenForm === process.env.REACT_APP_SECURITY_TOKEN) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    };

    if (!isAuthorized) {
        return (
            <div className="Admin">
                <p className="admin-header">Admin</p>
                <div className="security-token-form">
                    <form
                        onSubmit={(event) => {
                            onSecurityFormSubmit(event);
                        }}
                    >
                        <label for="token">Security Token</label>
                        <input
                            type="text"
                            name="token"
                            value={securityTokenForm}
                            onChange={(e) => {
                                setSecurityTokenForm(e.target.value);
                            }}
                        ></input>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Admin">
                <p className="admin-header">Admin</p>
                <div className="admin-section">
                    <div className="update-non-working-source-section">
                        <form
                            onSubmit={(e) => {
                                onFormSubmit(
                                    e,
                                    "updateNonWorkingList",
                                    nonWorkingSourceForm
                                );
                            }}
                        >
                            <label for="update-non-working-source">
                                Update Non Working Source List
                            </label>
                            <select
                                value={nonWorkingSourceForm}
                                onChange={(e) => {
                                    setNonWorkingSourceForm(e.target.value);
                                }}
                            >
                                <option value="Gogo">Gogo</option>
                                <option value="Anime Owl">Anime Owl</option>
                                <option value="Gogoanime">Gogoanime</option>
                                <option value="KimAnime">KimAnime</option>
                            </select>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>

                    <div className="change-playlist-section">
                        <form
                            onSubmit={(e) => {
                                onFormSubmit(
                                    e,
                                    "changePlaylist",
                                    changePlaylistForm
                                );
                            }}
                        >
                            <label for="change-playlist">
                                Change Stream Playlist
                            </label>
                            <select
                                value={changePlaylistForm}
                                onChange={(e) => {
                                    setChangePlaylistForm(e.target.value);
                                }}
                            >
                                <option value="main">main</option>
                                <option value="mainWithZ">mainWithZ</option>
                                <option value="canon">canon</option>
                                <option value="mainWithSuperMovies">
                                    mainWithSuperMovies
                                </option>
                                <option value="movies">movies</option>
                            </select>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>

                    <div className="set-episode-section">
                        <form
                            onSubmit={(e) => {
                                onFormSubmit(e, "setEpisode", setEpisodeForm);
                            }}
                        >
                            <label for="set-episode">Set Current Episode</label>

                            <input
                                type="number"
                                value={setEpisodeForm}
                                onChange={(e) => {
                                    setSetEpisodeForm(e.target.value);
                                }}
                            />

                            <input type="submit" value="Submit" />
                        </form>
                    </div>

                    <div className="start-stop-stream-secttion">
                        <form
                            onSubmit={(e) => {
                                onFormSubmit(e, startStopStreamForm, "");
                            }}
                        >
                            <label>Start or Stop Stream</label>
                            <select
                                value={startStopStreamForm}
                                onChange={(e) => {
                                    setStartStopStreamForm(e.target.value);
                                }}
                            >
                                <option value="startStream">Start</option>
                                <option value="stopStream">Stop</option>
                            </select>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className="api-token-form">
                        <label for="token">API Token</label>
                        <input
                            type="password"
                            name="apiToken"
                            value={apiToken}
                            onChange={(e) => {
                                setApiToken(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
