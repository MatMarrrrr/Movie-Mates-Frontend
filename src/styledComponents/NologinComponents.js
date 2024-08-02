import cinemaBackground from "./../assets/cinemaBackground.svg";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-image: url(${cinemaBackground});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
  text-align: center;
  max-width: 600px;
  width: 90%;
  box-sizing: border-box;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const AuthHeader = styled.h1`
  color: #fff;
`;

export const AuthInput = styled.input`
  width: 100%;
  border-radius: 10px;
  color: #000;
  font-size: 18px;
  max-width: 450px;
  font-weight: 400;
  border: none;
  padding: 7px 20px;
  box-sizing: border-box;

  @media(max-width: 770px){
    font-size: 22px;
  }
`;

export const PasswordInputContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  max-width: 450px;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
`;

export const AuthButton = styled.button`
  padding: 10px 40px;
  border-radius: 20px;
  font-size: 18px;
  background-color: #474141;
  color: #fff;
  border: none;
  transition-duration: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    transition-duration: 0.3s;
  }

  @media(max-width: 770px){
    font-size: 20px;
  }
`;
