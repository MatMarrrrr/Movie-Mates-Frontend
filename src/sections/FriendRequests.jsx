import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Loader } from "../components/Loader";
import {
  ProfileText,
  ProfileButton,
  AccountsContent,
  AccountContainer,
  AccountAvatar,
  AccountAvatarLetter,
  ProfileDateText,
  ProfileNoResultsText,
} from "../styledComponents/ProfileComponents";

export const FriendRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [shownRequestType, setShownRequestType] = useState("received");
  const [requestsLoading, setRequestsLoading] = useState(true);

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const storedToken = localStorage.getItem("token");

      try {
        const response = await axios.get(`${apiURL}/friend-requests`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const received = response.data.received_requests;
        const sent = response.data.sent_requests;

        const filteredSentRequests = sent.filter(
          (sentRequest) =>
            !received.some(
              (receivedRequest) =>
                receivedRequest.userData.id === sentRequest.userData.id
            )
        );

        setReceivedRequests(received);
        setSentRequests(filteredSentRequests);
        setRequests(received);
        setRequestsLoading(false);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    fetchFriendRequests();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const changeRequestStatus = async (requestId, status) => {
    const storedToken = localStorage.getItem("token");

    try {
      const updatedRequests = receivedRequests.map((request) => {
        if (request.id === requestId) {
          request.status = status;
        }
        return request;
      });
      setReceivedRequests(updatedRequests);

      axios.patch(
        `${apiURL}/friend-requests/${requestId}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error while changing request status:", error);
    }
  };

  const changeShownRequestsType = () => {
    setRequests(() =>
      shownRequestType === "received" ? sentRequests : receivedRequests
    );
    setShownRequestType((prevType) =>
      prevType === "received" ? "sent" : "received"
    );
  };

  return (
    <Wrapper>
      <RequestsTypeContainer>
        <RequestTypeButton
          onClick={changeShownRequestsType}
          $isActive={shownRequestType == "received"}
        >
          Received
        </RequestTypeButton>
        <RequestTypeButton
          onClick={changeShownRequestsType}
          $isActive={shownRequestType == "sent"}
        >
          Sent
        </RequestTypeButton>
      </RequestsTypeContainer>
      <AccountsContent>
        {requestsLoading ? (
          <Loader />
        ) : (
          <>
            {requests.filter((request) => request.status === "pending").length >
            0 ? (
              requests
                .filter((request) => request.status === "pending")
                .map((request) => {
                  const user = request.userData;
                  const isAvatarImg = user.avatar_url !== null;
                  const avatarLetter = user.login.charAt(0).toUpperCase();
                  const formattedDate = formatDate(request.created_at);

                  return (
                    <AccountContainer key={user.id}>
                      {isAvatarImg ? (
                        <StyledAccountAvatar src={user.avatar_url} />
                      ) : (
                        <StyledAccountAvatarLetter>
                          {avatarLetter}
                        </StyledAccountAvatarLetter>
                      )}
                      <ProfileText>{user.login}</ProfileText>
                      <ProfileDateText>{formattedDate}</ProfileDateText>
                      <ButtonsContainer>
                        {shownRequestType === "received" ? (
                          <>
                            <AcceptButton
                              onClick={() => {
                                changeRequestStatus(request.id, "accepted");
                              }}
                            >
                              Accept
                            </AcceptButton>
                            <DeclineButton
                              onClick={() => {
                                changeRequestStatus(request.id, "declined");
                              }}
                            >
                              Decline
                            </DeclineButton>
                          </>
                        ) : (
                          <ProfileButton disabled={true}>Pending</ProfileButton>
                        )}
                      </ButtonsContainer>
                    </AccountContainer>
                  );
                })
            ) : (
              <ProfileNoResultsText>
                No {shownRequestType} friend requests
              </ProfileNoResultsText>
            )}
          </>
        )}
      </AccountsContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  width: 100%;
`;

const RequestsTypeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const RequestTypeButton = styled.button`
  border: none;
  color: #fff;
  padding: 10px 50px;
  border-radius: 20px;
  font-size: 16px;
  background-color: ${({ $isActive }) => ($isActive ? "#5c27b6" : "#3C1A77")};
  transition: transform 0.3s;
  transform: ${({ $isActive }) => ($isActive ? "scale(1.03)" : "scale(1)")};
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const AcceptButton = styled(ProfileButton)`
  background-color: #097409;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: 0;
  }
`;

const DeclineButton = styled(ProfileButton)`
  background-color: #a40c0c;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: 0;
  }
`;

const StyledAccountAvatar = styled(AccountAvatar)`
  @media (max-width: 600px) {
    display: none;
  }
`;

const StyledAccountAvatarLetter = styled(AccountAvatarLetter)`
  @media (max-width: 600px) {
    display: none;
  }
`;
