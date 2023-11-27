import styled from "styled-components";

interface ContainerProps {
  children: React.ReactNode;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;
  gap: 5rem;
  max-width: 1200px;
  min-height: 100vh;
`;

function Container({ children }: ContainerProps) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default Container;
