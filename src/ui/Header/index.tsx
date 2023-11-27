import { Link, NavLink } from "react-router-dom";
import image from "../../assets/logo-no-background.png";
import styles from "./style.module.css";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={image} alt="Holidaze logo" className={styles.logo} />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/calendar.tsx">
              <HomeIcon></HomeIcon>CALENDAR
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <EmailIcon></EmailIcon>CONTACT US
            </NavLink>
          </li>
          <li>
            <NavLink to="auth/login.tsx">
              <LockOpenIcon></LockOpenIcon>LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink to="auth/register.tsx">
              <CreateIcon></CreateIcon>CREATE ACCOUNT
            </NavLink>
          </li>
          <li>
            <NavLink to="profile/profile.tsx">
              <AccountCircleIcon></AccountCircleIcon>MY PROFILE
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
