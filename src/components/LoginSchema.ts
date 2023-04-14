import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter Valid Email").required("Please Enter Your Email"),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
      "Please Use Strong Password Combination Of @Aa1",
    )
    .required("Please Enter Your Password"),
});
