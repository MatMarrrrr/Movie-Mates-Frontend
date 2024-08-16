import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/PageLoader";
import { MainPage } from "./pages/MainPage";
import { LandingPage } from "./pages/LandingPage";
import { Navbar } from "./components/Navbar";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { useUser } from "./contexts/UserContext";
import { GoogleCallback } from "./pages/GoogleCallback";
import axios from "axios";
import { FilmsPage } from "./pages/FilmsPage";
import { TvSeriesPage } from "./pages/TvSeriesPage";
import { SearchPage } from "./pages/SearchPage";
import { ProfilePage } from "./pages/ProfilePage";
import AuthRoute from "./routes/AuthRoute";

function App() {
  const { user, setUser, setUserToken, userLoading, setUserLoading } =
    useUser();
  const [isMinimumLoadingTime, setIsMinimumLoadingTime] = useState(true);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimumLoadingTime(false);
    }, 1000);

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUserToken(storedToken);
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
          setUserLoading(false);
        });
    } else {
      setUserLoading(false);
    }

    return () => clearTimeout(timer);
  }, [apiURL, setUser, setUserLoading]);

  if (userLoading || isMinimumLoadingTime) {
    return <PageLoader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <MainPage /> : <LandingPage />} />
        <Route
          path="/login"
          element={<AuthRoute component={LoginPage} isAuthRequired={false} />}
        />
        <Route
          path="/register"
          element={
            <AuthRoute component={RegisterPage} isAuthRequired={false} />
          }
        />
        <Route
          path="/films"
          element={<AuthRoute component={FilmsPage} isAuthRequired={true} />}
        />
        <Route
          path="/tvseries"
          element={<AuthRoute component={TvSeriesPage} isAuthRequired={true} />}
        />
        <Route
          path="/search"
          element={<AuthRoute component={SearchPage} isAuthRequired={true} />}
        />
        <Route
          path="/profile/*"
          element={<AuthRoute component={ProfilePage} isAuthRequired={true} />}
        />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
