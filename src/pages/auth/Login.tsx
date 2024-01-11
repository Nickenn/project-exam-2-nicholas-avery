import LoginForm from "../../features/authentication/Login";

import { Box } from "@mui/material";

function Login() {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <LoginForm />
    </Box>
  );
}

export default Login;
