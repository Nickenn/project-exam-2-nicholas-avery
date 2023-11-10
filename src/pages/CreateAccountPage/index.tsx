import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormData {
  username: string;
  email: string;
  password: string;
}

function CreateAccount() {
  const schema = yup.object({
    username: yup
      .string()
      .required("Please enter username")
      .min(8, "Your username must have atleast 8 characters."),
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Email is required."),
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
    reset({ username: "", password: "", email: "" });
    setIsSubmit(true);
  }

  return (
    <main>
      <section>
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h2>Create a new account</h2>
            <label htmlFor="username" placeholder="username"></label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              {...register("username")}
            ></input>
            <p>{errors.username?.message}</p>
            <label htmlFor="email" placeholder="email"></label>
            <input
              type="text"
              id="email"
              autoComplete="email"
              {...register("email")}
            ></input>
            <p>{errors.email?.message}</p>
            <label htmlFor="password" placeholder="password"></label>
            <input
              type="text"
              id="password"
              autoComplete="password"
              {...register("password")}
            ></input>
            <p>{errors.password?.message}</p>
            {isSubmit && (
              <div>
                <p>
                  Your account has been created! Click here if you are not
                  redirected:{" "}
                  <Link to="">
                    <button>Login</button>
                  </Link>
                </p>
              </div>
            )}
            <button type="submit">Create account</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CreateAccount;
