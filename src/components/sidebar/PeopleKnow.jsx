import { Button, Card, Col, Row } from "react-bootstrap";

const PeopleKnow = () => {
  return (
    <Row>
      <Card className="frame mt-2">
        <Card.Body>
          <Card.Title className="d-flex">
            <h5>People you may know</h5>
          </Card.Title>
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle"
                src="https://placekitten.com/50/50"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3">
              <Card.Text className="mb-2 text-muted f-14 row align-items-start">
                <p className="m-0 f-14b" style={{ color: "red" }}>
                  Name LastName
                </p>
                <p className="m-0" style={{ color: "red" }}>
                  Job description
                </p>
              </Card.Text>
            </Col>
          </Row>
          {/* Add more fw */}
          <Button className="rd" variant="outline-dark">
            <h5 className="m-0 py-1 px-2">Connect</h5>
          </Button>
          <Card.Text className="border-bot mt-4"></Card.Text>
        </Card.Body>
        <Card.Body>
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle"
                src="https://placekitten.com/50/50"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3">
              <Card.Text className="mb-2 text-muted f-14 row align-items-start">
                <p className="m-0 f-14b" style={{ color: "red" }}>
                  Name LastName
                </p>
                <p className="m-0" style={{ color: "red" }}>
                  Job description
                </p>
              </Card.Text>
            </Col>
          </Row>
          {/* Add more fw */}
          <Button className="rd" variant="outline-dark">
            <h5 className="m-0 py-1 px-2">Connect</h5>
          </Button>
          {/* <Card.Text className="border-bot mt-4"></Card.Text> */}
        </Card.Body>
        <button
          class="btn show-btn border-top p-0 py-3"
          type="button"
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <h5>Show more</h5>
        </button>
        <div class="collapse" id="collapseExample">
          <Card.Body>
            <Row className="justify-content-around px-4">
              <Col md={3} lg={3} className="p-0">
                <img
                  className="circle"
                  src="https://placekitten.com/50/50"
                  alt="profile"
                />
              </Col>
              <Col md={9} lg={9} className="pl-3">
                <Card.Text className="mb-2 text-muted f-14 row align-items-start">
                  <p className="m-0 f-14b" style={{ color: "red" }}>
                    Name LastName
                  </p>
                  <p className="m-0" style={{ color: "red" }}>
                    Job description
                  </p>
                </Card.Text>
              </Col>
            </Row>
            <Button className="rd" variant="outline-dark">
              <h5 className="m-0 py-1 px-2">Connect</h5>
            </Button>
          </Card.Body>
        </div>
      </Card>
    </Row>
  );
};
export default PeopleKnow;
