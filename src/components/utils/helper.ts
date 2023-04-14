// Month / Day / Year(i.e.August, 12 2022)
// Month / Year(i.e.August 2022)
// Month / Day(i.e.August, 12)

import { useUpdateConfigMutation } from "@/app/modules/auth/slices/authApiSlice";
import { UpdateApiRequest, User } from "@/app/modules/auth/slices/type";
import axios from "axios";

const allImages: any = [];

// Day of Week / Month / Day / Year((i.e.Tuesday August, 12 2022)
export const createDate = (dateType: number) => {
  const today = new Date();
  if (dateType == 1) {
    // console.log();
    return today
      .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      .toString();
  }
  if (dateType == 2) {
    return today.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toString();
  }
  if (dateType == 3) {
    return today.toLocaleDateString("en-US", { month: "long", day: "numeric" }).toString();
  }
  if (dateType == 4) {
    return today
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toString();
  }
  return today.toString();
};

export const generateUpdatedConfig = (oldObj: any, key: string, data: any): UpdateApiRequest => {
  //   let newObj = oldObj;
  const newConfigObj = { ...oldObj.config };
  newConfigObj[key] = data;
  oldObj.config = newConfigObj;
  return oldObj;
};

