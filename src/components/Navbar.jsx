import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyNavbar() {
    let navigate = useNavigate();
    const [search, setSearch] = useState("");
    const localUser = useSelector((state) => state.activeUser);
    return (
        <Navbar className="navflex" bg="light" expand="lg">
            <Container fluid>
                
                <Navbar.Brand href="#">
                    <img
                        className="logo"
                        src="/linkedinlogo.png"
                        alt="linkedin logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="d-flex"
                        >
                            <Form.Control
                                onKeyUp={(i) => {
                                    if (i.key === "Enter") {
                                        i.preventDefault();
                                        navigate(
                                            `/search/${encodeURIComponent(
                                                search
                                            )}`
                                        );
                                    }
                                }}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                        
                        <Nav.Link
                            className="naviconflex first__navicon"
                            href="#action2"
                            onClick={(e) => {
                                navigate("/");
                            }}
                        >
                            <img
                                className="navicon"
                                src="/icons8-home.svg"
                                alt="Home"
                            />
                            Home
                        </Nav.Link>
                        <Nav.Link
                            className="naviconflex"
                            href="#action2"
                            onClick={(e) => {
                                navigate("/");
                            }}
                        >
                            <img
                                className="navicon"
                                src="/group-svgrepo-com.svg"
                                alt="Home"
                            />
                            My Network
                        </Nav.Link>
                        <Nav.Link
                            className="naviconflex"
                            href="#action2"
                            onClick={(e) => {
                                navigate("/");
                            }}
                        >
                            <img
                                className="navicon"
                                src="/briefcase-svgrepo-com.svg"
                                alt="Home"
                            />
                            Jobs
                        </Nav.Link>
                        <Nav.Link
                            className="naviconflex"
                            href="#action2"
                            onClick={(e) => {
                                navigate("/");
                            }}
                        >
                            <img
                                className="navicon"
                                src="/bell-svgrepo-com.svg"
                                alt="Home"
                            />
                            Notifications
                        </Nav.Link>

                        <div className="naviconflex">
                            <img
                                className="navpicture"
                                src={localUser?.image}
                                alt="pfpic"
                            />
                            <NavDropdown
                                title="Me"
                                id="navbarScrollingDropdown"
                            >
                                <NavDropdown.Item
                                    className="dropdownflex"
                                    onClick={(e) => {
                                        navigate(`/in/${localUser?._id}`);
                                    }}
                                >
                                    <div className="smallerdropdownflex">
                                        <img
                                            className="smallprofile"
                                            src={localUser?.image}
                                            alt=""
                                        />{" "}
                                        <div>
                                            <p className="dropdownname">
                                                {localUser?.name}
                                            </p>{" "}
                                            <p>{localUser?.title}</p>{" "}
                                        </div>
                                    </div>

                                    <Button
                                        className="viewprofile"
                                        onClick={(e) => {
                                            navigate(`/in/${localUser?._id}`);
                                        }}
                                    >
                                        View Profile
                                    </Button>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <h5 className="dropdowntitle">Account</h5>
                                <NavDropdown.Item href="#action3">
                                    Settings & Privacy
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Help
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action5">
                                    Language
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <h5 className="dropdowntitle">Manage</h5>
                                <NavDropdown.Item href="#action6">
                                    Posts & Activity
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action7">
                                    Job Posting Account
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action8">
                                    Sign out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <Nav.Link
                            className="naviconflex"
                            href="#action2"
                            onClick={(e) => {
                                navigate("/");
                            }}
                        >
                            <img
                                className="navicon"
                                src="/dots-menu-svgrepo-com.svg"
                                alt="Home"
                            />
                            Work
                        </Nav.Link>
                        <Nav.Link
                            className="naviconflex"
                            href="#action2"
                            onClick={(e) => {
                                navigate("/");
                            }}
                        >
                            <img
                                className="navicon"
                                src="/open-book-svgrepo-com.svg"
                                alt="Home"
                            />
                            Learning
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
