import { Field, Form, Formik } from "formik";
import { signUpSchema } from "../schema/SignUpSchema";
import Button from "../common/Button";
import { UseOutsideClick } from "../utils/UseOutsideClick";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  loginType: "localSignup",
};
const SignUpForm = (props: any) => {
  const onSubmit = (e: any) => {
    props.onClickLoginHandler(e);
  };
  return (
    <>
      <Formik initialValues={initialState} validationSchema={signUpSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          const { errors, touched, handleChange, handleSubmit, values } = formikProps;
          return (
            <div className="mt-8 w-full bg-white rounded-b-lg p-6 border-none">
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
                  {errors.password?.length !== 97 && touched.password ? (
                    <p className="bottom-[-22px] error-msg">{errors.password}</p>
                  ) : null}
                  {errors.password?.length === 97 && touched.password && (
                    <p className="bottom-[-33px] error-msg">{errors.password}</p>
                  )}
                </div>
                <div className="relative">
                  <Field
                    type="password"
                    className="input-style"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                  />

                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="bottom-[-22px] error-msg">{errors.confirmPassword}</p>
                  )}
                </div>
                <div className="w-full">
                  <div className="mb-0 text-white">
                    <div className="flex flex-col w-full">
                      <p className="text-black font-semibold text-center text-xs mb-2">
                        By signing up I agree to{" "}
                        <button className="text-xs underline text-blue-600 cursor-pointer">
                          terms and conditions.
                        </button>
                      </p>
                      <Button
                        className={
                          props.isDisabled
                            ? "bg-[#333] btn-color cursor-not-allowed"
                            : "bg-[#333] btn-color"
                        }
                        title="Sign Up"
                        type="button"
                        isLoading={props.loading}
                        isDisabled={props.isDisabled}
                      />
                    </div>
                    <div className="flex-center flex-col w-full">
                      <p className="text-center text-xs text-[#333] mt-4 mb-2">
                        Already have an account ?
                      </p>
                      <Button
                        className={
                          props.isDisabled
                            ? "bg-grad btn-color cursor-not-allowed"
                            : "bg-transparent border-2 border-black/40 text-black btn-color"
                        }
                        type="button"
                        title="Log In"
                        onClick={() => {
                          props.isSetShowRegister(false);
                          // handleLogout();
                        }}
                        isDisabled={props.isDisabled}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};
export default SignUpForm;
