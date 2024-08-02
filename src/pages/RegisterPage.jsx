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

export const RegisterPage = () => {
  const [shownPassword, setShownPassword] = useState(false);
  const [error, setError] = useState(null);

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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const getFirstError = () => {
    if (registerForm.touched.identifier && registerForm.errors.login) {
      return registerForm.errors.login;
    }
    if (registerForm.touched.password && registerForm.errors.email) {
      return registerForm.errors.email;
    }
    if (registerForm.touched.identifier && registerForm.errors.password) {
      return registerForm.errors.password;
    }
    return null;
  };

  useEffect(() => {
    const formError = getFirstError(registerForm.errors, registerForm.touched);
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
