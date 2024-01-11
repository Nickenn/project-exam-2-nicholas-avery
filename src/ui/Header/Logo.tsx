import styled from "styled-components";

import { NavLink } from "react-router-dom";

const StyledLogo = styled(NavLink)`
  display: flex;
  align-items: center;
  border-radius: 7px;

  @media only screen and (max-width: 700px) {
    height: 10px;
    width: 10px;
  }
`;

const StyledLogoImg = styled.img`
  @media only screen and (max-width: 700px) {
    height: 75px;
    width: 75px;
  }
`;

function Logo() {
  return (
    <StyledLogo to="/">
      <StyledLogoImg src="/src/assets/logo-color.png" />
    </StyledLogo>
  );
}

export default Logo;
