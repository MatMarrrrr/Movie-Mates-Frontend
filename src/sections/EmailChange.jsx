import React, { useState } from "react";
import styled from "styled-components";
import {
  ProfileItems,
  ProfileText,
  ProfileButton,
  ProfileInput,
  ProfileBackIcon,
  ProfileBackIconContainer,
  ProfileCenteredItem,
} from "../styledComponents/ProfileComponents";
import arrowBackWhite from "../assets/arrowBackWhite.svg";
import { useInfoModal } from "../contexts/InfoModalContext";
import { useUser } from "../contexts/UserContext";
import axios from "axios";

export const EmailChange = ({ setSection }) => {
  const [emailError, setEmailError] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const { showModal } = useInfoModal();
  const { user } = useUser();
  const apiURL = import.meta.env.VITE_API_URL;

  const handleBackClick = () => {
    setSection("AccountDetails");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailValue(email);

    if (email !== "" && !validateEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleChangeClick = async () => {
    if (emailValue === user.email) {
      showModal("The email is the same as the old email");
      return;
    }
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.patch(
        `${apiURL}/user/email`,
        {
          email: emailValue,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.data.success) {
        showModal("Email changed successfully");
        setEmailValue("");
      } else {
        setEmailError(response.data.message);
      }
    } catch (error) {
      showModal(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Wrapper>
      <ProfileBackIconContainer onClick={handleBackClick}>
        <ProfileBackIcon src={arrowBackWhite} />
        <ProfileText>Back</ProfileText>
      </ProfileBackIconContainer>
      <ProfileItems>
        <ProfileText>New Email</ProfileText>
        <ProfileInput
          type="text"
          value={emailValue}
          onChange={handleEmailChange}
        />
      </ProfileItems>
      {emailError !== "" && (
        <ProfileCenteredItem>
          <ErrorText>{emailError}</ErrorText>
        </ProfileCenteredItem>
      )}
      <ProfileCenteredItem $isMarginTop={true}>
        <ProfileButton
          disabled={emailError !== "" || emailValue == ""}
          onClick={handleChangeClick}
        >
          Change
        </ProfileButton>
      </ProfileCenteredItem>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 18px;
`;
