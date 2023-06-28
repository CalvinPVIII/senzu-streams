import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Popover, PopoverContent, PopoverBody, IconButton, PopoverTrigger } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface EpisodeNavigationButtonProps {
  type: "next" | "prev";
}

export function EpisodeNavigationButton(props: EpisodeNavigationButtonProps) {
  const [link, setLink] = useState<string>();
  const { series, episode, movieNumber } = useParams();

  const finalEpisodes: { [key: string]: number } = {
    db: 153,
    dbz: 291,
    dbgt: 64,
    dbkai: 167,
    dbs: 131,
  };
  const finalMovies: { [key: string]: number } = {
    db: 4,
    dbz: 17,
    dbs: 2,
  };

  const getCorrectLink = () => {
    let episodeNumber;
    let infoObj;
    let vodType;
    if (episode) {
      episodeNumber = parseInt(episode);
      infoObj = finalEpisodes;
      vodType = "episode";
    } else if (movieNumber) {
      episodeNumber = parseInt(movieNumber);
      infoObj = finalMovies;
      vodType = "movie";
    }
    if (episodeNumber && series && infoObj) {
      if (props.type === "next") {
        if (episodeNumber < infoObj[series]) {
          vodType === "episode" ? setLink(`/vods/${series}/${episodeNumber + 1}`) : setLink(`/vods/${series}/movie/${episodeNumber + 1}`);
        }
      } else if (props.type === "prev") {
        if (episodeNumber > 1) {
          vodType === "episode" ? setLink(`/vods/${series}/${episodeNumber - 1}`) : setLink(`/vods/${series}/movie/${episodeNumber - 1}`);
        }
      }
    }
  };

  useEffect(() => {
    getCorrectLink();
  }, [series, episode]);

  return (
    <div id="next-episode" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          <a href={link}>
            <IconButton
              size="s"
              variant="ghost"
              colorScheme="white"
              icon={props.type === "next" ? <BsArrowRight /> : <BsArrowLeft />}
              aria-label={props.type === "next" ? "Next Episode" : "Previous Episode"}
            />
          </a>
        </PopoverTrigger>
        <PopoverContent maxW="75px" color="white" borderColor="black" backgroundColor="black">
          <PopoverBody fontSize={"10px"}>
            <span>{props.type === "next" ? "Next Episode" : "Previous Episode"}</span>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
