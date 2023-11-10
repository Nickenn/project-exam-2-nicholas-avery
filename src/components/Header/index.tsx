import { Link, NavLink } from "react-router-dom";
import image from "../../assets/logo-no-background.png";
import styles from "./style.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={image} alt="Holidaze logo" className={styles.logo} />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/">CALENDER</NavLink>
          </li>
          <li>
            <NavLink to="/">CONTACT US</NavLink>
          </li>
          <li>
            <NavLink to="/src/pages/LoginPage/index.tsx">LOGIN</NavLink>
          </li>
          <li>
            <NavLink to="/src/pages/CreateAccountPage/index.tsx">
              CREATE ACCOUNT
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
