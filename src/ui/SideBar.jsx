import styled from "styled-components";
import MainNav from "../ui/MainNav";
import Logo from "../ui/Logo";

const StyledAside = styled.aside`
  padding: 50px 20px;
  background-color: var(--color-grey-0);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

function SideBar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  );
}

export default SideBar;
