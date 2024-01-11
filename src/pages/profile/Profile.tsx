import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import image from "../../assets/venue-placeholder.svg";

import styled from "styled-components";

import { useAuth } from "../../context/authContext";
import { getProfile, updateProfile } from "../../services/profileApi";

import { Box, Button, Grid, Link, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface ProfileProps {
  avatar: string;
  email: string;
  name: string;
  venueManager: boolean;
  _count: {
    venues: number;
    bookings: number;
  };
}

const StyledAvatar = styled.img`
  max-height: 200px;
  max-width: 200px;

  @media only screen and (max-width: 700px) {
    height: 75px;
    width: 75px;
  }
`;

const StyledListItem = styled.li`
  list-style-type: none;
`;

function Profile() {
  const [profile, setProfile] = useState<ProfileProps | undefined>();
  const [loading, setLoading] = useState(true);
  const { authToken, userName, becomeManager } = useAuth();
  const { name } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      venueManager: false,
    },
  });

  localStorage.getItem("authToken");
  localStorage.getItem("userName");
  console.log(localStorage);

  const { handleSubmit } = form;
  const [serverErrors, setServerErrors] = useState("");

  const fetchData = async () => {
    const data = await getProfile(name, authToken);
    setProfile(data);
    setLoading(false);
  };

  const onSubmit = async () => {
    const data = await updateProfile(authToken, userName);

    if (data.errors) {
      setServerErrors(data.errors[0].message);
      navigate("/auth/login");
    } else {
      becomeManager(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !profile) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        sx={{
          marginTop: 8,
          height: 900,
          margin: 20,
        }}
      >
        <Link href="/auth/login">
          <Button variant="contained" size="large">
            Please log in to view your profile
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <>
      {" "}
      <Box
        sx={{
          marginTop: 8,
          height: 1000,
          margin: 20,
        }}
      >
        <Typography component="h1" variant="h2">
          {serverErrors}
        </Typography>
        <Grid>
          <Grid
            container
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent="center"
            gap={4}
          >
            <Grid item>
              <StyledAvatar
                src={profile.avatar ? profile.avatar : image}
                alt="Avatar"
              />
            </Grid>
            <Grid item>
              <Link underline="none" variant="body1">
                <NavLink to={`/profiles/${userName}/media`}>
                  <AccountBoxIcon
                    sx={{
                      padding: "0px 10px",
                    }}
                  ></AccountBoxIcon>
                  Edit avatar
                </NavLink>{" "}
              </Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h1" variant="h5">
                {profile.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="h1" variant="h5">
                {profile.venueManager ? "Manager" : "Guest"}
              </Typography>
              {!profile.venueManager && (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Become a manager
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs>
              <Typography component="h1" variant="h6" gutterBottom width={600}>
                Contact information:
              </Typography>
              <Typography variant="body2" gutterBottom width={600}>
                <StyledListItem>Email address: {profile.email}</StyledListItem>
                <StyledListItem>Phone number: </StyledListItem>
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item padding={2}>
              <Link href={`/profiles/${userName}/bookings`}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#e9b384",
                  }}
                >
                  My bookings
                </Button>
              </Link>
            </Grid>
            <Grid item padding={2}>
              <Link href={`/profiles/${userName}/venues`}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#e9b384",
                  }}
                >
                  My venues
                </Button>
              </Link>
            </Grid>
            <Grid item padding={2}>
              <Link href={"/venues/create"}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#e9b384",
                  }}
                >
                  Create venue
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item padding={2} alignItems={"center"}>
              <Typography variant="body2" gutterBottom width={300}>
                "Sed vel nulla ut nisl viverra accumsan in sit amet est. Ut
                rutrum quam eu blandit viverra. Donec mattis magna non purus
                mattis, eget scelerisque purus laoreet. Aliquam quis sem dapibus
                tortor malesuada tempus quis id elit."
              </Typography>
              <Typography variant="body2" gutterBottom width={300}>
                - Lorum, impsum.
              </Typography>
            </Grid>
            <Grid item padding={3}>
              <Typography variant="body2" gutterBottom width={300}>
                "Donec mattis magna non purus mattis, eget scelerisque purus
                laoreet. Aliquam quis sem dapibus tortor malesuada tempus quis
                id elit."
              </Typography>
              <Typography variant="body2" gutterBottom width={300}>
                - Lorum, impsum.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;
