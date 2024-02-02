import React, { useEffect } from 'react';
import { SignOutButton, SignInButton, SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import backgroundImg from "./img/bg-01.png";

const Home = () => {
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndAutoLogin = async () => {
      const user = await openSignIn();
      if (user) {
        console.log("המשתמש התחבר:", user);
        // הפנייה לעמוד חדש בכניסה
        navigate('/CreateRoute');
      }
    };

    checkAndAutoLogin();
  }, [openSignIn, navigate]);

  const containerStyle = {
    background: `url(${backgroundImg}) center/cover no-repeat`,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#80cbc4", // הוספתי צבע רקע כמו שציינת
  };
  
  
  return (
    <div style={containerStyle}>
      <SignedOut>
        <SignInButton />
        <p></p>
      </SignedOut>
      <SignedIn>
        <SignOutButton onClick={() => navigate('/GoogleMaps')} />
        <p></p>
      </SignedIn>
    </div>
  );
}

export default Home;
