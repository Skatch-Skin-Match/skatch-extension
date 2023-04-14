import * as Yup from "yup";

export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Not valid email")
    .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "PLease add combination of @1aA for password")
    .required("Email cannot be left blank"),
});

export const confirmPasswordSchema = Yup.object().shape({
  otp: Yup.string().required("OTP cannot left blank"),
  newPassword: Yup.string()
    .min(8, "Your password is too short")
    .required("Please enter your password")

    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      `Please use strong password combination of @Aa1
        `,
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Your password doesn't match")
    .required("Confirm password cannot be left blank"),
});
