import React from "react";
import styled, { keyframes } from "styled-components";

export const PageLoader = () => {
  return (
    <LoaderContainer>
      <Loader>
        <LoaderCircle />
        <LoaderCircle />
        <LoaderCircle />
      </Loader>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0f0f0f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

const Loader = styled.div`
  display: flex;
  gap: 10px;
`;

const LoaderCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }
`;
