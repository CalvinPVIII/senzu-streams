import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Popover, PopoverContent, PopoverBody, IconButton, PopoverTrigger } from "@chakra-ui/react";

interface EpisodeNavigationButtonProps {
  type: "next" | "prev";
}

export function EpisodeNavigationButton(props: EpisodeNavigationButtonProps) {
  return (
    <div id="next-episode" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          <IconButton
            size="s"
            variant="ghost"
            colorScheme="white"
            icon={props.type === "next" ? <BsArrowRight /> : <BsArrowLeft />}
            aria-label={props.type === "next" ? "Next Episode" : "Previous Episode"}
          />
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
