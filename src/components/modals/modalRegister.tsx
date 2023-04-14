import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/app/modules/auth/slices/authApiSlice";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Button, { IconButton } from "../common/Button";
import { AlertMessengerContext } from "../common/toast/AlertContextProvider";
import LoginForm from "../form/LoginForm";
import SignUpForm from "../form/SignUpForm";
import bcrypt from "bcryptjs";
import { useAppDispatch } from "@/app/hooks";
import { UseOutsideClick } from "../utils/UseOutsideClick";
import { MdClose } from "react-icons/md";

type ModalProps = {
  setShowModal: (e: boolean) => void;
  showModal: boolean;
};
const Modal = (props: ModalProps) => {
  const [loginUser, { isLoading: LoginRtkIsLoading }] = useLoginUserMutation();
  const [loadingLogin, setLoadingLogin] = useState(LoginRtkIsLoading);
  const [loadingSignup, setLoadingLoginSignup] = useState(LoginRtkIsLoading);
  const [isShowRegister, isSetShowRegister] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);
  //   const [loading, setLoading] = useState(isLoading);
  const onClickHandler = async (e: { email: string; password: string; loginType: string }) => {
    if (e.loginType === "localLogin") {
      setLoadingLogin(!LoginRtkIsLoading);
      setIsDisabled(!LoginRtkIsLoading);
      const hashedPassword = bcrypt.hashSync(e.password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
      loginUser({ email: e.email, password: hashedPassword })
        .unwrap()
        .then((res) => {
          props.setShowModal(false);
          addSuccessMessage({ message: "Login Successful" });
          setLoadingLogin(LoginRtkIsLoading);
          setIsDisabled(false);
        })
        .catch((error) => {
          if (error) {
            // console.log("");
            e.password = "";
            addErrorMessage({ message: "Either Email or Password is Incorrect!" });
            setLoadingLogin(false);
            setIsDisabled(false);
          }
        });
    }
    if (e.loginType === "localSignup") {
      // setLoadingLoginSignup(!LoginRtkIsLoading);
      // setIsDisabled(!LoginRtkIsLoading);
      const hashedPassword = bcrypt.hashSync(e.password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
      await registerUser({
        email: e.email,
        password: hashedPassword,
      })
        .unwrap()
        .then((res) => {
        //   console.log("modal opened", res);
          props.setShowModal(false);
          addSuccessMessage({ message: "User Register Successfully" });
          setLoadingLoginSignup(LoginRtkIsLoading);
          setIsDisabled(false);
        })
        .catch((error) => {
          if (error) {
            addErrorMessage({ message: "Email already exist", autoHideTimeout: 1000 * 60 });
            setLoadingLoginSignup(false);
            setIsDisabled(false);
          }
        });
    }
  };
  const showModal = props.showModal;

  return (
    <>
      <UseOutsideClick
        onOutsideClick={() => {
          props.setShowModal(!showModal);
        }}
      >
        <div className="view-modal">
          <div className="relative my-6 mx-auto w-[430px] select-none">
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                props.setShowModal(false);
              }}
            >
              <Link href="/">
                <MdClose className="text-base"></MdClose>
              </Link>
            </button>
            <div className="dark-card bg-grad">
              <div className="">
                <div className="flex-center flex-col w-full">
                  <p className="text-white font-semibold text-[24px] capitalize">
                    Welcome to skatch
                  </p>
                  <p className="text-white text-sm text-center">Please login to your account</p>
                </div>
                {!isShowRegister ? (
                  <LoginForm
                    isSetShowRegister={isSetShowRegister}
                    onClickLoginHandler={(e: {
                      email: string;
                      password: string;
                      loginType: string;
                    }) => onClickHandler(e)}
                    loading={loadingLogin}
                    isDisabled={isDisabled}
                  />
                ) : (
                  <SignUpForm
                    isSetShowRegister={isSetShowRegister}
                    onClickLoginHandler={(e: {
                      email: string;
                      password: string;
                      loginType: string;
                    }) => onClickHandler(e)}
                    loading={loadingSignup}
                    isDisabled={isDisabled}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-background-black"></div>
      </UseOutsideClick>
    </>
  );
};

export default Modal;
