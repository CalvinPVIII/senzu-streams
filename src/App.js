import "./App.css";
import React from "react";
import Livestream from "./components/Livestream";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SeriesSelector from "./components/SeriesSelector";
import SeriesEpisodes from "./components/SeriesEpisodes";
import Episode from "./components/Episode";
import Disclaimer from "./components/Disclaimer";
import dbImage from "./icons/series/dragonball.jpg";
import dbzImage from "./icons/series/z.jpg";
import dbKaiImage from "./icons/series/kai.jpg";
import dbsImage from "./icons/series/super.jpg";
import dbgtImage from "./icons/series/gt.jpg";

function App() {
    const allSeries = {
        db: {
            name: "Dragon Ball ",
            shortName: "db",
            episodes: 153,
            image: dbImage,
        },
        dbz: {
            name: "Dragon Ball Z",
            shortName: "dbz",
            episodes: 291,
            image: dbzImage,
        },
        dbkai: {
            name: "Dragon Ball Kai",
            shortName: "dbkai",
            episodes: 167,
            image: dbKaiImage,
        },
        dbs: {
            name: "Dragon Ball Super",
            shortName: "dbs",
            episodes: 131,
            image: dbsImage,
        },
        dbgt: {
            name: "Dragon Ball GT",
            shortName: "dbgt",
            episodes: 64,
            image: dbgtImage,
        },
    };

    const getSeries = (allSeries, seriesShortName) => {
        return allSeries[seriesShortName];
    };

    return (
        <div className="app">
            <Header />
            <Switch>
                <Route exact path="/" render={(props) => <Livestream />} />
                <Route
                    exact
                    path="/vods"
                    render={(props) => <SeriesSelector allSeries={allSeries} />}
                />
                <Route
                    exact
                    path="/vods/:series"
                    render={(props) => (
                        <SeriesEpisodes
                            getSeries={getSeries}
                            allSeries={allSeries}
                        />
                    )}
                />

                <Route
                    exact
                    path="/vods/:series/:episode"
                    render={(props) => (
                        <Episode getSeries={getSeries} allSeries={allSeries} />
                    )}
                />
            </Switch>

            <style jsx>
                {`
                    body {
                        color: #f5f5f5;
                        background-color: #17181c;
                    }
                `}
            </style>
            <Disclaimer />
        </div>
    );
}

export default App;
