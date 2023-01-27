import {
    Container,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { LinkContainer } from "react-router-bootstrap";
import {
    BsLinkedin,
    BsFillPeopleFill,
    BsFillBriefcaseFill,
} from "react-icons/bs";
import { FaCommentDots, FaBell } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
const cookies = new Cookies();

function NavItem(props) {
    return (
        <LinkContainer to={props.to}>
            <Nav.Link>
                <div className="nav-icon-stacked">
                    {props.icon}
                    {props.text}
                </div>
            </Nav.Link>
        </LinkContainer>
    );
}

function MyNavbar(props) {
    let navigate = useNavigate();
    const [search, setSearch] = useState("");
    const localUser = useSelector((state) => state.activeUser);
    return (
        <Navbar bg="light" collapseOnSelect expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <BsLinkedin size={30} />
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Collapse id="responsive-nav">
                    <Nav className="mr-auto">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                    </Nav>
                    <Nav>
                        <NavItem
                            to="/"
                            icon={<TiHome size={25} />}
                            text="Home"
                        />
                        <NavItem
                            to="/"
                            icon={<BsFillPeopleFill size={25} />}
                            text="My Network"
                        />
                        <NavItem
                            to="/"
                            icon={<BsFillBriefcaseFill size={25} />}
                            text="Jobs"
                        />
                        <NavItem
                            to="/"
                            icon={<FaCommentDots size={25} />}
                            text="Messaging"
                        />
                        <LinkContainer to="/notifications">
                            <Nav.Link className="notif">
                                <div className="nav-icon-stacked">
                                    <FaBell size={25} />
                                    Notifications
                                    <span className="count">0</span>
                                </div>
                            </Nav.Link>
                        </LinkContainer>
                        <div className="stacked-image">
                            <img src={localUser?.image} />
                            <NavDropdown title="Me" align="end">
                                <div className="user">
                                    <div className="profile">
                                        <div>
                                            <div className="img-contain">
                                                <img src={localUser?.image} />
                                            </div>
                                        </div>
                                        <div>
                                            <h3>
                                                {localUser?.name}{" "}
                                                {localUser?.surname}
                                            </h3>
                                            <h5>{localUser?.title}</h5>
                                        </div>
                                    </div>

                                    <LinkContainer to={`/in/${localUser?._id}`}>
                                        <button className="button">
                                            View Profile
                                        </button>
                                    </LinkContainer>
                                </div>
                                <hr />

                                <Dropdown.Header>Account</Dropdown.Header>
                                <LinkContainer to="/settings">
                                    <NavDropdown.Item>
                                        Settings & Privacy
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/settings">
                                    <NavDropdown.Item>Help</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/settings">
                                    <NavDropdown.Item>
                                        Language
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <hr />
                                <Dropdown.Header>Manage</Dropdown.Header>
                                <LinkContainer to="/settings">
                                    <NavDropdown.Item>
                                        Posts & Activity
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/settings">
                                    <NavDropdown.Item>
                                        Job Posting Account
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <hr />
                                <NavDropdown.Item
                                    onClick={(e) => {
                                        e.preventDefault();
                                        props.logout();
                                    }}
                                >
                                    Sign out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
