import React, { useEffect, useState } from "react";
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
import axios from "axios";

export const PasswordChange = ({ setSection }) => {
  const [oldPasswordValue, setoldPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { showModal } = useInfoModal();
  const apiURL = import.meta.env.VITE_API_URL;

  const handleBackClick = () => {
    setSection("AccountDetails");
  };

  const handleChangeClick = async () => {
    if (newPasswordValue !== repeatPasswordValue) {
      setPasswordError("Passwords doesn't match");
      return;
    }

    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.patch(
        `${apiURL}/user/password`,
        {
          oldPassword: oldPasswordValue,
          newPassword: newPasswordValue,
          passwordRepeat: repeatPasswordValue,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.data.success) {
        showModal("Password changed successfully");
        setoldPasswordValue("");
        setNewPasswordValue("");
        setRepeatPasswordValue("");
      } else {
        setPasswordError(response.data.message);
      }
    } catch (error) {
      showModal(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (repeatPasswordValue == "") return;

    if (newPasswordValue !== repeatPasswordValue) {
      setPasswordError("Passwords doesnt match");
    } else if (newPasswordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  }, [newPasswordValue, repeatPasswordValue]);

  const isButtonDisabled =
    !oldPasswordValue ||
    !newPasswordValue ||
    !repeatPasswordValue ||
    passwordError !== "";

  return (
    <Wrapper>
      <ProfileBackIconContainer onClick={handleBackClick}>
        <ProfileBackIcon src={arrowBackWhite} />
        <ProfileText>Back</ProfileText>
      </ProfileBackIconContainer>
      <ProfileItems>
        <ProfileText>Old Password</ProfileText>
        <ProfileInput
          type="password"
          value={oldPasswordValue}
          onChange={(e) => setoldPasswordValue(e.target.value)}
        />
      </ProfileItems>
      <ProfileItems>
        <ProfileText>New Password</ProfileText>
        <ProfileInput
          type="password"
          value={newPasswordValue}
          onChange={(e) => setNewPasswordValue(e.target.value)}
        />
      </ProfileItems>
      <ProfileItems>
        <ProfileText>Repeat Password</ProfileText>
        <ProfileInput
          type="password"
          value={repeatPasswordValue}
          onChange={(e) => setRepeatPasswordValue(e.target.value)}
        />
      </ProfileItems>
      {passwordError !== "" && (
        <ProfileCenteredItem>
          <ErrorText>{passwordError}</ErrorText>
        </ProfileCenteredItem>
      )}
      <ProfileCenteredItem $isMarginTop={true}>
        <ProfileButton onClick={handleChangeClick} disabled={isButtonDisabled}>
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
