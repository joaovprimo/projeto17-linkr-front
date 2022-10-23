import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../style/style.js";
import Main from "../pages/Main.js";
import SigninPage from "../pages/SigninPage.js";
import { useEffect, useState } from 'react';
import UserContext from '../context/UserContext.js';
import SignupPage from "../pages/SignupPage.js";
import Users from "../pages/Users.js";


export default function App() {
    const [tasks, setTasks] = useState();

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider value={{ tasks, setTasks }}>
                    <Routes>
                        <Route path="/" element={<SigninPage />} />
                        <Route path="/sign-up" element={<SignupPage />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/:user/:id" element={<Users/> }/>
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}