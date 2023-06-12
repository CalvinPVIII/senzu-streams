import "../css/SeriesEpisodes.css";
import { Link } from "react-router-dom";

interface SeriesEpisodesProps {
  numberOfEpisodes: number;
  seriesName: string;
}

export default function SeriesEpisodes(props: SeriesEpisodesProps) {
  const createLinkArray = (): Array<JSX.Element> => {
    const episodeButtons: Array<JSX.Element> = [];
    for (let i = 1; i <= props.numberOfEpisodes; i++) {
      episodeButtons.push(
        <Link to={`/vods/${props.seriesName}/${i}`}>
          <div className="episode-box">
            <p className="episode-number">{i}</p>
          </div>
        </Link>
      );
    }
    return episodeButtons;
  };

  return (
    <div id="episodes-wrapper">
      <div id="episodes-header-wrapper">
        <h1 id="episodes-header">Episodes</h1>
      </div>
      <div id="episodes-links">{createLinkArray().map((element) => element)} </div>
    </div>
  );
}
