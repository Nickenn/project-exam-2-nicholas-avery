import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Input from "../../ui/Input";

import { userLogin } from "../../services/aoiAuth";
import { useAuth } from "../../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";

interface FormLoginProps {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm<FormLoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [serverErrors, setServerErrors] = useState("");

  async function onSubmit(formData: FormLoginProps) {
    const data = await userLogin(formData);
    console.log(data);

    if (data.errors) {
      setServerErrors(data.errors[0].message);
    } else {
      login(data);

      setTimeout(() => {
        navigate(`/src/pages/Calendar.tsx`);
      }, 1000);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Login</h2>
      <Input
        label="Email"
        id="email"
        type="email"
        register={register}
        error={errors.email?.message}
        pattern={{
          value: /^[\w\-.]+@(stud.)?noroff.no$/,
          message:
            "You must have a @noroff.no or @stud.noroff.no email to login.",
        }}
        required={{ value: true, message: "Please enter email address" }}
      />

      <Input
        label="Password"
        id="passwword"
        type="password"
        register={register}
        error={errors.password?.message}
        required={{ value: true, message: "Please enter your password" }}
        minLength={{
          value: 8,
          message: "Your password must be at least 8 characters",
        }}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
