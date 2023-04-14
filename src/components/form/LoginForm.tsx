import { useLoginUserMutation } from "@/app/modules/auth/slices/authApiSlice";
import { Form, Formik, Field } from "formik";
import React, { useContext, useState } from "react";
import { loginSchema } from "../schema/LoginSchema";

import Button from "../common/Button";
import { AlertMessengerContext } from "../common/toast/AlertContextProvider";

const initialState = {
  email: "",
  password: "",
  loginType: "localLogin",
};
type LoginFormProps = {
  onClickLoginHandler: (e: any) => void;
  loading: boolean;
  isSetShowRegister: (arr: boolean) => void;
  isDisabled: boolean;
};
const LoginForm = (props: LoginFormProps) => {
  const { onClickLoginHandler } = props;

  const onSubmit = (e: any) => {
    // console.log(e);

    onClickLoginHandler(e);
  };

  //   };

  return (
    <>
      <Formik initialValues={initialState} validationSchema={loginSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          const { errors, touched, handleChange, handleSubmit, values } = formikProps;
          return (
            <div className="mt-4 w-full bg-white rounded-b-lg p-6 border-none">
              <Form onSubmit={handleSubmit}>
                <div className="relative">
                  <Field
                    type="text"
                    className="input-style"
                    placeholder="Email"
                    value={values.email}
                    name="email"
                    id="email"
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <p className="bottom-[-20px] error-msg">{errors.email}</p>
                  ) : null}
                </div>
                <div className="relative">
                  <Field
                    type="password"
                    className="input-style"
                    placeholder="Password"
                    value={values.password}
                    name="password"
                    id="password"
                    onChange={handleChange}
                  />
                  {errors.password && touched.password ? (
                    <p className="bottom-[-21px] error-msg">{errors.password}</p>
                  ) : null}
                </div>
                <Button
                  className={
                    props.isDisabled
                      ? "bg-[#333] btn-color cursor-not-allowed"
                      : "bg-[#333] btn-color"
                  }
                  title="Log In"
                  type="submit"
                  isLoading={props.loading}
                  isDisabled={props.isDisabled}
                />
                <p className="text-center text-xs text-gray-400 mt-4 mb-2">
                  Don&apos;t have an account
                </p>
                <Button
                  className={
                    props.isDisabled
                      ? "bg-grad btn-color cursor-not-allowed"
                      : "bg-transparent border-2 border-black/40 text-black btn-color"
                  }
                  type="button"
                  title="Sign Up"
                  onClick={() => {
                    props.isSetShowRegister(true);
                    // handleLogout();
                  }}
                  isDisabled={props.isDisabled}
                />
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;
