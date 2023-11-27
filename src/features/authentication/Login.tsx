import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Input from "../../ui/Input";

interface FormProps {
  email: string;
  password: string | number;
}

function LoginForm() {
  const form = useForm<FormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: FormProps) => {
    console.log("data", data);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
