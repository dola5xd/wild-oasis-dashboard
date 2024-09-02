import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, isAuth } = useUser();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigate("./login");
      queryClient.removeQueries(["User"]);
    }
  }, [isAuth, navigate, isLoading, queryClient]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuth) return children;
}

export default ProtectedRoute;
