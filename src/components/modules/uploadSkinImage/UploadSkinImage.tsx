import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  useAddProfilePhotoMutation,
  //   useGetUserDataQuery,
  useLazyGetUserDataQuery,
} from "@/app/modules/auth/slices/authApiSlice";
import { profilePicture, updateUser } from "@/app/modules/auth/slices/authSlice";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { MdOutlineFileUpload } from "react-icons/md";
export const UploadSkinImage: any = (props: any) => {
  const [addProfilePic, { isLoading, isSuccess, isError }] = useAddProfilePhotoMutation();
  console.log(isError, "isError of profile pic");

  const { token, userData, openNewTab } = useAppSelector((state) => state.auth);

  const [file, setFile] = useState<any>();
  const [fileName, setFileName] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [showImageDetails, setImageDetails] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [trigger, { data }] = useLazyGetUserDataQuery();
  const dispatch = useAppDispatch();

  const handleChange = async (e: any) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setUploadedFile(e.target.files[0]);
      setImageDetails(true);
      await handleSubmit(e.target.files[0]).then((res) => {
        setTimeout(() => {
          window.close();
        }, 2000);
      });
    }
    //TODO: create form-data from 'file'
  };

  const handleButtonCliCk = () => {
    let a = window.location.href;

    window.open(a, "_blank");
  };

  const handleSubmit = async (file: any) => {
    const formData = new FormData();

    formData.append("profile_pic", file);

    await addProfilePic(formData)
      .unwrap()
      .then((res) => {
        if (res) {
          dispatch(profilePicture(res));
          setImageDetails(false);
          //   window.close();
        }
      })
      .catch((err) => {
        setErrorMessage(err.data.message);
      });
  };

  useEffect(() => {
    if (token) {
      trigger();
    }
  }, [token]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4 border-2 border-dashed border-gray-600/40 p-4">
        <>
          <>
            <h4 className="font-semibold text-base text-gray-600">
              {userData.profilePicture ? "Detected Skin" : "Detect Skin Tone"}
            </h4>
            {isError && <h4 className="font-semibold text-base text-gray-600">{errorMessage}</h4>}
            <img
              className="w-[120px] h-[120px] my-3"
              // src={imageDataUrl}
              src={
                file ||
                userData.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/599/599305.png"
              }
              // src="https://cdn-icons-png.flaticon.com/512/599/599305.png"
              alt="user"
            />
            <div className={`relative `}>
              <button
                className={
                  (isLoading ? "cursor-not-allowed " : " ") +
                  "bg-[#333] w-[140px] flex-center gap-2 px-3 py-2 text-xs text-white rounded-md"
                }
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ImSpinner8 className="text-center animate-spin text-base text-white" />
                ) : (
                  <>
                    <MdOutlineFileUpload className="text-[22px]"></MdOutlineFileUpload>{" "}
                    <span className="text-xs font-medium">Upload</span>
                  </>
                )}
              </button>

              <div
                className={`absolute top-[10px]  ${
                  token ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {!openNewTab ? (
                  <input
                    className="opacity-0 w-[128px] h-[34px]"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleChange}
                    // onClick={openNewTab}
                  />
                ) : (
                  <input
                    className="opacity-0 w-[128px] h-[34px]"
                    type="button"
                    //   accept="image/png, image/jpg, image/jpeg"
                    //   onChange={handleChange}
                    onClick={handleButtonCliCk}
                  />
                )}
              </div>
            </div>
          </>
        </>
      </div>
    </div>
  );
};

{
  /* <>
  <>
    <h4 className="font-semibold text-base text-gray-600">Upload Skin image</h4>
    <img
      className="w-[120px] h-[120px] my-3"
      src={"https://cdn-icons-png.flaticon.com/512/3792/3792702.png"}
      alt="user"
    />
    <div className="relative">
      <button
        className="bg-[#333] w-[140px] flex-center gap-2 px-3 py-2 text-xs text-white rounded-md"
        //   onClick={handleSubmit}
      >
        <MdOutlineFileUpload className="text-[22px]"></MdOutlineFileUpload>{" "}
        <span className="text-xs font-medium">Select Image</span>
      </button>
      <div className="absolute top-[10px] cursor-pointer">
        <input
          className="opacity-0 w-[128px] h-[34px]"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleChange}
        />
      </div>
    </div>
  </>
</>; */
}
