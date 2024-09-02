import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 60px 50px;
  overflow: scroll;
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-600);
  }
`;

const StyledApplayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  position: relative;
`;

function Applayout() {
  return (
    <StyledApplayout>
      <SideBar />
      <Header />
      <Main>
        <Container className="container">
          <Outlet />
        </Container>
      </Main>
    </StyledApplayout>
  );
}

export default Applayout;
