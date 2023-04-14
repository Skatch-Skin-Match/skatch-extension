import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter Your Valid Email").required("Please Enter Your Email"),
  password: Yup.string().required("Please Enter Your Password"),
});
