import { CreateVenueForm } from "../../features/venues/CreateVenueForm";
import { useAuth } from "../../context/authContext";
import LoginForm from "../../features/authentication/Login";

import { Box } from "@mui/material";

function CreateVenuePage() {
  const { isAuthenticated } = useAuth();
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <>{isAuthenticated ? <CreateVenueForm /> : <LoginForm />}</>
    </Box>
  );
}

export default CreateVenuePage;
