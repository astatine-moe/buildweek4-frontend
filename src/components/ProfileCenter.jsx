import { useEffect, useState } from "react";
import banner from "../banner.png";
import "../css/Profile.css";
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

import request from "../Utility/fetch";
import { Link } from "react-router-dom";

const uri = request.getURL();
const opts = {};

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

    const down = () => {
        window.location.replace(
            `https://backend-w4-build-weeklinkedin-production.up.railway.app/users/${profile?._id}/pdf`
        );
    };
    const up = () => {
        window.location.replace(
            `https://backend-w4-build-weeklinkedin-production.up.railway.app/users/${profile?._id}/experiences/csv`
        );
    };

    //-----------------Experience-----------------
    // const [editExperience, setEditExperience] = useState({});
    // const [showEditExperience, setShowEditExperience] = useState(false);

    // const [showEditModal, setShowEditModal] = useState(false);
    // const [showAddModal, setShowAddModal] = useState(false);
    // const handleShowAddModal = () => setShowAddModal(true);
    // const handleCloseAddModal = () => setShowAddModal(false);
    // const handleShowEditModal = () => setShowEditModal(true);

    // const handleCloseEditModal = () => setShowEditModal(false);
    // const handleCancelEditExperience = () => {
    //   setShowEditExperience(false);
    // };

    // const handleEditExperience = (experience) => {
    //   setEditExperience(experience);
    //   setShowEditExperience(true);
    // };

    // const handleSaveEditExperience = async () => {
    //   setShowEditExperience(false);
    //   try {
    //     const response = await fetch(
    //       `${uri}/users/${localUser._id}/experiences/${editExperience._id}`,
    //       {
    //         method: "PUT",
    //         body: JSON.stringify(editExperience),
    //         headers: { "Content-Type": "application/json" }
    //       }
    //     );
    //     if (response.ok) {
    //       const data = await response.json();
    //       fetchProfile(localUser._id);
    //       dispatch({
    //         type: "SET_USER",
    //         payload: data
    //       });
    //     }
    //   } catch (error) {
    //     setError("Error updating experience");
    //   }
    // };

    //-----------------Experience-----------------

    const dispatch = useDispatch();

    const localUser = useSelector((state) => state.activeUser);

    const fetchProfile = async (id, me = false) => {
        if (id === "me") {
            me = true;
        }
        let link = me ? `${uri}/users/${localUser._id}` : `${uri}/users/${id}`;
        setIsLoading(true);
        setError("");
        request
            .get(link)
            .then((user) => {
                setError("");
                setIsLoading(false);
                setProfile(user);
                setUpdateProfile(user);
                console.log(user, localUser);
                if (user._id === localUser._id) {
                    setIsMyProfile(true);
                } else {
                    setIsMyProfile(false);
                }
            })
            .catch((err) => {
                setError("Error fetching profile");
                setIsLoading(false);
            });
    };

    const onChangeHandler = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setUpdateProfile({
            ...updateProfile,
            [id]: value,
        });
    };

    const handleSave = async () => {
        handleClose();
        setProfile(updateProfile);
        request
            .put(request.getURL() + "/users/" + profile._id, updateProfile)
            .then((user) => {
                dispatch({
                    type: "SET_USER",
                    payload: user,
                });
            })
            .catch((err) => {});
    };

    const handleSave2 = async () => {
        handleClose2();

        const formData = new FormData();
        formData.append("image", image);

        // request.post(
        //     request.getURL() + "/users/" + localUser._id + "/picture",
        //     formData
        // );

        const response = await fetch(
            request.getURL() + "/users/" + localUser._id + "/picture",
            {
                method: "POST",
                body: formData,
            }
        );

        if (response.ok) {
            let data = await response.json();
            fetchProfile(localUser._id);
            dispatch({
                type: "SET_USER",
                payload: data,
            });
        }
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
                            <br />
                            <Button onClick={down}> Download as PDF</Button>
                            {" - "}
                            <Button variant="info" onClick={up}>
                                {" "}
                                Download as CSV
                            </Button>
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
                        {profile.experiences.map((experience, index) => (
                            <div key={index}>
                                <p>Role: {experience.role}</p>
                                <p>Company: {experience.company}</p>
                            </div>
                        ))}
                        {/* <Button onClick={() => setShowEditModal(true)}>
              Edit Experience
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              Add Experience
            </Button>
            {showEditModal ? (
              <EditExperienceModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                handleSave={handleSaveEditModal}
              />
            ) : null}

            {showAddModal ? (
              <AddExperienceModal
                show={showAddModal}
                handleClose={handleCloseAddModal}
                handleSave={handleSaveAddModal}
              />
            ) : null} */}
                        <p>testdw</p>
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

            {/* {showEditExperience && (
        <Modal show={showEditExperience} onHide={handleCancelEditExperience}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  value={editExperience.role}
                  onChange={(e) =>
                    setEditExperience({
                      ...editExperience,
                      role: e.target.value
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  value={editExperience.company}
                  onChange={(e) =>
                    setEditExperience({
                      ...editExperience,
                      company: e.target.value
                    })
                  }
                />
              </Form.Group>
              Add fields for other experience details here
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelEditExperience}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEditExperience}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )} */}
        </>
    );
};

export default ProfileCenter;
