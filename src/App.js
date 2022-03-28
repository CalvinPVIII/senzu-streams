import "./App.css";
import React from "react";
import Livestream from "./components/Livestream";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SeriesSelector from "./components/SeriesSelector";
import SeriesEpisodes from "./components/SeriesEpisodes";
import Episode from "./components/Episode";
import Disclaimer from "./components/Disclaimer";
import Admin from "./components/Admin";
import allSeries from "./allSeries";
import allMovies from "./allMovies";

function App() {
    const getSeries = (allSeries, seriesShortName) => {
        return allSeries[seriesShortName];
    };
    const getMovie = (allMovies, movieNumber, movieSeries) => {
        for (let i = 0; i < allMovies.length; i++) {
            if (
                allMovies[i].number === movieNumber &&
                allMovies[i].series === movieSeries
            ) {
                return allMovies[i];
                break;
            }
        }
    };

    return (
        <div className="app">
            <Header />
            <Switch>
                <Route exact path="/" render={(props) => <Livestream />} />
                <Route exact path="/admin">
                    <Admin />
                </Route>
                <Route
                    exact
                    path="/vods"
                    render={(props) => (
                        <SeriesSelector
                            allSeries={allSeries}
                            allMovies={allMovies}
                        />
                    )}
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

                <Route
                    exact
                    path="/vods/:series/movie/:episode"
                    render={(props) => (
                        <Episode getMovie={getMovie} allMovies={allMovies} />
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
