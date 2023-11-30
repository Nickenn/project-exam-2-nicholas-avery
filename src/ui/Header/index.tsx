import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import image from "../../assets/logo-no-background.png";
import styles from "./style.module.css";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const { logout, userName } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={image} alt="Holidaze logo" className={styles.logo} />
      </Link>
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
          <li>
            <NavLink to="/" onClick={logout}>
              <LogoutIcon fontSize="small"></LogoutIcon>LOGOUT
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
