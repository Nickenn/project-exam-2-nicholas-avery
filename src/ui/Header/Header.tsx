import styled from "styled-components";

import UserMenu from "./UserMenu";
import Logo from "./Logo";

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  background-color: white;
  border-bottom: grey 1px solid;

  @media only screen and (max-width: 500px) {
    padding-x: 0;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 3rem;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledNav>
        <Logo />
        <UserMenu />
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
