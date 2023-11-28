import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Container from "../../ui/Container";

import { useAuth } from "../../context/authContext";
import { getProfile, updateUserProfile } from "../../services/profileApi";

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
  const { authToken, userName, isManager } = useAuth();
  const { name } = useParams();
  const form = useForm({
    defaultValues: {
      venueManager: false,
    },
  });

  const { handleSubmit } = form;
  const [error, setIsError] = useState("");

  const fetchData = async () => {
    const data = await getProfile(name, authToken);
    setProfile(data);
    setIsLoading(false);
  };

  const onSubmit = async () => {
    const data = await updateUserProfile(authToken, userName);

    if (data.error) {
      setIsError(data.error[0].message);
    } else {
      isManager(data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  return <div>User profile page</div>;
}

export default Profile;
