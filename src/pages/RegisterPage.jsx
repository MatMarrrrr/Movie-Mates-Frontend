import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useFormik } from "formik";
import { registerSchema } from "../validationRules/RegisterSchema";
import {
  Wrapper,
  Content,
  AuthForm,
  AuthHeader,
  AuthInput,
  PasswordInputContainer,
  AuthButton,
  AuthError,
} from "../styledComponents/NologinComponents";
import { ShowPasswordButton } from "./../components/ShowPasswordButton";
import { AuthOr } from "./../components/AuthOr";
import { GoogleButton } from "../components/GoogleButton";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [shownPassword, setShownPassword] = useState(false);
  const [error, setError] = useState(null);
  const { user, registerUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const registerForm = useFormik({
    initialValues: {
      login: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const result = await registerUser(values);

      if (!result.success) {
        setError(result.message);
      } else {
        setError(null);
        navigate("/");
      }
    },
  });

  const getFirstError = () => {
    if (registerForm.touched.login && registerForm.errors.login) {
      return registerForm.errors.login;
    }
    if (registerForm.touched.email && registerForm.errors.email) {
      return registerForm.errors.email;
    }
    if (registerForm.touched.identifier && registerForm.errors.password) {
      return registerForm.errors.password;
    }
    return null;
  };

  useEffect(() => {
    const formError = getFirstError();
    setError(formError);
  }, [registerForm.touched, registerForm.errors]);

  return (
    <Wrapper>
      <Content data-aos="fade-up">
        <AuthForm onSubmit={registerForm.handleSubmit}>
          <AuthHeader>Register</AuthHeader>
          <AuthInput
            name="login"
            type="text"
            placeholder="Login"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.login}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email"
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.email}
          />
          <PasswordInputContainer>
            <AuthInput
              name="password"
              type={shownPassword ? "text" : "password"}
              placeholder="Password"
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              value={registerForm.values.password}
            />
            <ShowPasswordButton
              passwordShown={shownPassword}
              setPasswordVisibility={setShownPassword}
            />
          </PasswordInputContainer>
          <AuthError>{error}</AuthError>
          <AuthButton type="submit">Register</AuthButton>
        </AuthForm>
        <AuthOr />
        <GoogleButton />
      </Content>
    </Wrapper>
  );
};
