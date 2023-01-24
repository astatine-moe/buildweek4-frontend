import { opts, uri } from "../Morgan";
import { useEffect, useState } from "react";
import banner from "../banner.png";
import "../Profile.css";
import { BiPencil, BiSearch } from "react-icons/bi";
import {
    BsFillPeopleFill,
    BsFillEyeFill,
    BsArrowRight,
    BsImage,
    BsX,
} from "react-icons/bs";
import { Row, Col, Modal, Button, Form, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { doFetch } from "../util";

const ProfileCenter = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState({});
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState({});

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);

    const dispatch = useDispatch();

    const localUser = useSelector((state) => state.activeUser);

    const fetchProfile = async (id, me = false) => {
        if (id === "me") {
            me = true;
        }
        let link = me ? `${uri}me` : `${uri}${id}`;
        setIsLoading(true);
        setError("");
        try {
            const response = await fetch(link, opts);

            if (response.ok) {
                setError("");
                setIsLoading(false);
                const data = await response.json();

                const response2 = await fetch(uri + "me", opts);
                if (response.ok) {
                    const data2 = await response2.json();
                    setProfile(data);
                    setUpdateProfile(data);
                    if (data._id === data2._id) {
                        setIsMyProfile(true);
                    } else {
                        setIsMyProfile(false);
                    }
                }
            } else {
                setError("Error fetching profile");
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
            setError("Error fetching profile");
            setIsLoading(false);
        }
    };

    const onChangeHandler = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setUpdateProfile({
            ...updateProfile,
            [id]: value,
        });
        console.log(updateProfile);
    };

    const handleSave = async () => {
        handleClose();
        setProfile(updateProfile);
        try {
            const response = await fetch(uri, {
                headers: {
                    ...opts.headers,
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(updateProfile),
            });
            if (response.ok) {
                const data = await response.json();

                dispatch({
                    type: "SET_USER",
                    payload: data,
                });
            }
        } catch (e) {}
    };

    const handleSave2 = async () => {
        handleClose2();

        const formData = new FormData();
        formData.append("profile", image);

        const { data, status } = await doFetch(
            `https://striveschool-api.herokuapp.com/api/profile/${localUser._id}/picture`,
            {
                ...opts,
                method: "POST",
                body: formData,
            },
            true
        );

        fetchProfile(localUser._id);
        dispatch({
            type: "SET_USER",
            payload: data,
        });
    };

    useEffect(() => {
        fetchProfile(props.id);
    }, []);

    useEffect(() => {
        if (!image) return;

        setImageUrl(URL.createObjectURL(image));
    }, [image]);

    return (
        <>
            {!isLoading && !error && (
                <>
                    <div className="profile-section profile">
                        <div className="profile-top">
                            <div className="banner">
                                <img src={banner} />
                            </div>
                            <div className="profilePicture">
                                <img src={profile.image} />
                            </div>
                        </div>
                        <div className="profile-bottom">
                            {isMyProfile && (
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip>Edit profile</Tooltip>}
                                >
                                    <BiPencil
                                        className="edit"
                                        size={25}
                                        onClick={handleShow}
                                    />
                                </OverlayTrigger>
                            )}
                            {isMyProfile && (
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip>Edit Image</Tooltip>}
                                >
                                    <BsImage
                                        className="editImage"
                                        size={25}
                                        onClick={handleShow2}
                                    />
                                </OverlayTrigger>
                            )}

                            <h3>
                                {profile.name} {profile.surname}
                            </h3>
                            <h6>{profile.title}</h6>
                            <span className="location">{profile.area}</span>
                            <span className="connections">
                                <b>0</b> connections
                            </span>
                        </div>
                    </div>
                    {isMyProfile && (
                        <div className="profile-section">
                            <h5>Analytics</h5>
                            <p className="subtitle">
                                <BsFillEyeFill />
                                &nbsp; Private to you
                            </p>

                            <Row className="analytics">
                                <Col md={4} className="column">
                                    <div className="icon">
                                        <BsFillPeopleFill size={25} />
                                    </div>
                                    <div className="content">
                                        <span className="title">
                                            0 profile view
                                        </span>
                                        <span className="description">
                                            Discover who's viewed your profile.
                                        </span>
                                    </div>
                                </Col>
                                <Col md={4} className="column">
                                    <div className="icon">
                                        <BiSearch size={25} />
                                    </div>
                                    <div className="content">
                                        <span className="title">
                                            0 search appearance
                                        </span>
                                        <span className="description">
                                            See how often you appear in search
                                            results.
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )}
                    {profile.bio && (
                        <div className="profile-section about">
                            <h5>About</h5>
                            <p>{profile.bio}</p>
                        </div>
                    )}

                    <div className="profile-section activity">
                        <h5>Activity</h5>
                        <p className="subtitle">0 followers</p>
                        <h6>{profile.name} hasn't posted lately</h6>
                        <p>
                            {profile.name}'s recent posts and comments will be
                            displayed here
                        </p>
                    </div>
                    <div className="activity-button">
                        Show all activity <BsArrowRight />
                    </div>
                    <div className="profile-section experience">
                        <h5>Experience</h5>
                    </div>
                    <div className="profile-section education">
                        <h5>Education</h5>
                    </div>
                    <div className="profile-section skills">
                        <h5>Skills</h5>
                    </div>
                    <div className="profile-section languages">
                        <h5>Languages</h5>
                    </div>
                    <div className="profile-section interests">
                        <h5>Interests</h5>
                    </div>
                    <div className="profile-section developer">
                        <h5>Profile JSON</h5>
                        <hr />
                        <pre>{JSON.stringify(profile, null, 4)}</pre>
                    </div>

                    {isMyProfile && (
                        <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header>
                                Edit Intro
                                <BsX
                                    onClick={handleClose}
                                    className="modal-close"
                                    size={30}
                                />
                            </Modal.Header>
                            <Modal.Body>
                                <p className="tip">* Indicates required</p>

                                <Form className="mt-4">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="name"
                                    >
                                        <Form.Label>Name*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateProfile.name}
                                            onChange={onChangeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="surname"
                                    >
                                        <Form.Label>Surname*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateProfile.surname}
                                            onChange={onChangeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="email"
                                    >
                                        <Form.Label>Email*</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={updateProfile.email}
                                            onChange={onChangeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="bio"
                                    >
                                        <Form.Label>Bio*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateProfile.bio}
                                            onChange={onChangeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="title"
                                    >
                                        <Form.Label>Title*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateProfile.title}
                                            onChange={onChangeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="image"
                                    >
                                        <Form.Label>Image*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateProfile.image}
                                            onChange={onChangeHandler}
                                        />
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
                    )}

                    {isMyProfile && (
                        <Modal show={show2} onHide={handleClose2} size="lg">
                            <Modal.Header>
                                Edit Profile Image
                                <BsX
                                    onClick={handleClose2}
                                    className="modal-close"
                                    size={30}
                                />
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            setImage(e.target.files[0]);
                                        }}
                                    />
                                    <br />
                                    <br />
                                    <div className="btn-group">
                                        <Button
                                            variant="secondary"
                                            onClick={(e) => {
                                                handleClose2();
                                                setImage(null);
                                                setImageUrl("");
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="success"
                                            className="float-right pilled"
                                            onClick={handleSave2}
                                            disabled={image ? null : true}
                                        >
                                            Update
                                        </Button>
                                    </div>

                                    <hr />

                                    {image && (
                                        <img
                                            src={imageUrl}
                                            className="image-preview"
                                        />
                                    )}
                                </Container>
                            </Modal.Body>
                        </Modal>
                    )}
                </>
            )}

            {error && <pre>{error}</pre>}
        </>
    );
};

export default ProfileCenter;
