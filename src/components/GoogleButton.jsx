import React from "react";
import styled from "styled-components";
import googleLogo from "./../assets/googleLogo.svg";

export const GoogleButton = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  const handleContinueWithGoogleClick = () => {
    window.location.href = `${apiURL}/auth/google`;
  };

  return (
    <GoogleButtonContainer onClick={handleContinueWithGoogleClick}>
      <GoogleButtonIcon src={googleLogo} />
      <GoogleButtonText>Continue with Google</GoogleButtonText>
    </GoogleButtonContainer>
  );
};

const GoogleButtonContainer = styled.div`
  border-radius: 15px;
  background: #fff;
  border: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  gap: 10px;
  margin-bottom: 5px;
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.03);
    transition-duration: 0.3s;
  }
`;

const GoogleButtonIcon = styled.img`
  height: 20px;
  width: 20px;
`;

const GoogleButtonText = styled.p`
  color: #909090;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
`;
