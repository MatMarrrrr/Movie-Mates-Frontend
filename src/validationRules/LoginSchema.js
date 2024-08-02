import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  identifier: Yup.string()
    .required("Login or Email is required")
    .min(3, "Identifier must be at least 3 characters")
    .max(255, "Identifier must be less than 255 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
