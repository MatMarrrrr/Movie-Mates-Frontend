import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import { useInfoModal } from "../contexts/InfoModalContext";
import {
  FriendsHeader,
  ProfileText,
  ProfileButton,
  AccountsContent,
  AccountContainer,
  AccountAvatar,
  AccountAvatarLetter,
  ProfileEmailText,
  ProfileNoResultsText,
} from "../styledComponents/ProfileComponents";

export const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [unfriendLoading, setUnfriendLoading] = useState(false);
  const { showModal } = useInfoModal();
  const apiURL = import.meta.env.VITE_API_URL;

  const fetchFriends = async () => {
    const storedToken = localStorage.getItem("token");

    try {
      const response = await axios.get(`${apiURL}/user/friends`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setFriends(response.data);
      setFriendsLoading(false);
    } catch (error) {
      console.error("Error fetching first result:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const unfriendUser = async (friendId, friendLogin) => {
    const storedToken = localStorage.getItem("token");

    try {
      setUnfriendLoading(true);
      await axios.delete(`${apiURL}/friends/${friendId}/unfriend`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setUnfriendLoading(false);
      showModal(`Successfully unfriended ${friendLogin}`);
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id !== friendId)
      );
    } catch (error) {
      console.error("Error unfriending the user:", error);
    }
  };

  return (
    <Wrapper>
      <FriendsHeader>Friends list</FriendsHeader>
      <AccountsContent>
        {friendsLoading && <Loader />}
        {!friendsLoading && friends.length === 0 && (
          <ProfileNoResultsText>No friends found</ProfileNoResultsText>
        )}
        {!friendsLoading &&
          friends.length > 0 &&
          friends.map((friend) => {
            const isAvatarImg = Boolean(friend.avatar_url);
            const avatarLetter = friend.login.charAt(0).toUpperCase();

            return (
              <AccountContainer key={friend.id}>
                {isAvatarImg ? (
                  <AccountAvatar src={friend.avatar_url} />
                ) : (
                  <AccountAvatarLetter>{avatarLetter}</AccountAvatarLetter>
                )}

                <ProfileText>{friend.login}</ProfileText>
                <ProfileEmailText>{friend.email}</ProfileEmailText>
                <ProfileButton
                  disabled={unfriendLoading}
                  onClick={() => {
                    unfriendUser(friend.id, friend.login);
                  }}
                >
                  Unfriend
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
