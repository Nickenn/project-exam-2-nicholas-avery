import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import image from "../../assets/venue-placeholder.svg";

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
    fetchData();
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
          margin: 20,
        }}
      >
        <Grid container justifyContent="center">
          <Grid item>
            <Link underline="none" variant="body1">
              <NavLink to={`/profiles/${userName}/media`}>
                <AccountBoxIcon></AccountBoxIcon>Edit avatar
              </NavLink>{" "}
            </Link>
          </Grid>
        </Grid>
        <Typography component="h1" variant="h4">
          Hi I am
        </Typography>
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
          <Grid item>
            <Typography component="h1" variant="h6" gutterBottom width={600}>
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
            <Typography component="h1" variant="h6" margin={4}>
              Guest feedback:
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
              <Typography variant="body2" gutterBottom width={600}>
                - Lorum, impsum.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" gutterBottom width={600}>
                "Donec mattis magna non purus mattis, eget scelerisque purus
                laoreet. Aliquam quis sem dapibus tortor malesuada tempus quis
                id elit."
              </Typography>
              <Typography variant="body2" gutterBottom width={600}>
                - Lorum, impsum.
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <span>
                <Typography component="h1" variant="h6" margin={4}>
                  My bookings:
                </Typography>
              </span>
            </Grid>
            <Grid item>
              {profile.venueManager && (
                <span>
                  <Typography component="h1" variant="h6" margin={4}>
                    My Venues: {profile._count?.venues}
                  </Typography>
                </span>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Profile;
