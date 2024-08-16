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
} from "../styledComponents/ProfileComponents";
import { useUser } from "../contexts/UserContext";

export const InviteFriends = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sentRequests, setSentRequests] = useState("");
  const [loadingFirstResults, setLoadingFirstResults] = useState(true);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const { user } = useUser();
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

      return response.data;
    } catch (error) {
      console.error("Error fetching first result:", error);
    }
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
        console.log(response.data);
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

        const friends = await fetchFriends();
        console.log(friends);
        setSearchResults(
          response.data.filter(
            (userData) =>
              userData.id !== user.id &&
              !friends.some((friend) => friend.id === userData.id)
          )
        );
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

      const friends = await fetchFriends();

      setSearchResults(
        response.data.filter(
          (userData) =>
            userData.id !== user.id &&
            !friends.some((friend) => friend.id === userData.id)
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
        {loadingFirstResults && <Loader />}
        {!loadingFirstResults && loadingSearchResults && <Loader />}{" "}
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
                <ProfileEmailText>{user.email}</ProfileEmailText>
                <ProfileButton
                  disabled={isRequestSent}
                  onClick={() => handleInviteClick(user.id)}
                >
                  {isRequestSent ? "Invited" : "Invite"}
                </ProfileButton>
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
