import styled from "styled-components";
import { useDarkMode } from "../contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 7rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledLogo>
      {isDarkMode ? (
        <Img src="/img/logo-dark.png" alt="Logo" />
      ) : (
        <Img src="/img/logo-light.png" alt="Logo" />
      )}
    </StyledLogo>
  );
}

export default Logo;
