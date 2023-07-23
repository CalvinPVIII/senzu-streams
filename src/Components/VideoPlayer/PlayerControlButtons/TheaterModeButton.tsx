import { Popover, PopoverContent, PopoverBody, PopoverTrigger, IconButton } from "@chakra-ui/react";
import { BsArrowsFullscreen } from "react-icons/bs";

interface TheaterModeButtonProps {
  setMaxWidth: React.Dispatch<React.SetStateAction<number>>;
  maxWidth: number;
  currentMaxWidth: number;
  theaterModeMaxWidth: number;
}

export default function TheaterMode(props: TheaterModeButtonProps) {
  const handleClick = () => {
    if (props.currentMaxWidth === props.maxWidth) {
      props.setMaxWidth(props.theaterModeMaxWidth);
    } else {
      props.setMaxWidth(props.maxWidth);
    }
  };
  return (
    <div id="theater-mode" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          <IconButton
            className="control-icon"
            size="s"
            variant="ghost"
            colorScheme="white"
            icon={<BsArrowsFullscreen />}
            aria-label={"Theater Mode"}
            onClick={handleClick}
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
