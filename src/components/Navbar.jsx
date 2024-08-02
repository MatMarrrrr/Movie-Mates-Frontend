import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.svg";
import { BurgerButton } from "./BurgerButton";

export const Navbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleBurgerMenuItemClick = () => {
    setIsBurgerOpen(false);
  };

  return (
    <Wrapper>
      <StyledLink to="/">
        <Logo src={logo} />
        <LogoText>Movie Mates</LogoText>
      </StyledLink>

      <NologinButtonsContainer>
        <SignInButton to="/login">Sign in</SignInButton>
        <GettingStartedButton to="/register">Get Started</GettingStartedButton>
      </NologinButtonsContainer>

      <BurgerButton onClick={handleBurgerClick} open={isBurgerOpen} />

      <NologinBurgerItems open={isBurgerOpen}>
        <BurgerMenuItem onClick={handleBurgerMenuItemClick} to="/login">Sign in</BurgerMenuItem>
        <BurgerMenuItem onClick={handleBurgerMenuItemClick} to="/register">Get Started</BurgerMenuItem>
      </NologinBurgerItems>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80px;
  width: 100vw;
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

const SignInButton = styled(Link)`
  color: #fff;
  background-color: transparent;
  padding: 10px 15px;
  font-weight: 500;
  font-size: 18px;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.03);
    background-color: #fff;
    color: #000;
    transition-duration: 0.3s;
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
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.03);
    transition-duration: 0.3s;
  }
`;

const NologinBurgerItems = styled.div`
  position: absolute;
  right: 0px;
  top: 80px;
  width: ${({ open }) => (open ? "50%" : "0px")};
  background-color: #0f0f0f;
  z-index: 2;
  display: none;
  flex-direction: column;
  overflow: hidden;
  transition-duration: 0.4s;
  white-space: nowrap;

  @media(max-width: 770px){
    display: flex;
  }
`;

const BurgerMenuItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 22px;
  font-size: 20px;

  &:hover {
    background-color: #2f2f2f;
  }
`;
