import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Popover, PopoverContent, PopoverBody, PopoverTrigger } from "@chakra-ui/react";
import { useState } from "react";

interface LanguageControlButtonProps {
  currentPlayerLanguage: "english" | "japanese";
  handlePlayerCurrentLanguage: (language: "english" | "japanese") => void;
  currentSource: string;
}

export default function LanguageControlButton(props: LanguageControlButtonProps) {
  const [language, setLanguage] = useState<"english" | "japanese">(props.currentPlayerLanguage);

  const handleChangeLanguage = () => {
    if (language === "english") {
      setLanguage("japanese");
      props.handlePlayerCurrentLanguage("japanese");
    } else if (language === "japanese") {
      setLanguage("english");
      props.handlePlayerCurrentLanguage("english");
    }
  };

  return (
    <div id="language-control-buttons" className="clickable">
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          {language === "japanese" ? (
            <span style={{ opacity: "0.5" }} onClick={handleChangeLanguage}>
              <span className="fi fi-us"></span>
            </span>
          ) : (
            <span>
              <span className="fi fi-us"></span>
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent maxW="90px" color="white" borderColor="black" backgroundColor="black">
          <PopoverBody fontSize={"10px"}>Set language to English</PopoverBody>
        </PopoverContent>
      </Popover>
      <span id="language-separator">/</span>
      <Popover trigger="hover" placement="bottom">
        <PopoverTrigger>
          {language === "english" ? (
            <span style={{ opacity: "0.5" }} onClick={handleChangeLanguage}>
              <span className="fi fi-jp"></span>
            </span>
          ) : (
            <span>
              <span className="fi fi-jp"></span>
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent maxW="90px" color="white" borderColor="black" backgroundColor="black">
          <PopoverBody fontSize={"10px"}>Set language to Japanese</PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
