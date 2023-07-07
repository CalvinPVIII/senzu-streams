import { Popover, PopoverContent, PopoverBody, PopoverTrigger, IconButton } from "@chakra-ui/react";
import { BsArrowsFullscreen } from "react-icons/bs";

interface TheaterModeButtonProps {
  setMaxWidth: React.Dispatch<React.SetStateAction<number>>;
  maxWidth: number;
  currentMaxWidth: number;
  theaterModeMaxWidth: number;
}

export default function TheaterMode(props: TheaterModeButtonProps) {
  const handleFullscreen = () => {
    if (props.currentMaxWidth === props.maxWidth) {
      props.setMaxWidth(props.theaterModeMaxWidth);
    } else {
      props.setMaxWidth(props.maxWidth);
    }
  };
  return (
    <div id="fullscreen" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          <IconButton
            size="s"
            variant="ghost"
            colorScheme="white"
            icon={<BsArrowsFullscreen />}
            aria-label={"Theater Mode"}
            onClick={handleFullscreen}
          />
        </PopoverTrigger>
        <PopoverContent maxW="60px" color="white" borderColor="black" backgroundColor="black">
          <PopoverBody fontSize={"10px"}>
            <span>Theater Mode</span>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
