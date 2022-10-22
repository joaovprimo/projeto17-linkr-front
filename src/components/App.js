import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../style/style.js";
import Main from "../pages/Main.js";
import SigninPage from "../pages/SigninPage.js";
import { useEffect, useState } from 'react';
import UserContext from '../context/UserContext.js';
import SignupPage from "../pages/SignupPage.js";


export default function App() {
    const [tasks, setTasks] = useState();
    const [user, setUser] = useState("");

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider value={{ tasks, setTasks,user, setUser }}>
                    <Routes>
                        <Route path="/" element={<SigninPage />} />
                        <Route path="/sign-up" element={<SignupPage />} />
                        <Route path="/main" element={<Main />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}