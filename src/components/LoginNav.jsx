import "../css/LoginNav.css";
import Logo from "../css//media/Logo.png";
import Discover from "../css//media/Discover.svg";
import People from "../css//media/People.svg";
import Jobs from "../css//media/Jobs.svg";
import Learning from "../css//media/Learning.svg";

import { Navbar } from "react-bootstrap";

import React from "react";

export default function LoginNav() {
  return (
    <div className="loginNav">
      <Navbar className="w-75 m-auto p-0">
        <a href="https://www.linkedin.com/feed/?trk=homepage-basic_signin-form_submit">
          <img className="logopic" src={Logo} alt="logo" />
          <hr></hr>
        </a>
      </Navbar>
    </div>
  );
}
