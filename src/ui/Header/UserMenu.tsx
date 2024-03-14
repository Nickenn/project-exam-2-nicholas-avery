import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import styled from "styled-components";
import Avatar from "../Avatar/Avatar.tsx";

import LogoutIcon from "@mui/icons-material/Logout";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HotelIcon from "@mui/icons-material/Hotel";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HouseIcon from "@mui/icons-material/House";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const StyledUserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledMenu = styled.div`
  border-radius: var(--border-radius-lg);
  border: var(--border);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 2rem;
`;

const Menu = styled.div`
  position: absolute;
  top: 4.5rem;
  right: 0;
  width: max-content;
  background-color: white;

  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  border: var(--border);
  background-color: var(--color-gray-0);
  padding: 1rem;
`;

const MenuItem = styled(NavLink)`
  display: block;
  padding: 0.8rem;
  font-weight: 600;

  &:hover {
    background-color: var(--color-gray-200);
  }
`;

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isManager, logout, userName } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <StyledUserMenu ref={menuRef}>
      <StyledMenu
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <AiOutlineMenu />
        <Avatar />
      </StyledMenu>
      {isOpen && (
        <Menu>
          {isAuthenticated && isManager ? (
            <>
              <MenuItem to={`/profiles/${userName}`}>
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></AccountCircleIcon>
                Profile
              </MenuItem>
              <MenuItem to={`/profiles/${userName}/bookings`}>
                <CalendarMonthIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></CalendarMonthIcon>
                Bookings
              </MenuItem>
              <MenuItem to={`/profiles/${userName}/venues`}>
                <HouseIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></HouseIcon>
                Venues
              </MenuItem>
              <MenuItem to={"/venues/create"}>
                <HotelIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></HotelIcon>
                Create venue
              </MenuItem>
              <MenuItem to="/" onClick={logout}>
                <LogoutIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></LogoutIcon>
                Log Out
              </MenuItem>
            </>
          ) : isAuthenticated ? (
            <>
              <MenuItem to={`/profiles/${userName}`}>
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></AccountCircleIcon>
                Profile
              </MenuItem>
              <MenuItem to={`/profiles/${userName}/bookings`}>
                <CalendarMonthIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></CalendarMonthIcon>
                Bookings
              </MenuItem>
              <MenuItem to="/" onClick={logout}>
                <LogoutIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></LogoutIcon>
                Log Out
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem to="/auth/login">
                <LockOpenIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></LockOpenIcon>
                Log In
              </MenuItem>
              <MenuItem to="/auth/register">
                <CreateIcon
                  fontSize="large"
                  style={{ color: "green", padding: "0px 7px" }}
                ></CreateIcon>
                Sign up
              </MenuItem>
            </>
          )}
        </Menu>
      )}
    </StyledUserMenu>
  );
}

export default UserMenu;
