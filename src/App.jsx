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

function App() {
  const { user, userLoading } = useUser();
  const [isMinimumLoadingTime, setIsMinimumLoadingTime] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinimumLoadingTime(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (userLoading || isMinimumLoadingTime) {
    return <PageLoader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <MainPage /> : <LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
