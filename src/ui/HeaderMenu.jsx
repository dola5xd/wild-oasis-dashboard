import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { BiMoon, BiSun, BiUser } from "react-icons/bi";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("./account")}>
          <BiUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={toggleDarkMode}>
          {isDarkMode ? <BiMoon /> : <BiSun />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
