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

export const LoginPage = () => {
  const [shownPassword, setShownPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <Wrapper>
      <Content data-aos="fade-up">
        <AuthForm>
          <AuthHeader>Sign in</AuthHeader>
          <AuthInput type="text" placeholder="Login or Email" />
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
          <AuthButton type="submit">Sign in</AuthButton>
        </AuthForm>
        <AuthOr />
        <GoogleButton />
      </Content>
    </Wrapper>
  );
};
