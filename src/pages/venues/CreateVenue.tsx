import LoginForm from "../../features/authentication/Login";
import { CreateVenueForm } from "../../features/venues/CreateVenueForm";
import { useAuth } from "../../context/authContext";

function CreateVenuePage() {
  return <CreateVenueForm />;
}

export default CreateVenuePage;
