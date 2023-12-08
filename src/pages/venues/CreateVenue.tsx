import { CreateVenueForm } from "../../features/venues/CreateVenueForm";
import { useAuth } from "../../context/authContext";
import LoginForm from "../../features/authentication/Login";

function CreateVenuePage() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <>{isAuthenticated ? <CreateVenueForm /> : <LoginForm />}</>;
    </div>
  );
}

export default CreateVenuePage;
