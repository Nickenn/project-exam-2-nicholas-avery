import { BASE_API } from "../utils/constants.tsx";

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

  const result = await fetch(`${BASE_API}/auth/register`, options);
  const data = await result.json();

  return data;
}

export async function userLogin(formData: FormDataLoginProps) {
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

  const result = await fetch(`${BASE_API}/auth/login`, options);
  const data = await result.json();

  return data;
}
