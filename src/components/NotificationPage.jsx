import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import {
    BiLike,
    BiCommentDetail,
    BiRepost,
    BiSend,
    BiPencil,
    BiTrash,
} from "react-icons/bi";
import CommentComp from "./CommentComp";
import { BsX } from "react-icons/bs";
import {
    Row,
    Col,
    Container,
    Modal,
    Button,
    Form,
    Spinner,
    Collapse,
} from "react-bootstrap";
import "../css/Profile.css";
import "../css/Feed.css";
import FeedSidebar from "./FeedSidebar";
import LeftSidebar from "./LeftSidebar";
import { Link } from "react-router-dom";

import request from "../Utility/fetch";
const opts = {};

export default function NotificationPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [notifications, setNotifications] = useState([]);

    const localUser = useSelector((state) => state.activeUser);
    const cookies = new Cookies();

    const fetchNotifications = async () => {
        setIsLoading(true);
        request
            .get(request.getURL() + "/users/" + localUser?._id)
            .then((user) => {
                setNotifications(user.requests);
                setIsLoading(false);
                setError("");
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching posts");
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Container
                        className="leftsidebar"
                        style={{
                            padding: "1em",
                        }}
                    >
                        <h6>Manage your Notifications</h6>
                        <a href="#">View Settings</a>
                    </Container>
                </Col>
                <Col md={6}>
                    {isLoading && (
                        <>
                            <Spinner />
                        </>
                    )}
                    {!isLoading &&
                        !error &&
                        notifications &&
                        !notifications.length && (
                            <div className="list-group">
                                <a href="#" className="list-group-item">
                                    No notifications found
                                </a>
                            </div>
                        )}
                    {!isLoading && !error && (
                        <>
                            {notifications.map((user) => (
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action flex-column align-items-start"
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">New friend request</h5>
                                        <small>1 hour</small>
                                    </div>
                                    <p class="mb-1">
                                        {user?.name} {user?.surname} sent you a
                                        friend request
                                        <div style={{ float: "right" }}>
                                            <Button
                                                variant="success"
                                                style={{ marginRight: "1em" }}
                                                onClick={async (e) => {
                                                    request
                                                        .get(
                                                            request.getURL() +
                                                                `/users/${localUser?._id}/accept/${user?._id}`
                                                        )
                                                        .then(({ message }) => {
                                                            fetchNotifications();
                                                        })
                                                        .catch(console.error);
                                                }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={async (e) => {
                                                    request
                                                        .get(
                                                            request.getURL() +
                                                                `/users/${localUser?._id}/remove/${user?._id}`
                                                        )
                                                        .then(({ message }) => {
                                                            fetchNotifications();
                                                        })
                                                        .catch(console.error);
                                                }}
                                            >
                                                Decline
                                            </Button>
                                        </div>
                                        <br />
                                        <br />
                                    </p>
                                </a>
                            ))}
                        </>
                    )}
                    {/* <div className="list-group">
                        <a
                            href="#"
                            className="list-group-item list-group-item-action flex-column align-items-start"
                        >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">New friend request</h5>
                                <small>1 hour</small>
                            </div>
                            <p class="mb-1">Morgan sent you a friend request</p>
                            <div style={{ float: "right" }}>
                                <Button
                                    variant="success"
                                    style={{ marginRight: "1em" }}
                                >
                                    Accept
                                </Button>
                                <Button variant="danger">Decline</Button>
                            </div>
                        </a>
                    </div> */}
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
}
