import { useMediaQuery } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import senzuImg from "../assets/images/senzubean.png";
export default function Header() {
  const [isLargerThan830] = useMediaQuery("(min-width: 830px)");

  if (isLargerThan830) {
    return (
      <div id="header-wrapper" className="header-bg">
        <Link to="/">
          <div id="header-left">
            <img src={senzuImg} alt="Senzu Bean" id="header-img" />
            <h1 id="header-text">Senzu Streams</h1>
          </div>
        </Link>
        <div id="header-right">
          <Link to="/">
            <h1 className="header-link">Live</h1>
          </Link>
          <Link to="/vods">
            <h1 className="header-link">VODs</h1>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div id="header-wrapper-responsive" className="header-bg">
          <Link to="/">
            <div id="header-responsive-title">
              <img src={senzuImg} alt="Senzu Bean" id="header-img" />
              <h1 id="header-text">Senzu Streams</h1>
            </div>
          </Link>
          <Menu>
            <MenuButton>
              <h1 id="hamburger-menu-button">≡</h1>
            </MenuButton>
            <MenuList bg="blackAlpha.300" minW="0" w="100px">
              <Center bg="blackAlpha.300" _hover={{ bg: "black" }}>
                <Link to="/">
                  <MenuItem bg="blackAlpha.200" textAlign={"center"} w="100%">
                    Live
                  </MenuItem>
                </Link>
              </Center>
              <Center bg="blackAlpha.300" _hover={{ bg: "black" }}>
                <Link to="/vods">
                  <MenuItem bg="blackAlpha.200" _hover={{ bg: "black" }}>
                    VODs
                  </MenuItem>
                </Link>
              </Center>
            </MenuList>
          </Menu>
        </div>
      </>
    );
  }
}
