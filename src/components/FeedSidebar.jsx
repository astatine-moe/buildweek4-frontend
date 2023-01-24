import React from "react";
import { Button, Container, Row } from "react-bootstrap";

export default function FeedSidebar() {
    return (
        <Container className="feedsidebar">
            <h4>Add to your feed</h4>

            <Row>
                <div className="addfeedflex2">
                    <img
                        className="companylogo"
                        src="linkedinlogo.png"
                        alt="companylogo"
                    />
                    <div className="addfeedflex">
                        <p>Company name</p>
                        <p>Type</p>
                        <Button className="follow">Follow</Button>
                    </div>
                </div>
            </Row>
            <Row>
                <div className="addfeedflex2">
                    <img
                        className="companylogo"
                        src="linkedinlogo.png"
                        alt="companylogo"
                    />
                    <div className="addfeedflex">
                        <p>Company name</p>
                        <p>Type</p>
                        <Button className="follow">Follow</Button>
                    </div>
                </div>
            </Row>
            <Row>
                <div className="addfeedflex2">
                    <img
                        className="companylogo"
                        src="linkedinlogo.png"
                        alt="companylogo"
                    />
                    <div className="addfeedflex">
                        <p>Company name</p>
                        <p>Type</p>
                        <Button className="follow">Follow</Button>
                    </div>
                </div>
            </Row>
        </Container>
    );
}
