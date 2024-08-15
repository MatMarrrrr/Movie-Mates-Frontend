import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import {
  ProfileText,
  ProfileButton,
  ProfileInput,
} from "../styledComponents/ProfileComponents";

export const InviteFriends = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sentRequests, setSentRequests] = useState("");
  const [loadingFirstResults, setLoadingFirstResults] = useState(true);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const apiURL = import.meta.env.VITE_API_URL;

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const storedToken = localStorage.getItem("token");

      try {
        const response = await axios.get(`${apiURL}/friend-requests`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setSentRequests(response.data.sent_requests);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    const fetchFirstResult = async () => {
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
        setSearchResults(response.data);
        setLoadingFirstResults(false);
      } catch (error) {
        setLoadingFirstResults(false);
        console.error("Error fetching first result:", error);
      }
    };

    fetchFriendRequests().then(fetchFirstResult);
  }, []);

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
      setSearchResults(response.data);
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
      <Content>
        {loadingFirstResults && <Loader />}
        {!loadingFirstResults && loadingSearchResults && <Loader />}{" "}
        {!loadingFirstResults &&
          !loadingSearchResults &&
          searchResults.length === 0 && (
            <NoResultsText>No users found</NoResultsText>
          )}
        {!loadingFirstResults &&
          searchResults.length > 0 &&
          searchResults.map((user) => {
            const isRequestSent = sentRequests.some(
              (request) => request.recipient_id === user.id
            );

            const isAvatarImg = user.avatar_url !== null;
            const avatarLetter = user.login.charAt(0).toUpperCase();

            return (
              <AccountContainer key={user.id}>
                {isAvatarImg ? (
                  <AccountAvatar src={user.avatar_url} />
                ) : (
                  <AccountAvatarLetter>{avatarLetter}</AccountAvatarLetter>
                )}

                <ProfileText>{user.login}</ProfileText>
                <ProfileText>{user.email}</ProfileText>
                <ProfileButton
                  disabled={isRequestSent}
                  onClick={() => handleInviteClick(user.id)}
                >
                  {isRequestSent ? "Invited" : "Invite"}
                </ProfileButton>
              </AccountContainer>
            );
          })}
      </Content>
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const AccountContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  align-items: center;
  box-sizing: border-box;
`;

const AccountAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const AccountAvatarLetter = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
`;

const NoResultsText = styled(ProfileText)`
  text-align: center;
  color: #888;
`;
