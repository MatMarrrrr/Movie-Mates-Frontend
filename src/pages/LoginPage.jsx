import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useFormik } from "formik";
import { loginSchema } from "../validationRules/LoginSchema";

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

export const LoginPage = () => {
  const [shownPassword, setShownPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const loginForm = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getFirstError = () => {
    if (loginForm.touched.identifier && loginForm.errors.identifier) {
      return loginForm.errors.identifier;
    }
    if (loginForm.touched.password && loginForm.errors.password) {
      return loginForm.errors.password;
    }
    return null;
  };

  useEffect(() => {
    const formError = getFirstError();
    setError(formError);
  }, [loginForm.touched, loginForm.errors]);

  return (
    <Wrapper>
      <Content data-aos="fade-up">
        <AuthForm onSubmit={loginForm.handleSubmit}>
          <AuthHeader>Sign in</AuthHeader>
          <AuthInput
            name="identifier"
            type="text"
            placeholder="Login or Email"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.identifier}
          />
          <PasswordInputContainer>
            <AuthInput
              name="password"
              type={shownPassword ? "text" : "password"}
              placeholder="Password"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
            />
            <ShowPasswordButton
              passwordShown={shownPassword}
              setPasswordVisibility={setShownPassword}
            />
          </PasswordInputContainer>
          <AuthError>{error}</AuthError>
          <AuthButton type="submit">Sign in</AuthButton>
        </AuthForm>
        <AuthOr />
        <GoogleButton />
      </Content>
    </Wrapper>
  );
};
