import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuth } from "../../context/authContext";
import { getProfile, updateProfile } from "../../services/profileApi";

import image from "../../../assets/venue-placeholder.svg";

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
  const [loading, setIsLoading] = useState(true);
  const { authToken, userName, becomeManager } = useAuth();
  const { name } = useParams();
  const form = useForm({
    defaultValues: {
      venueManager: false,
    },
  });

  const { handleSubmit } = form;
  const [serverErrors, setServerErrors] = useState("");

  const fetchData = async () => {
    const data = await getProfile(name, authToken);
    setProfile(data);
    setIsLoading(false);
  };

  const onSubmit = async () => {
    const data = await updateUserProfile(authToken, userName);

    if (data.errors) {
      toast.error(data.error[0].message);
    } else {
      becomeManager(data);
      toast.success("You are now a venue manager.");
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
        <Typography component="h1" variant="h3">
          My profile
        </Typography>
        <h2>Hi! i am</h2>

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
              <li>Email address: </li>
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
                Sed vel nulla ut nisl viverra accumsan in sit amet est. Ut
                rutrum quam eu blandit viverra. Donec mattis magna non purus
                mattis, eget scelerisque purus laoreet. Aliquam quis sem dapibus
                tortor malesuada tempus quis id elit. Pellentesque commodo massa
                sed cursus accumsan. Ut consequat elementum neque quis bibendum.
                Proin hendrerit arcu ac blandit semper. Proin eget felis
                porttitor, interdum lectus in, cursus leo.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;
