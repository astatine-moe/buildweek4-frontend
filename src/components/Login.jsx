import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../Utility/fetch";
import Cookies from "universal-cookie";
import LoginNav from "./LoginNav";

import "../css/Login.css";

const cookies = new Cookies();

const Login = (props) => {
    const [signup, setSignup] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [sUsername, setsUsername] = useState("");
    const [sPassword, setsPassword] = useState("");
    const [sEmail, setsEmail] = useState("");
    const [sFirstname, setsFirstname] = useState("");
    const [sSurname, setsSurname] = useState("");
    const [sJob, setsJob] = useState("");
    const [sLocation, setsLocation] = useState("");
    const [sAbout, setsAbout] = useState("");

    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const login = () => {
        request
            .post(request.getURL() + "/auth/login", {
                username,
                password,
            })
            .then((uid) => {
                request
                    .get(request.getURL() + "/users/" + uid)
                    .then((user) => {
                        dispatch({
                            type: "SET_USER",
                            payload: user,
                        });

                        cookies.set("user", uid);
                        props.setIsLoggedIn(true);
                    })
                    .catch(console.error);
            })
            .catch((data) => {
                setError("Invalid username or password");
            });
    };

    const runSignup = () => {
        request
            .post(request.getURL() + "/auth/signup", {
                username: sUsername,
                password: sPassword,
                email: sEmail,
                name: sFirstname,
                surname: sSurname,
                title: sJob,
                bio: sAbout,
                area: sLocation,
            })
            .then((user) => {
                dispatch({
                    type: "SET_USER",
                    payload: user,
                });

                cookies.set("user", user._id);
                props.setIsLoggedIn(true);
            })
            .catch((data) => {
                setError(`${data.statusText}`);
            });
    };

    return (
        <>
            <LoginNav />
            <Container className="login-div">
                <br />
                {error && <div className="alert alert-danger">{error}</div>}
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a
                            className={`nav-link ${signup ? "" : " active"}`}
                            onClick={(e) => {
                                setSignup(false);
                            }}
                        >
                            Login
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${signup ? " active" : ""}`}
                            onClick={(e) => {
                                setSignup(true);
                            }}
                        >
                            Signup
                        </a>
                    </li>
                </ul>
                <hr />
                {signup && (
                    <>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                runSignup();
                            }}
                        >
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Username
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Username"
                                        className="form-control"
                                        value={sUsername}
                                        onChange={(e) => {
                                            setsUsername(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        required
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        value={sPassword}
                                        onChange={(e) => {
                                            setsPassword(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={sEmail}
                                        onChange={(e) => {
                                            setsEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Town, Region, Country
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Town, Region, Country"
                                        className="form-control"
                                        value={sLocation}
                                        onChange={(e) => {
                                            setsLocation(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Name"
                                        className="form-control"
                                        value={sFirstname}
                                        onChange={(e) => {
                                            setsFirstname(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Surname
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Surname"
                                        className="form-control"
                                        value={sSurname}
                                        onChange={(e) => {
                                            setsSurname(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Job title
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Job title"
                                        className="form-control"
                                        value={sJob}
                                        onChange={(e) => {
                                            setsJob(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">About</label>
                                    <textarea
                                        required
                                        className="form-control"
                                        placeholder="About you..."
                                        value={sAbout}
                                        onChange={(e) => {
                                            setsAbout(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                            </div>
                            <hr />
                            <button className="btn btn-primary">Sign up</button>
                        </form>
                    </>
                )}

                {!signup && (
                    <>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                login();
                            }}
                        >
                            <div className="mb-3">
                                <label for="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label for="username" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                ></input>
                            </div>

                            <button className="btn btn-primary">Login</button>
                        </form>
                    </>
                )}
            </Container>
        </>
    );
};

export default Login;
