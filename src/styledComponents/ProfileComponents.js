import styled from "styled-components";

export const ProfileOption = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

export const ProfileItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const ProfileCenteredItem = styled.div`
  display: grid;
  justify-content: center;
  margin-top: ${({ $isMarginTop = false }) => ($isMarginTop ? "10px" : "0px")};
`;

export const ProfileText = styled.p`
  font-size: 18px;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 950px) {
    font-size: 16px;
  }

  @media (max-width: 950px) {
    font-size: 14px;
  }
`;

export const ProfileImg = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;

  @media (max-width: 950px) {
    height: 60px;
    width: 60px;
  }

  @media (max-width: 600px) {
    height: 50px;
    width: 50px;
  }
`;

export const ProfileTextImg = styled.div`
  color: #fff;
  height: 70px;
  width: 70px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5c27b6;
  border-radius: 50%;

  @media (max-width: 950px) {
    height: 60px;
    width: 60px;
  }

  @media (max-width: 600px) {
    height: 50px;
    width: 50px;
  }
`;

export const ProfileButton = styled.button`
  padding: 10px 20px;
  background-color: #5c27b6;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s;
  margin-left: auto;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  @media (max-width: 950px) {
    font-size: 15px;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: 20px;
  }
`;

export const ProfileButtonLoader = styled.img`
  height: 20px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ProfileInput = styled.input`
  padding: 7px 20px;
  font-size: 16px;
  border-radius: 10px;
  flex-grow: 1;
  min-width: 0;
  box-sizing: border-box;
  width: 100%;
`;

export const ProfileBackIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  transition: transform 0.3s;
  cursor: pointer;
  width: fit-content;

  &:hover {
    transform: scale(1.03);
  }
`;

export const ProfileBackIcon = styled.img`
  height: 40px;
`;

export const AccountsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;

  @media (max-width: 950px) {
    max-height: 550px;
    overflow-y: auto;
  }

  @media (max-width: 950px) {
    max-height: 350px;
  }
`;

export const AccountContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  align-items: center;
  box-sizing: border-box;
`;

export const AccountAvatar = styled.img`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
`;

export const AccountAvatarLetter = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
`;

export const ProfileEmailText = styled(ProfileText)`
  flex-grow: 1;
  width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const FriendsHeader = styled.h1`
  font-size: 24px;
  text-align: center;
`;

export const ProfileDateText = styled(ProfileText)`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const ProfileNoResultsText = styled(ProfileText)`
  text-align: center;
  color: #888;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto;
`;

export const AcceptButton = styled(ProfileButton)`
  background-color: #097409;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: 0;
  }
`;

export const DeclineButton = styled(ProfileButton)`
  background-color: #a40c0c;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: 0;
  }
`;
