import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";
import FeedPage from "./components/FeedPage";
import NotificationPage from "./components/NotificationPage";
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
    async function fetchData() {
        const uid = cookies.get("user");

        if (!uid) return setIsLoggedIn(false);

        if (uid) {
            await new Promise((resolve) => {
                request
                    .get(request.getURL() + "/users/" + uid)
                    .then((user) => {
                        dispatch({
                            type: "SET_USER",
                            payload: user,
                        });
                        setIsLoggedIn(true);
                        resolve();
                    })
                    .catch(resolve);
            });
        }

        await new Promise((resolve) => {
            request
                .get(request.getURL() + "/users")
                .then((users) => {
                    dispatch({
                        type: "ADD_USERS",
                        payload: users,
                    });
                    resolve();
                })
                .catch(resolve);
        });
    }
    useEffect(async () => {
        fetchData();
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
                        <Route
                            path="/notifications"
                            element={<NotificationPage />}
                        />
                    </Routes>
                </BrowserRouter>
            )}

            {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
        </>
    );
}

export default App;
