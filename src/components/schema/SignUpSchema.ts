import * as Yup from "yup";

export const signUpSchema = Yup.object({
  email: Yup.string().email("Enter Valid Email").required("Please Enter Your Email"),
  password: Yup.string()
    .required("Please Enter Your Password")
    .min(
      8,
      "Password should be atleast 8 characters & include at least 1 letter, number and special character",
    )
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character")
    .required("Please enter your password"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Your password doesn't match")
    .required("Confirm password cannot be left blank"),
});
