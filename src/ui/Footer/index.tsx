import { Link, NavLink } from "react-router-dom";
import image from "../../assets/logo-color.png";
import styles from "./style.module.css";
import HomeIcon from "@mui/icons-material/Home";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuth } from "../../context/authContext";

function Footer() {
  const { userName } = useAuth();

  return (
    <footer className={styles.footer}>
      <Link to="/">
        <img src={image} alt="Holidaze logo" className={styles.logo} />
      </Link>
      <div>
        <p>&copy; Holidaze, inc.</p>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/calendar.tsx">
              <HomeIcon fontSize="small"></HomeIcon>BOOKING
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profiles/${userName}`}>
              <AccountCircleIcon fontSize="small"></AccountCircleIcon>PROFILE
            </NavLink>
          </li>
          <li>
            <NavLink to="auth/login.tsx">
              <LockOpenIcon fontSize="small"></LockOpenIcon>LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink to="auth/register.tsx">
              <CreateIcon fontSize="small"></CreateIcon>SIGN UP
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
