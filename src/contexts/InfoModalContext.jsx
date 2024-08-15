import React, { createContext, useState, useContext } from "react";
import styled from "styled-components";
import { ProfileButton } from "../styledComponents/ProfileComponents";
const InfoModalContext = createContext();

export const InfoModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <InfoModalContext.Provider value={{ showModal }}>
      {children}
      {modalContent && (
        <ModalOverlay>
          <ModalContent>
            <ModalText>{modalContent}</ModalText>
            <ProfileButton onClick={closeModal}>OK</ProfileButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </InfoModalContext.Provider>
  );
};

export const useInfoModal = () => {
  const context = useContext(InfoModalContext);

  if (context === undefined) {
    throw new Error("useInfoModal must be used within a InfoModalProvider");
  }

  return context;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalText = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
`;
