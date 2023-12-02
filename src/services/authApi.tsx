import { BASE_API_URL } from "../utils/constants.tsx";

interface FormDataProps {
  name: string;
  email: string | number;
  password: string;
  avatar: string;
  manager: boolean;
}

interface FormDataLoginProps {
  email: string;
  password: string;
}

export async function registerUser(formData: FormDataProps) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      avatar: formData.avatar,
      manager: formData.manager,
    }),
  };

  const result = await fetch(`${BASE_API_URL}/auth/register`, options);

  if (!result.ok) throw Error("User registration failed.");

  const data = await result.json();

  return data;
}

export async function loginUser(formData: FormDataLoginProps) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  };

  const result = await fetch(`${BASE_API_URL}/auth/login`, options);

  if (!result.ok) throw Error("Login failed");

  const data = await result.json();

  return data;
}
