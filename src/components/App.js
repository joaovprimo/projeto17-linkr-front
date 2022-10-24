import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../style/style.js";
import Main from "../pages/Main.js";
import SigninPage from "../pages/SigninPage.js";
import { useState } from "react";
import UserContext from "../context/UserContext.js";
import SignupPage from "../pages/SignupPage.js";
import Users from "../pages/Users.js";
import Search from "../pages/search.js";
import Trendpage from "./timeline/TrendPage.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [idPost, setIdPost] = useState();
  const [loading, setLoading] = useState(false);
  const [searchs, setSearchs] = useState(undefined);

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
          searchs,
          setSearchs
        }}
      >
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/main" element={<Main />} />
            <Route path="/hashtag/:hashtag" element={<Trendpage />} />
            <Route path="/user/:id" element={<Users/>}/>
            <Route path="/search" element={<Search/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
