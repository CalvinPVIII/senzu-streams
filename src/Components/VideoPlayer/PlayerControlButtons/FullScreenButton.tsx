import { Popover, PopoverContent, PopoverBody, PopoverTrigger, IconButton } from "@chakra-ui/react";
import { BsArrowsFullscreen } from "react-icons/bs";

const handleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.getElementById("players")?.requestFullscreen();
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
  }
};

export default function FullScreenButton() {
  return (
    <div id="fullscreen" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          <IconButton
            size="s"
            variant="ghost"
            colorScheme="white"
            icon={<BsArrowsFullscreen />}
            aria-label={"Full Screen"}
            onClick={handleFullscreen}
          />
        </PopoverTrigger>
        <PopoverContent maxW="60px" color="white" borderColor="black" backgroundColor="black">
          <PopoverBody fontSize={"10px"}>
            <span>Full screen</span>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
