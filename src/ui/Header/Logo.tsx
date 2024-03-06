import styled from "styled-components";
import styles from "./style.module.css";
import image from "../../assets/logo-color.png";

import { NavLink } from "react-router-dom";

const StyledLogo = styled(NavLink)`
  display: flex;
  align-items: center;
  border-radius: 7px;
`;

function Logo() {
  return (
    <StyledLogo to="/">
      <img src={image} alt="Holidaze logo" className={styles.logo} />
    </StyledLogo>
  );
}

export default Logo;
