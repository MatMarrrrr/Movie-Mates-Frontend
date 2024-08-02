import React, { useState } from "react";
import styled from "styled-components";

export const BurgerButton = ({ open, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <Burger open={open} />
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media(max-width: 770px){
    display: flex;
  }
`;

const Burger = styled.div`
  width: 25px;
  height: 3px;
  background-color: ${({ open }) => (open ? "transparent" : "white")};
  position: relative;
  transition: all 0.3s ease-in-out;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: white;
    transition: all 0.3s ease-in-out;
  }

  &::before {
    transform: ${({ open }) => (open ? "rotate(45deg)" : "translateY(-8px)")};
  }

  &::after {
    transform: ${({ open }) => (open ? "rotate(-45deg)" : "translateY(8px)")};
  }
`;
