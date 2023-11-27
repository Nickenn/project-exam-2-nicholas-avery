import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);

  & p {
    background-color: #d44141ce;
    font-size: 1.4rem;
    padding: 3rem;
    border-radius: 3px;
  }
`;

const StyledLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6rem;
  font-size: 1.6rem;
  margin: 50px;
`;

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <StyledError>
      <h1>Woopsie!</h1>
      <p>
        An unexpected error has occured. Please contact us for further
        assistance.
      </p>
      <StyledLinks>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/src/pages/Contact.tsx">CONTACT US</NavLink>
      </StyledLinks>
    </StyledError>
  );
}

export default ErrorPage;
