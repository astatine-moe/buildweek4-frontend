import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doFetch, timeSince } from "../util";

import {
    BiLike,
    BiCommentDetail,
    BiRepost,
    BiSend,
    BiPencil,
    BiTrash,
} from "react-icons/bi";
import { BsX } from "react-icons/bs";
import {
    Row,
    Col,
    Container,
    Modal,
    Button,
    Form,
    Spinner,
} from "react-bootstrap";
import { opts } from "../Morgan";
import "../Profile.css";
import "../Feed.css";
import FeedSidebar from "./FeedSidebar";
import LeftSidebar from "./LeftSidebar";

export default function FeedPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const [postType, setPostType] = useState("text");
    const [postImage, setPostImage] = useState(null);
    const [postImageUrl, setPostImageUrl] = useState("");
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState("");
    const [deletingPost, setDeletingPost] = useState("");

    const [show, setShow] = useState(false);
    const [updatePost, setUpdatePost] = useState({});
    const [editingPost, setEditingPost] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const localUser = useSelector((state) => state.activeUser);

    const clearForm = () => {
        setPost("");
        setPostType("text");
        setPostImage(null);
        setPostImageUrl("");
    };

    const fetchPosts = async () => {
        setIsLoading(true);
        const { status, data } = await doFetch(
            "https://striveschool-api.herokuapp.com/api/posts",
            opts,

            true
        );

        if (status === "ok") {
            setError("");
            setIsLoading(false);
            setPosts(data.reverse());
        } else {
            console.error(data);
            setError("Error fetching posts");
            setIsLoading(false);
        }
    };

    const sendPost = async () => {
        setIsUploading(true);

        const { status, data } = await doFetch(
            "https://striveschool-api.herokuapp.com/api/posts",
            {
                headers: {
                    ...opts.headers,

                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    text: post,
                }),
            },
            true
        );

        setIsUploading(false);

        if (status === "ok") {
            setPosts([
                {
                    ...data,
                    user: localUser,
                },
                ...posts,
            ]);
        } else {
            console.error(data);
        }
    };

    const sendPostWithImage = async () => {
        console.log("post with image");
        if (!postImage) return sendPost();
        console.log("post with image 2");
        setIsUploading(true);

        const { status, data } = await doFetch(
            "https://striveschool-api.herokuapp.com/api/posts",
            {
                headers: {
                    ...opts.headers,

                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    text: post,
                }),
            },

            true
        );

        if (status === "ok") {
            const { _id } = data;

            console.log(_id);

            const formData = new FormData();
            formData.append("post", postImage);

            const { status: status2, data: data2 } = await doFetch(
                "https://striveschool-api.herokuapp.com/api/posts/" + _id,
                {
                    headers: {
                        ...opts.headers,
                    },
                    method: "POST",
                    body: formData,
                },
                true
            );

            setIsUploading(false);

            console.log(status, data2);

            if (status2 === "ok") {
                setPosts([
                    {
                        ...data2,
                        user: localUser,
                    },
                    ...posts,
                ]);
            } else {
                console.error(data2);
            }
        } else {
            setIsUploading(false);
            console.error(data);
        }
    };

    const deletePost = async (id) => {
        setDeletingPost(id);

        const { status, data } = await doFetch(
            "https://striveschool-api.herokuapp.com/api/posts/" + id,
            { ...opts, method: "delete" },
            false
        );

        setDeletingPost("");

        if (status === "ok") {
            setPosts(posts.filter((post) => post._id !== id));
        } else {
            console.error(data);
        }
    };

    const onChangeHandler = (e) => {
        setUpdatePost({
            text: e.target.value,
        });
    };

    const handleSave = async (e) => {
        handleClose();
        setIsUploading(true);

        const { status, data } = await doFetch(
            `https://striveschool-api.herokuapp.com/api/posts/${editingPost}`,
            {
                headers: {
                    ...opts.headers,
                    "Content-Type": "application/json",
                },
                method: "put",
                body: JSON.stringify({
                    text: updatePost.text,
                }),
            },
            true
        );

        setIsUploading(false);

        if (status === "ok") {
            // let post = posts.find((post) => post._id === editingPost);

            // post = data;

            setPosts(
                posts.map((post) => {
                    if (post._id === editingPost) {
                        return {
                            ...data,
                            user: post.user,
                        };
                    } else {
                        return post;
                    }
                })
            );
        } else {
            console.error(data);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (!postImage) return;

        setPostImageUrl(URL.createObjectURL(postImage));
    }, [postImage]);

    return (
        <Container>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header>
                    Edit Post
                    <BsX
                        onClick={handleClose}
                        className="modal-close"
                        size={30}
                    />
                </Modal.Header>
                <Modal.Body>
                    <p className="tip">* Indicates required</p>
                    <Form className="mt-4">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Text*</Form.Label>
                            <Form.Text type="text" />
                            <textarea
                                className="form-control"
                                onChange={onChangeHandler}
                            >
                                {updatePost.text}
                            </textarea>
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="float-right pilled"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Row>
                <Col md={3}>
                    <LeftSidebar />
                </Col>
                <Col md={6}>
                    <div className="profile-section start-a-post">
                        <select
                            className="form-control"
                            onChange={(e) => {
                                setPostType(e.target.value);
                            }}
                            disabled={isUploading ? true : false}
                            value={postType}
                        >
                            <option value="text">Text post</option>
                            <option value="image">Image post</option>
                        </select>
                        <br />
                        <div>
                            <img src={localUser?.image} />
                            <input
                                disabled={isUploading ? true : false}
                                type="text"
                                placeholder="Start a post"
                                value={post}
                                onChange={(e) => {
                                    setPost(e.target.value);
                                }}
                            />
                            {post && (
                                <Button
                                    disabled={isUploading ? true : false}
                                    onClick={(e) => {
                                        if (postImage) {
                                            sendPostWithImage(post);
                                        } else {
                                            sendPost(post);
                                        }
                                        clearForm();
                                    }}
                                >
                                    Send
                                </Button>
                            )}
                        </div>

                        {postType === "image" && (
                            <>
                                <hr />
                                <input
                                    disabled={isUploading ? true : false}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setPostImage(e.target.files[0]);
                                    }}
                                />
                            </>
                        )}
                        {postImage && (
                            <>
                                <hr />
                                <img src={postImageUrl} className="upload" />
                                <br /> <br />
                                <Button
                                    className="uploadbtn"
                                    variant="danger"
                                    onClick={(e) => {
                                        setPostImage(null);
                                        setPostImageUrl("");
                                    }}
                                >
                                    Remove image
                                </Button>
                            </>
                        )}
                        {isUploading && (
                            <>
                                <hr />
                                <Spinner />
                            </>
                        )}
                    </div>
                    {isLoading && <Spinner />}
                    {!isLoading &&
                        !error &&
                        posts.slice(0, 25).map((post) => (
                            <>
                                <div
                                    className={`profile-section post activity ${
                                        deletingPost === post._id
                                            ? " deleting"
                                            : ""
                                    }`}
                                >
                                    {localUser._id === post.user._id ? (
                                        <BiPencil
                                            className="editPost"
                                            onClick={(e) => {
                                                setUpdatePost(post);
                                                setEditingPost(post._id);
                                                handleShow(e);
                                            }}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    {localUser._id === post.user._id &&
                                    deletingPost !== post._id ? (
                                        <BiTrash
                                            className="deletePost"
                                            onClick={async (e) => {
                                                deletePost(post._id);
                                            }}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <div className="post-author">
                                        <div>
                                            <img src={post.user.image} />
                                        </div>
                                        <div>
                                            <span className="name">
                                                {post.user.name}{" "}
                                                {post.user.surname}
                                            </span>
                                            <span className="date">
                                                {timeSince(
                                                    new Date(post.createdAt)
                                                )}{" "}
                                                {post.createdAt !==
                                                    post.updatedAt && (
                                                    <>
                                                        <span>
                                                            {" "}
                                                            - edited{" "}
                                                            {timeSince(
                                                                new Date(
                                                                    post.updatedAt
                                                                )
                                                            )}{" "}
                                                            ago
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="post-text">{post.text}</div>
                                    {post.image ? (
                                        <div className="post-image">
                                            <hr />
                                            <img src={post.image} />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="post-buttons">
                                    <div>
                                        <BiLike size={20} />
                                        Like
                                    </div>
                                    <div>
                                        <BiCommentDetail size={20} />
                                        Comment
                                    </div>
                                    <div>
                                        <BiRepost size={20} />
                                        Repost
                                    </div>
                                    <div>
                                        <BiSend size={20} />
                                        Send
                                    </div>
                                </div>
                            </>
                        ))}
                </Col>
                <Col md={3}>
                    <FeedSidebar />
                </Col>
            </Row>
        </Container>
    );
}
