import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../style/style.js";
import Main from "../pages/Main.js";
import SigninPage from "../pages/SigninPage.js";
import { useState } from "react";
import UserContext from "../context/UserContext.js";
import SignupPage from "../pages/SignupPage.js";
import Trendpage from "./timeline/TrendPage.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [idPost, setIdPost] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          isOpened,
          setIsOpened,
          idPost,
          setIdPost,
          loading,
          setLoading,
        }}
      >
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/hashtag/:hashtag" element={<Trendpage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
