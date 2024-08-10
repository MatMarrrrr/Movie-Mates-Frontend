import React from 'react'
import { useUser } from "../contexts/UserContext";

export const MainPage = () => {
  const { user } = useUser();

  return (
    <div>{user.email} {user.login}</div>
  )
}
