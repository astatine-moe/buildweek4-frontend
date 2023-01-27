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
import Cookies from "universal-cookie";
const cookies = new Cookies();

function MyNavbar(props) {
    let navigate = useNavigate();
    const [search, setSearch] = useState("");
    const localUser = useSelector((state) => state.activeUser);
    return <></>;
}

export default MyNavbar;
