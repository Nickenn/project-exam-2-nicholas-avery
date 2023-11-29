import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuth } from "../../context/authContext";
import { getProfile, updatProfile } from "../../services/profileApi";

import image from "../../../assets/venue-placeholder.svg";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

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
        <Typography component="h1" variant="h2">
          My profile
        </Typography>
      </Box>
    </>
  );
}

export default Profile;
