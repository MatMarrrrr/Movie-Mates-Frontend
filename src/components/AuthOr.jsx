import React from "react";
import styled from "styled-components";
export const AuthOr = () => {
  return (
    <OrContainer>
      <OrLine></OrLine>
      <OrText>or</OrText>
      <OrLine></OrLine>
    </OrContainer>
  );
};

const OrContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const OrText = styled.p`
  font-size: 16px;
  color: #fff;
  margin: 0px 10px;
`;

const OrLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #fff;
  border-radius: 5px;
`;
