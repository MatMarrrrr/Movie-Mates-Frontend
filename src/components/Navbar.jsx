import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.svg";
import dropdownIcon from "./../assets/dropdownIcon.svg";
import { BurgerButton } from "./BurgerButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export const Navbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const isAvatarImg = user ? user.avatar_url !== null : false;
  const avatarLetter = user ? user.login.charAt(0).toUpperCase() : "";

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleBurgerMenuItemClick = () => {
    setIsBurgerOpen(false);
  };

  const handleLogoutClick = () => {
    logoutUser();
    setIsDropdownOpen(false);
    navigate("/");
    setIsBurgerOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Wrapper>
      <StyledLink to="/">
        <Logo src={logo} />
        <LogoText>Movie Mates</LogoText>
      </StyledLink>

      {user ? (
        <>
          <LoginHeaderLinksContainer>
            <LoginHeaderLink
              to="/films"
              $isPageActive={location.pathname === "/films"}
            >
              Films
            </LoginHeaderLink>
            <LoginHeaderLink
              to="/tvseries"
              $isPageActive={location.pathname === "/tvseries"}
            >
              TV Series
            </LoginHeaderLink>
            <LoginHeaderLink
              to="/search"
              $isPageActive={location.pathname === "/search"}
            >
              Search
            </LoginHeaderLink>
          </LoginHeaderLinksContainer>

          <LoginButtonsContainer>
            <NicknameText>{user.login}</NicknameText>
            <ProfileContainer onClick={toggleDropdown}>
              {isAvatarImg ? (
                <ProfileImage src={user.avatar_url} />
              ) : (
                <ProfileLetter>{avatarLetter}</ProfileLetter>
              )}
              <ProfileDropdownIcon src={dropdownIcon} />
              <ProfileDropdown $dropdownOpen={isDropdownOpen}>
                <ProfileDropdownItem
                  to="/profile"
                  $isPageActive={location.pathname === "/profile"}
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  Profile
                </ProfileDropdownItem>
                <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
              </ProfileDropdown>
            </ProfileContainer>
          </LoginButtonsContainer>
        </>
      ) : (
        <NologinButtonsContainer>
          <SignInButton to="/login">Sign in</SignInButton>
          <GettingStartedButton to="/register">
            Get Started
          </GettingStartedButton>
        </NologinButtonsContainer>
      )}

      <BurgerButton onClick={handleBurgerClick} open={isBurgerOpen} />

      <BurgerItems open={isBurgerOpen}>
        {!user ? (
          <>
            <BurgerMenuItem
              $isPageActive={location.pathname === "/login"}
              onClick={handleBurgerMenuItemClick}
              to="/login"
            >
              Sign in
            </BurgerMenuItem>
            <BurgerMenuItem
              $isPageActive={location.pathname === "/register"}
              onClick={handleBurgerMenuItemClick}
              to="/register"
            >
              Get Started
            </BurgerMenuItem>
          </>
        ) : (
          <>
            <BurgerMenuItem
              $isPageActive={location.pathname === "/films"}
              onClick={handleBurgerMenuItemClick}
              to="/films"
            >
              Films
            </BurgerMenuItem>
            <BurgerMenuItem
              $isPageActive={location.pathname === "/tvseries"}
              onClick={handleBurgerMenuItemClick}
              to="/tvseries"
            >
              TV Series
            </BurgerMenuItem>
            <BurgerMenuItem
              $isPageActive={location.pathname === "/search"}
              onClick={handleBurgerMenuItemClick}
              to="/search"
            >
              Search
            </BurgerMenuItem>
            <BurgerMenuItem
              $isPageActive={location.pathname === "/profile"}
              onClick={handleBurgerMenuItemClick}
              to="/profile"
            >
              Profile
            </BurgerMenuItem>
            <BurgerMenuItem as="button" onClick={handleLogoutClick}>
              Logout
            </BurgerMenuItem>
          </>
        )}
      </BurgerItems>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80px;
  background-color: #0f0f0f;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid #2f2f2f;
  box-sizing: border-box;

  @media (max-width: 770px) {
    justify-content: space-between;
    padding-left: 20px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const LogoText = styled.h3`
  text-decoration: none;
  color: #fff;
  font-size: 22px;
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
`;

const NologinButtonsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 770px) {
    display: none;
  }
`;

const LoginButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 770px) {
    display: none;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const ProfileLetter = styled.div`
  color: #fff;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5c27b6;
  border-radius: 50%;
`;

const NicknameText = styled.p`
  color: #fff;
  font-size: 18px;
`;

const ProfileDropdown = styled.div`
  background-color: #333;
  position: absolute;
  top: 60px;
  right: 0;
  width: 150px;
  border-radius: 8px;
  transform: ${({ $dropdownOpen }) =>
    $dropdownOpen ? "scale(1)" : "scale(0)"};
  transform-origin: top right;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: ${({ $dropdownOpen }) => ($dropdownOpen ? 1 : 0)};

  & > *:first-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  & > *:last-child {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

const ProfileDropdownIcon = styled.img`
  height: 30px;
  width: 30px;
`;

const ProfileDropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: #fff;
  font-size: 18px;
  background-color: ${({ $isPageActive }) => ($isPageActive ? "#444" : "#333")};
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  display: block;
  padding: 13px 15px;
  background-color: #333;
  font-size: 18px;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const LoginHeaderLinksContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 770px) {
    display: none;
  }
`;

const LoginHeaderLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: ${({ $isPageActive }) => ($isPageActive ? "100%" : "0")};
    height: 3px;
    bottom: -2px;
    left: 0;
    background-color: #5c27b6;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

const SignInButton = styled(Link)`
  color: #fff;
  background-color: transparent;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 18px;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.03);
    background-color: #fff;
    color: #000;
  }
`;

const GettingStartedButton = styled(Link)`
  background-color: #fff;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 18px;
  color: #000;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const BurgerItems = styled.div`
  position: absolute;
  right: 0px;
  top: 80px;
  width: ${({ open }) => (open ? "50%" : "0px")};
  z-index: 2;
  display: none;
  flex-direction: column;
  overflow: hidden;
  transition-duration: 0.4s;
  white-space: nowrap;

  @media (max-width: 770px) {
    display: flex;
  }
`;

const BurgerMenuItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  background-color: ${({ $isPageActive }) =>
    $isPageActive ? "#2f2f2f" : "#0f0f0f"};
  padding: 22px;
  font-size: 20px;
  border: none;
  text-align: center;

  &:hover {
    background-color: #2f2f2f;
  }
`;
