import { Link, NavLink } from "react-router-dom";
import image from "../../assets/logo-color.png";
import styles from "./style.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
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
            <NavLink to="/">LOGIN</NavLink>
          </li>
          <li>
            <NavLink to="/src/pages/CreateAccountPage/index.tsx">
              REGISTER
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
