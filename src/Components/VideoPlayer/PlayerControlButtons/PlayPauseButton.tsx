import { Popover, PopoverTrigger, IconButton, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { useState } from "react";

interface PlayPauseButtonProps {
  handlePlayerPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerPlaying: boolean;
}

export default function PlayPauseButton(props: PlayPauseButtonProps) {
  const [playing, setPlaying] = useState(props.playerPlaying);

  const handlePlaying = () => {
    setPlaying(!playing);
    props.handlePlayerPlaying(!playing);
  };

  return (
    <div id="play-pause-buttons" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          <IconButton
            size="s"
            variant="ghost"
            colorScheme="white"
            icon={playing ? <BsPauseFill onClick={handlePlaying} size="20" /> : <BsFillPlayFill onClick={handlePlaying} size="20" />}
            aria-label={"Play"}
          />
        </PopoverTrigger>
        <PopoverContent maxW="75px" color="white" borderColor="black" backgroundColor="black">
          {playing ? <PopoverBody fontSize={"12px"}>Pause</PopoverBody> : <PopoverBody fontSize={"12px"}>Play</PopoverBody>}
        </PopoverContent>
      </Popover>
    </div>
  );
}
