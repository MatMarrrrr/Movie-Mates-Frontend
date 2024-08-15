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
  min-width: 100px;
`;

export const ProfileImg = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
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

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
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
