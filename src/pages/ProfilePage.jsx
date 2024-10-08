import React, { useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { AccountDetails } from "../sections/AccountDetails";
import { FriendsList } from "../sections/FriendsList";
import { InviteFriends } from "../sections/InviteFriends";
import { FriendRequests } from "../sections/FriendRequests";
import { PasswordChange } from "../sections/PasswordChange";
import { EmailChange } from "../sections/EmailChange";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const navigateToSection = (section) => {
    navigate(`/profile/${section}`);
  };

  return (
    <Wrapper>
      <Container data-aos="fade-up">
        <ProfileNavbar>
          <ProfileNavbarOption
            $isActive={location.pathname.includes("AccountDetails")}
            onClick={() => navigateToSection("AccountDetails")}
          >
            Account Details
          </ProfileNavbarOption>
          <ProfileNavbarOption
            $isActive={location.pathname.includes("FriendsList")}
            onClick={() => navigateToSection("FriendsList")}
          >
            Friends List
          </ProfileNavbarOption>
          <ProfileNavbarOption
            $isActive={location.pathname.includes("InviteFriends")}
            onClick={() => navigateToSection("InviteFriends")}
          >
            Invite Friends
          </ProfileNavbarOption>
          <ProfileNavbarOption
            $isActive={location.pathname.includes("FriendRequests")}
            onClick={() => navigateToSection("FriendRequests")}
          >
            Friend Requests
          </ProfileNavbarOption>
        </ProfileNavbar>
        <Content>
          <Routes>
            <Route path="AccountDetails" element={<AccountDetails />} />
            <Route path="FriendsList" element={<FriendsList />} />
            <Route path="InviteFriends" element={<InviteFriends />} />
            <Route path="FriendRequests" element={<FriendRequests />} />
            <Route path="PasswordChange" element={<PasswordChange />} />
            <Route path="EmailChange" element={<EmailChange />} />
            <Route path="*" element={<AccountDetails />} />
          </Routes>
        </Content>
      </Container>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  background-color: #080016;
  overflow: hidden;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

export const Container = styled.div`
  background-color: rgba(92, 39, 182, 0.4);
  display: flex;
  align-items: flex-start;
  border-radius: 15px;
  text-align: left;
  max-width: 1000px;
  width: 90%;
  box-sizing: border-box;
  height: 700px;
  overflow: hidden;

  @media (max-width: 950px) {
    flex-direction: column;
    min-height: 90%;
    padding-bottom: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-height: calc(100vh - 80px);
    border-radius: 0;
  }
`;

export const ProfileNavbar = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: #3c1a77;
  border-right: 2px solid #5c27b6;

  @media (max-width: 950px) {
    flex-direction: row;
    width: 100%;
    height: 50px;
  }

  @media (max-width: 600px) {
    height: auto;
    flex-direction: column;
    border-right: none;
    border-bottom: 1px solid #5c27b6;
  }
`;

export const ProfileNavbarOption = styled.div`
  padding: 15px 20px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${({ $isActive }) => ($isActive ? "#5c27b6" : "#3c1a77")};
  border-bottom: 1px solid #5c27b6;

  &:hover {
    background-color: #5c27b6;
  }

  @media (max-width: 950px) {
    width: 100%;
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #5c27b6;

    &:not(:last-child) {
      border-right: 1px solid #5c27b6;
    }
  }

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 40px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;

  @media (max-width: 950px) {
    padding: 20px;
    justify-content: start;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 15px;
    gap: 20px;
  }
`;
