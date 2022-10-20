import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../style/style.js";
import Main from "./Main";

export default function App(){
    return(
        <>
        <GlobalStyle/>
        <BrowserRouter>
        <Routes>
        <Route path="/main" element={<Main/>}/>
        </Routes>
        </BrowserRouter>
        </>
    )
}