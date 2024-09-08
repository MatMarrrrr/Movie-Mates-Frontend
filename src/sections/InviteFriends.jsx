import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import {
  ProfileText,
  ProfileButton,
  ProfileInput,
  AccountsContent,
  AccountContainer,
  AccountAvatar,
  AccountAvatarLetter,
  ProfileEmailText,
  ProfileNoResultsText,
  ButtonsContainer,
  AcceptButton,
  DeclineButton,
} from "../styledComponents/ProfileComponents";

export const InviteFriends = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loadingFirstResults, setLoadingFirstResults] = useState(true);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL;

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchFriends = async () => {
    const storedToken = localStorage.getItem("token");

    try {
      const response = await axios.get(`${apiURL}/user/friends`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setFriends(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching friends:", error);
      return [];
    }
  };

  const fetchFriendRequests = async () => {
    const storedToken = localStorage.getItem("token");

    try {
      const response = await axios.get(`${apiURL}/friend-requests`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        params: {
          status: "pending",
        },
      });
      setSentRequests(response.data.sent_requests);
      setReceivedRequests(response.data.received_requests);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const fetchFirstResult = async (currentFriends) => {
    const storedToken = localStorage.getItem("token");

    try {
      const response = await axios.get(`${apiURL}/user/all`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        params: {
          limit: 5,
        },
      });

      setSearchResults(
        response.data.filter(
          (userData) =>
            !currentFriends.some((friend) => friend.id === userData.id)
        )
      );
    } catch (error) {
      console.error("Error fetching first result:", error);
    } finally {
      setLoadingFirstResults(false);
    }
  };

  const handleSearchClick = async () => {
    const storedToken = localStorage.getItem("token");
    setSearchResults([]);
    setLoadingSearchResults(true);

    try {
      const response = await axios.get(`${apiURL}/user/search`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        params: {
          query: query,
        },
      });

      setSearchResults(
        response.data.filter(
          (userData) => !friends.some((friend) => friend.id === userData.id)
        )
      );
      setLoadingSearchResults(false);
    } catch (error) {
      setLoadingSearchResults(false);
      console.error("An error occurred while searching for users:", error);
    }
  };

  const handleInviteClick = (recipientId) => {
    const storedToken = localStorage.getItem("token");

    setSentRequests((prevRequests) => [
      ...prevRequests,
      { recipient_id: recipientId },
    ]);

    axios
      .post(
        `${apiURL}/friend-requests`,
        { recipient_id: recipientId },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .catch((error) => {
        console.error("Failed to send friend request:", error);
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

  const handleAcceptClick = async (requestId, senderId) => {
    try {
      await changeRequestStatus(requestId, "accepted");

      setReceivedRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );

      setSearchResults((prevResults) =>
        prevResults.filter((user) => user.id !== senderId)
      );
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeclineClick = async (requestId, senderId) => {
    try {
      await changeRequestStatus(requestId, "declined");
      setReceivedRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: "declined" }
            : request
        )
      );

      setSentRequests((prevRequests) =>
        prevRequests.filter((request) => request.recipient_id !== senderId)
      );
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentFriends = await fetchFriends();
      await fetchFriendRequests();
      await fetchFirstResult(currentFriends);
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <SearchContainer>
        <FullWidthProfileInput
          value={query}
          onChange={handleQueryChange}
          placeholder="Login/Email"
        />
        <ProfileButton disabled={query === ""} onClick={handleSearchClick}>
          Search
        </ProfileButton>
      </SearchContainer>
      <AccountsContent>
        {(loadingFirstResults || loadingSearchResults) && <Loader />}

        {!loadingFirstResults &&
          !loadingSearchResults &&
          searchResults.length === 0 && (
            <ProfileNoResultsText>No users found</ProfileNoResultsText>
          )}

        {!loadingFirstResults &&
          searchResults.length > 0 &&
          searchResults.map((user) => {
            const isRequestSent = sentRequests.some(
              (request) => request.recipient_id === user.id
            );

            const pendingRequest = receivedRequests.find(
              (request) =>
                request.sender_id === user.id && request.status === "pending"
            );

            const isAvatarImg = Boolean(user.avatar_url);
            const avatarLetter = user.login.charAt(0).toUpperCase();

            return (
              <AccountContainer key={user.id}>
                {isAvatarImg ? (
                  <AccountAvatar src={user.avatar_url} />
                ) : (
                  <AccountAvatarLetter>{avatarLetter}</AccountAvatarLetter>
                )}

                <ProfileText>{user.login}</ProfileText>
                <ProfileEmailText>{user.email}</ProfileEmailText>
                {!pendingRequest ? (
                  <ProfileButton
                    disabled={isRequestSent}
                    onClick={() => handleInviteClick(user.id)}
                  >
                    {isRequestSent ? "Invited" : "Invite"}
                  </ProfileButton>
                ) : (
                  <ButtonsContainer>
                    <AcceptButton
                      onClick={() =>
                        handleAcceptClick(pendingRequest.id, user.id)
                      }
                    >
                      Accept
                    </AcceptButton>
                    <DeclineButton
                      onClick={() =>
                        handleDeclineClick(pendingRequest.id, user.id)
                      }
                    >
                      Decline
                    </DeclineButton>
                  </ButtonsContainer>
                )}
              </AccountContainer>
            );
          })}
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

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const FullWidthProfileInput = styled(ProfileInput)`
  flex-grow: 1;
  width: auto;

  @media (max-width: 600px) {
    flex-grow: 0;
  }
`;
