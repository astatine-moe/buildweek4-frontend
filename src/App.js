import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";
import FeedPage from "./components/FeedPage";
import "./css/navbar.css";
import "./css/search.css";
import "./css/feedsidebar.css";
import "./css/leftsidebar.css";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import Cookies from "universal-cookie";
import request from "./Utility/fetch";
const cookies = new Cookies();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const logout = () => {
        cookies.remove("user");
        setIsLoggedIn(false);
    };
    useEffect(async () => {
        const uid = cookies.get("user");

        if (!uid) return setIsLoggedIn(false);

        if (uid) {
            setIsLoggedIn(true);

            request
                .get(request.getURL() + "/users/" + uid)
                .then((user) => {
                    dispatch({
                        type: "SET_USER",
                        payload: user,
                    });
                })
                .catch(console.error);
        }

        // const response = await fetch(
        //     "https://striveschool-api.herokuapp.com/api/profile/",
        //     {
        //         headers: {
        //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk5OGQ4MTU0ZjRhYTAwMTUxOTMwMjgiLCJpYXQiOjE2NzEwMDc2MTcsImV4cCI6MTY3MjIxNzIxN30.cSe4CwoajKqBlSxhZ9jxQtYaay9FYkPy74H9lnKOxXI`,
        //         },
        //     }
        // );
        // if (response.ok) {
        //     const data = await response.json();
        //     dispatch({
        //         type: "ADD_USERS",
        //         payload: data,
        //     });
        // }
        // const localResponse = await fetch(
        //     "https://striveschool-api.herokuapp.com/api/profile/me",
        //     {
        //         headers: {
        //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk5OGQ4MTU0ZjRhYTAwMTUxOTMwMjgiLCJpYXQiOjE2NzEwMDc2MTcsImV4cCI6MTY3MjIxNzIxN30.cSe4CwoajKqBlSxhZ9jxQtYaay9FYkPy74H9lnKOxXI`,
        //         },
        //     }
        // );
        // if (response.ok) {
        //     const data = await localResponse.json();
        //     dispatch({
        //         type: "SET_USER",
        //         payload: data,
        //     });
        // }
    }, []);
    return (
        <>
            {isLoggedIn && (
                <BrowserRouter>
                    <MyNavbar logout={logout} />
                    <Routes>
                        <Route path="/" element={<FeedPage />} />
                        <Route path="/in/:user_id" element={<ProfilePage />} />
                        <Route
                            path="/search/:search"
                            element={<SearchPage />}
                        />
                    </Routes>
                </BrowserRouter>
            )}

            {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
        </>
    );
}

export default App;
