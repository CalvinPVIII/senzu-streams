import { LuSettings } from "react-icons/lu";
import { Popover, PopoverContent, PopoverBody, IconButton, PopoverTrigger, PopoverCloseButton, PopoverHeader } from "@chakra-ui/react";
import { useState, Fragment } from "react";
import { file, sourceFiles } from "../../../../types";

interface PlayerFileSettingsProps {
  currentSource: string;
  changeVideoFiles: (file: file, sourceName: string) => void;
  videoFiles: { [key: string]: sourceFiles };
  currentQuality: string;
}

export default function PlayerFileSettings(props: PlayerFileSettingsProps) {
  const [currentFocusedSource, setCurrentFocusedSource] = useState(props.currentSource);

  const handleChangeVideoFile = (sourceName: string, source: file) => {
    props.changeVideoFiles(source, sourceName);
  };

  return (
    <div id="settings" className="clickable">
      <Popover trigger="click" placement="top">
        <PopoverTrigger>
          <IconButton size="s" variant="ghost" colorScheme="white" icon={<LuSettings />} aria-label={"Settings"} className="control-icon" />
        </PopoverTrigger>
        <PopoverContent color="white" borderColor="black" backgroundColor="black" maxW="80%">
          <PopoverCloseButton />
          <PopoverHeader textAlign="center">Settings</PopoverHeader>
          <PopoverHeader display={"flex"} justifyContent={"space-around"} backgroundColor={"#1b1c1d"} fontSize={"small"}>
            {Object.keys(props.videoFiles).map((sourceName) => (
              <Fragment key={sourceName}>
                {sourceName === currentFocusedSource ? (
                  <p>{sourceName}</p>
                ) : (
                  <p onClick={() => setCurrentFocusedSource(sourceName)} style={{ opacity: "0.5" }}>
                    {sourceName}
                  </p>
                )}
              </Fragment>
            ))}
          </PopoverHeader>
          <PopoverBody fontSize={"small"}>
            {props.videoFiles[currentFocusedSource].files.map((source, index) => (
              <Fragment key={index}>
                {currentFocusedSource === props.currentSource && source.label === props.currentQuality ? (
                  <p style={{ fontWeight: "bold" }} onClick={() => handleChangeVideoFile(currentFocusedSource, source)}>
                    •{source.label} {source.type}
                  </p>
                ) : (
                  <p onClick={() => handleChangeVideoFile(currentFocusedSource, source)}>
                    {source.label} {source.type}
                  </p>
                )}
              </Fragment>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
