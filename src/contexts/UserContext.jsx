import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [userLoading, setUserLoading] = useState(true);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios
        .get(`${apiURL}/user`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setUser(response.data);
          } else {
            localStorage.removeItem("token");
          }
        })
        .finally(() => setUserLoading(false));
    } else {
      setUserLoading(false);
    }
  }, []);

  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${apiURL}/login`, data);
      localStorage.setItem("token", response.data.token);
      console.log(response);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${apiURL}/register`, data);
      localStorage.setItem("token", response.data.token);
      console.log(response);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };


  return (
    <UserContext.Provider
      value={{ user, userLoading, loginUser, registerUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
