import { useNavigate } from "react-router";
import { useGetUser } from "../features/authentication/useGetUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();
  //   console.log("authen:", isAuthenticated);
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate("/login", { replace: true });
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
