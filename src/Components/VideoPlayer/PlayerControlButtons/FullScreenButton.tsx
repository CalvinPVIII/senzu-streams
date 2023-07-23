import { Popover, PopoverContent, PopoverBody, PopoverTrigger, IconButton } from "@chakra-ui/react";
import { BsArrowsFullscreen } from "react-icons/bs";

interface FullScreenButtonProps {
  handleFullScreen: () => void;
}

export default function FullScreenButton(props: FullScreenButtonProps) {
  return (
    <div id="fullscreen" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          <IconButton
            className="control-icon"
            size="s"
            variant="ghost"
            colorScheme="white"
            icon={<BsArrowsFullscreen />}
            aria-label={"full screen"}
            onClick={props.handleFullScreen}
          />
        </PopoverTrigger>
        <PopoverContent maxW="60px" color="white" borderColor="black" backgroundColor="black">
          <PopoverBody fontSize={"10px"}>
            <span>Full Screen</span>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
