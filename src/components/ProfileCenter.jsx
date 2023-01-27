import { useEffect, useState } from "react";
import banner from "../banner.png";
import "../css/Profile.css";
import { BiPencil, BiSearch } from "react-icons/bi";
import {
    BsFillPeopleFill,
    BsFillEyeFill,
    BsArrowRight,
    BsImage,
} from "react-icons/bs";
import { Row, Col, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import request from "../Utility/fetch";
/* modals */
import AddExperience from "./Modals/AddExperience";
import EditExperience from "./Modals/EditExperience";
import ProfileImage from "./Modals/ProfileImage";
import EditProfile from "./Modals/EditProfile";

const uri = request.getURL();

const ProfileCenter = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [profile, setProfile] = useState({});
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState({});
    const [hasSent, setHasSent] = useState(false);
    const [isFriends, setIsFriends] = useState(false);

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

    const addFriend = (id) => {
        const myId = localUser._id;
        const theirId = id;

        request
            .get(request.getURL() + `/users/${theirId}/request/${myId}`)
            .then(({ message }) => {
                setHasSent(true);
            });
    };
    const removeFriend = (id) => {
        const myId = localUser._id;
        const theirId = id;
        request
            .get(request.getURL() + `/users/${theirId}/remove/${myId}`)
            .then(({ message }) => {
                setIsFriends(false);
                setHasSent(false);
            });
    };

    //-----------------Experience-----------------

    const [editFormOpen, setEditFormOpen] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState({
        role: "",
        company: "",
    });

    const openEditForm = (experience) => {
        setSelectedExperience(experience);
        setEditFormOpen(true);
    };

    const closeEditForm = () => {
        setEditFormOpen(false);
    };

    const handleEditExperience = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${uri}/users/${localUser._id}/experiences/${selectedExperience._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(selectedExperience),
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.ok) {
                console.log(response.status);
                console.log(response.statusText);
                const data = await response.json();
                fetchProfile(localUser._id);
                dispatch({
                    type: "SET_USER",
                    payload: {
                        ...localUser,
                        experiences: localUser.experiences.map((exp) =>
                            exp._id === selectedExperience._id
                                ? selectedExperience
                                : exp
                        ),
                    },
                });
            }
        } catch (error) {
            setError("Error updating experience");
        }

        closeEditForm();
    };

    const [newExperience, setNewExperience] = useState({
        role: "",
        company: "",
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const openAddForm = () => {
        setShowAddForm(true);
    };
    const closeAddForm = () => {
        setShowAddForm(false);
    };

    const handleAddRoleChange = (e) => {
        setNewExperience({ ...newExperience, role: e.target.value });
    };
    const handleAddCompanyChange = (e) => {
        setNewExperience({ ...newExperience, company: e.target.value });
    };
    const handleAddExperience = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${uri}/users/${localUser._id}/experiences`,
                {
                    method: "POST",
                    body: JSON.stringify(newExperience),
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.ok) {
                const data = await response.json();
                fetchProfile(localUser._id);
                dispatch({
                    type: "SET_USER",
                    payload: data,
                });
            }
        } catch (error) {
            setError("Error adding experience");
        }
        setShowAddForm(false);
        setNewExperience({ role: "", company: "" });
    };
    //-----------------Experience-----------------

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
                const userRequest = user.requests.find(
                    (u) => u._id === localUser._id
                );
                if (userRequest) {
                    setHasSent(true);
                }
                const userFriend = user.friends.find(
                    (u) => u._id === localUser._id
                );
                if (userFriend) {
                    setIsFriends(true);
                }
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
                                <b>{profile?.friends?.length || 0}</b>{" "}
                                connection
                                {(profile?.friends?.length || 0) === 1
                                    ? ""
                                    : "s"}
                            </span>
                            {!isMyProfile && (
                                <>
                                    <br />
                                    {isFriends && (
                                        <Button
                                            variant="danger"
                                            onClick={(e) => {
                                                removeFriend(profile._id);
                                            }}
                                        >
                                            Remove friend
                                        </Button>
                                    )}
                                    {!isFriends && (
                                        <Button
                                            onClick={(e) => {
                                                addFriend(profile._id);
                                            }}
                                            variant="success"
                                            disabled={hasSent}
                                        >
                                            {hasSent
                                                ? "Request sent"
                                                : "Add friend"}
                                        </Button>
                                    )}
                                    <br />
                                </>
                            )}
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
                        <div className="d-flex justify-content-between">
                            <h5>Experience</h5>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                            >
                                +
                            </button>
                        </div>
                        <hr></hr>
                        {profile.experiences.map((experience, index) => (
                            <div key={index}>
                                <p>Role: {experience.role}</p>
                                <p>Company: {experience.company}</p>
                                <Button
                                    onClick={() => openEditForm(experience)}
                                >
                                    Edit
                                </Button>
                                <hr></hr>
                            </div>
                        ))}
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
                        <EditProfile
                            show={show}
                            handleClose={handleClose}
                            updateProfile={updateProfile}
                            onChangeHandler={onChangeHandler}
                            handleSave={handleSave}
                        />
                    )}
                    {isMyProfile && (
                        <ProfileImage
                            show2={show2}
                            handleClose2={handleClose2}
                            setImage={setImage}
                            setImageUrl={setImageUrl}
                            handleSave2={handleSave2}
                            image={image}
                            imageUrl={imageUrl}
                        />
                    )}
                </>
            )}

            {editFormOpen && (
                <EditExperience
                    editFormOpen={editFormOpen}
                    closeEditForm={closeEditForm}
                    selectedExperience={selectedExperience}
                    setSelectedExperience={setSelectedExperience}
                    handleEditExperience={handleEditExperience}
                />
            )}
            {showAddForm && (
                <AddExperience
                    showAddForm={showAddForm}
                    closeAddForm={closeAddForm}
                    newExperience={newExperience}
                    handleAddRoleChange={handleAddRoleChange}
                    handleAddCompanyChange={handleAddCompanyChange}
                    handleAddExperience={handleAddExperience}
                />
            )}
        </>
    );
};

export default ProfileCenter;
