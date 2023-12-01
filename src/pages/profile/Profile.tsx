import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import image from "../../assets/venue-placeholder.svg";

import { useAuth } from "../../context/authContext";
import { getProfile, updateProfile } from "../../services/profileApi";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
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

function Profile() {
  const [profile, setProfile] = useState<ProfileProps>();
  const [loading, setLoading] = useState(true);
  const { authToken, userName, becomeManager } = useAuth();
  const { name } = useParams();

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
      toast.error(serverErrors);
    } else {
      becomeManager(data);
      toast.success("Congratulations! You are now a manager.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return (
    <>
      {" "}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          height: 1050,
          alignItems: "center",
        }}
      >
        <h2>Hi! i am {profile.name}</h2>

        <Grid container justifyContent="center">
          <Grid item>
            <Link underline="none" variant="body1">
              <NavLink to={`/profiles/${userName}/media`}>
                <AccountBoxIcon></AccountBoxIcon>Edit avatar
              </NavLink>{" "}
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography component="h1" variant="h5" gutterBottom width={600}>
              Contact information:
            </Typography>
            <Typography variant="body2" gutterBottom width={600}>
              <li>Email address: {profile.email}</li>
              <li>Phone number: </li>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography component="h1" variant="h5">
              My reveiws:
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" gutterBottom width={600}>
                "Sed vel nulla ut nisl viverra accumsan in sit amet est. Ut
                rutrum quam eu blandit viverra. Donec mattis magna non purus
                mattis, eget scelerisque purus laoreet. Aliquam quis sem dapibus
                tortor malesuada tempus quis id elit."
              </Typography>
              <i variant="body2" gutterBottom width={600}>
                - Lorum, impsum.
              </i>
            </Grid>
            <Grid item>
              <Typography variant="body2" gutterBottom width={600}>
                "Donec mattis magna non purus mattis, eget scelerisque purus
                laoreet. Aliquam quis sem dapibus tortor malesuada tempus quis
                id elit."
              </Typography>
              <i variant="body2" gutterBottom width={600}>
                - Lorum, impsum.
              </i>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <div>
              <span>My bookings: </span>
              <span>{profile._count?.bookings}</span>
            </div>
            {profile.venueManager && (
              <div>
                <span>Venues: </span>
                <span>{profile._count?.venues}</span>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;
