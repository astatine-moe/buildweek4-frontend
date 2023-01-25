import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../Utility/fetch";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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

    return (
        <Container>
            {error && <div className="alert alert-danger">{error}</div>}
            <h1>Totally legit</h1>
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
        </Container>
    );
};

export default Login;
