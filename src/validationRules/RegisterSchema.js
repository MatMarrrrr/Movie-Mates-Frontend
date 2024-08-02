import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  login: Yup.string()
    .required("Login is required")
    .min(3, "Login must be at least 3 characters")
    .max(255, "Login cannot be longer than 255 characters")
    .matches(/^[^@]*$/, "Login cannot contain the '@' character"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .max(255, "Email cannot be longer than 255 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
