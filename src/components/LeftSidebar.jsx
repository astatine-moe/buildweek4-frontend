import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import banner from "../banner.png";

export default function LeftSidebar() {
    const localUser = useSelector((state) => state.activeUser);
    return (
        <Container className="leftsidebar">
            <div className="leftsidetop">
            <div>
                <img className="leftbanner" src={banner} alt="" />
            </div>
            <div>
                <img className="leftpfp" src={localUser?.image} alt="" />
            </div>
            <div>
                <h4>Welcome, {localUser?.name}!</h4>
                </div>
                </div>
                <hr />
                <div className="connflex">
                    <p>Connections</p>
                    <p>
                        <a href="">0</a>
                    </p>
                </div>
                <hr />
                <a className="premiumlink" href="">
                    Try premium for free
                </a>
                <hr />
                <p>
                    <a href="">My items</a>
                </p>
            
        </Container>
    );
}
