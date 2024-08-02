import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Wrapper,
  Content,
  AuthForm,
  AuthHeader,
  AuthInput,
  PasswordInputContainer,
  AuthButton,
} from "../styledComponents/NologinComponents";
import { ShowPasswordButton } from "./../components/ShowPasswordButton";
import { AuthOr } from "./../components/AuthOr";
import { GoogleButton } from "../components/GoogleButton";

export const RegisterPage = () => {
  const [shownPassword, setShownPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <Wrapper>
      <Content data-aos="fade-up">
        <AuthForm>
          <AuthHeader>Register</AuthHeader>
          <AuthInput type="text" placeholder="Login" />
          <AuthInput type="text" placeholder="Email" />
          <PasswordInputContainer>
            <AuthInput
              type={shownPassword ? "text" : "password"}
              placeholder="Password"
            />
            <ShowPasswordButton
              passwordShown={shownPassword}
              setPasswordVisibility={setShownPassword}
            />
          </PasswordInputContainer>
          <AuthButton type="submit">Register</AuthButton>
        </AuthForm>
        <AuthOr />
        <GoogleButton />
      </Content>
    </Wrapper>
  );
};
