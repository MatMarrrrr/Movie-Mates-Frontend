import React from "react";
import eyeIconGray from "./../assets/eyeIconGray.svg";
import eyeIconBlack from "./../assets/eyeIconBlack.svg";

import styled from "styled-components";

export const ShowPasswordButton = ({
  passwordShown,
  setPasswordVisibility,
}) => {
  return (
    <EyeButton
      src={passwordShown ? eyeIconBlack : eyeIconGray}
      alt="Show password button"
      onClick={() => {
        setPasswordVisibility(!passwordShown);
      }}
    />
  );
};
const EyeButton = styled.img`
  height: 25px;
  width: 25px;
  position: absolute;
  right: 8px;
  cursor: pointer;
  filter: grayscale(50%);

  &:hover {
    filter: grayscale(0%);
  }
`;
