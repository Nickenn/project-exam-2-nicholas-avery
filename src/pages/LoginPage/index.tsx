import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface IFormData {
  username: string;
  password: string;
}

function Login() {
  const schema = yup.object({
    username: yup
      .string()
      .required("Please enter username")
      .min(8, "Your username must have atleast 8 characters."),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Password must be atleast 8 characters."),
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(formData: IFormData) {
    console.log(formData);
    reset({ username: "", password: "" });
    setIsSubmit(true);
  }

  return (
    <main>
      <section>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <label htmlFor="username" placeholder="username"></label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            {...register("username")}
          ></input>
          <p>{errors.username?.message}</p>
          <label htmlFor="password" placeholder="password"></label>
          <input
            type="text"
            id="password"
            autoComplete="password"
            {...register("password")}
          ></input>
          <p>{errors.password?.message}</p>
          <Link to="../Home/index.tsx">
            <button type="submit">Login</button>
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Login;
