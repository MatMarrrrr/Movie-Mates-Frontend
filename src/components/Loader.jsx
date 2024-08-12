import React from "react";
import styled from "styled-components";

export const Loader = () => {
  return <LoaderCircle />;
};

const LoaderCircle = styled.div`
  border: 6px solid #FFF;
  border-top: 6px solid #360c7e;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: loader-spin 1.2s infinite linear;

  @keyframes loader-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
