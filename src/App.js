import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/Navbar";
import "./navbar.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";
import FeedPage from "./components/FeedPage";
import "./search.css"
import "./feedsidebar.css";
import "./leftsidebar.css";

function App() {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(async () => {
        const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/profile/",
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk5OGQ4MTU0ZjRhYTAwMTUxOTMwMjgiLCJpYXQiOjE2NzEwMDc2MTcsImV4cCI6MTY3MjIxNzIxN30.cSe4CwoajKqBlSxhZ9jxQtYaay9FYkPy74H9lnKOxXI`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: "ADD_USERS",
                payload: data,
            });
        }

        const localResponse = await fetch(
            "https://striveschool-api.herokuapp.com/api/profile/me",
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk5OGQ4MTU0ZjRhYTAwMTUxOTMwMjgiLCJpYXQiOjE2NzEwMDc2MTcsImV4cCI6MTY3MjIxNzIxN30.cSe4CwoajKqBlSxhZ9jxQtYaay9FYkPy74H9lnKOxXI`,
                },
            }
        );

        if (response.ok) {
            const data = await localResponse.json();
            dispatch({
                type: "SET_USER",
                payload: data,
            });
        }
    }, []);
    return (
        <BrowserRouter>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/in/:user_id" element={<ProfilePage />} />
                <Route path="/search/:search" element={<SearchPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
