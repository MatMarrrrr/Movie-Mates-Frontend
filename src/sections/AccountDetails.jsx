import React, { useState, useRef } from "react";
import {
  ProfileOption,
  ProfileItems,
  ProfileText,
  ProfileImg,
  ProfileTextImg,
  ProfileButton,
  ProfileButtonLoader,
  FileInput,
  ProfileInput,
} from "../styledComponents/ProfileComponents";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useInfoModal } from "../contexts/InfoModalContext";
import buttonLoader from "../assets/buttonLoader.svg";

export const AccountDetails = ({ setSection }) => {
  const { user, setUser } = useUser();
  const { showModal } = useInfoModal();
  const fileInputRef = useRef(null);
  const apiURL = import.meta.env.VITE_API_URL;
  const [loginValue, setloginValue] = useState(user.login);
  const [loginChange, setLoginChange] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [loginChangeLoading, setLoginChangeLoading] = useState(false);

  const isAvatarImg = user.avatar_url !== null;
  const avatarLetter = user.login.charAt(0).toUpperCase();

  const handleAvatarFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await handleAvatarUpload(file);
    }
  };

  const handleAvatarUpload = async (file) => {
    if (file) {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.post(
          `${apiURL}/imgur/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        const avatarUrl = response.data.link;

        await axios.patch(
          `${apiURL}/user/avatar`,
          { avatar_url: avatarUrl },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        setUser((prevUser) => ({
          ...prevUser,
          avatar_url: avatarUrl,
        }));
        setAvatarLoading(false);
      } catch (error) {
        setAvatarLoading(false);
        showModal(
          `Error uploading file: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const handleAvatarChangeClick = () => {
    if (avatarLoading) return;
    fileInputRef.current.click();
  };

  const handleLoginChangeClick = async () => {
    if (!loginChange) {
      setLoginChange(!loginChange);
    } else {
      handleLoginUpdate();
    }
  };

  const handleLoginInputChange = (e) => {
    setloginValue(e.target.value);
  };

  const handleLoginUpdate = async () => {
    if(loginValue === user.login){
      setLoginChange(false);
      return;
    }
    setLoginChangeLoading(true);
    const storedToken = localStorage.getItem("token");
    try {
      await axios.patch(
        `${apiURL}/user/login`,
        { login: loginValue },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        login: loginValue,
      }));
      setLoginChange(false);
    } catch (error) {
      showModal(error.response?.data?.message);
    } finally {
      setLoginChangeLoading(false);
    }
  };

  const handleEmailChangeClick = () => {
    setSection("EmailChange");
  };

  const handlePasswordChangeClick = () => {
    setSection("PasswordChange");
  };

  return (
    <>
      <ProfileOption>
        <ProfileItems>
          <ProfileText>Profile Picture:</ProfileText>
          {isAvatarImg ? (
            <ProfileImg src={user.avatar_url} />
          ) : (
            <ProfileTextImg>{avatarLetter}</ProfileTextImg>
          )}
        </ProfileItems>
        <ProfileButton onClick={handleAvatarChangeClick}>
          {avatarLoading ? "Uploading" : "Upload"}
          {avatarLoading && <ProfileButtonLoader src={buttonLoader} />}
        </ProfileButton>
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarFileChange}
        />
      </ProfileOption>
      <ProfileOption>
        <ProfileItems>
          <ProfileText>Login:</ProfileText>
          {!loginChange ? (
            <ProfileText>{user.login}</ProfileText>
          ) : (
            <ProfileInput
              type="text"
              value={loginValue}
              onChange={handleLoginInputChange}
            />
          )}
        </ProfileItems>
        <ProfileButton disabled={loginValue === ""} onClick={handleLoginChangeClick}>
          {!loginChange ? "Change" : "Save"}
          {loginChangeLoading && <ProfileButtonLoader src={buttonLoader} />}
        </ProfileButton>
      </ProfileOption>
      <ProfileOption>
        <ProfileItems>
          <ProfileText>Email:</ProfileText>
          <ProfileText>{user.email}</ProfileText>
        </ProfileItems>
        <ProfileButton onClick={handleEmailChangeClick}>Change</ProfileButton>
      </ProfileOption>
      <ProfileOption>
        <ProfileItems>
          <ProfileText>Password</ProfileText>
        </ProfileItems>
        <ProfileButton onClick={handlePasswordChangeClick}>
          Change
        </ProfileButton>
      </ProfileOption>
    </>
  );
};
