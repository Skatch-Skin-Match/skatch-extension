import * as Yup from "yup";

export const PostSchema = Yup.object({
  content: Yup.string().required("Content is required"),
  // .max(10, "Message must be less than 240 character"),
  scheduledAt: Yup.date().required("Month & date is required"),
  // time: Yup.date().nullable().min(new Date(), "Time is passed").required("Time is required"),
  date: Yup.date().nullable().required("Date is required"),
  time: Yup.date()
    .nullable()
    .when("date", (date, schema) => {
      if (date == new Date() || date < new Date()) {
        return schema.required("Time is required").min(new Date(date), "Time is passed");
      }
      return schema.required("Time is required");
    }),
});

export const TopicSchema = Yup.object({
  topic: Yup.string().required("Topic is required"),
});

export const EditSchema = Yup.object({
  content: Yup.string().required("Post is required"),
  // time: Yup.date().nullable().min(new Date(), "Time is passed").required("Time is required"),
  date: Yup.date().nullable().required("Date is required"),
  time: Yup.date()
    .nullable()
    .when("date", (date, schema) => {
      if (date == new Date() || date < new Date()) {
        return schema.required("Time is required").min(new Date(date), "Time is passed");
      }
      return schema.required("Time is required");
    }),
});

export const DraftSchema = Yup.object({
  content: Yup.string().required("Post is required"),
  // time: Yup.date().nullable().min(new Date(), "Time is passed").required("Time is required"),
  date: Yup.date().nullable().required("Date is required"),
  time: Yup.date()
    .nullable()
    .when("date", (date, schema) => {
      if (date == new Date() || date < new Date()) {
        return schema.required("Time is required").min(new Date(date), "Time is passed");
      }
      return schema.required("Time is required");
    }),
});

export const TopicDraftSchema = Yup.object({
  name: Yup.string().required("Topic is required"),
});
