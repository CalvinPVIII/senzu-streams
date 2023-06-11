import { Stack } from "@chakra-ui/react";
import "../css/SeriesCard.css";

interface SeriesCardProps {
  name: string;
  image: string;
  info?: number | string;
  shortname?: string;
  type: "series" | "movie";
}

export default function SeriesCard(props: SeriesCardProps) {
  return (
    <>
      <div className="card">
        <img src={props.image} alt={props.name} className="card-image" />
        <div className="card-content">
          {/* <Stack mt="6" spacing="3"> */}
          <h1 className="card-header">{props.name}</h1>
          {props.type === "series" ? <h2 className="card-body">{props.info} Episodes</h2> : <h2 className="card-body">{props.info} </h2>}
          {/* </Stack> */}
        </div>
      </div>
    </>
  );
}
