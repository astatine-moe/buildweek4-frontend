import { Button, Card, Col, Row } from "react-bootstrap";

const PeopleViewed = () => {
  return (
    <Row>
      <Card className="frame mt-2">
        <Card.Body>
          <Card.Title className="d-flex">
            <h5>People also viewed</h5>
          </Card.Title>
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle profile-pic-50"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3 mb-2">
              <Card.Text className="mb-2 text-muted f-14 row align-items-start">
                <p className="m-0">
                  <span className="f-14b">Karolina Laiwik</span> · 1st
                </p>
                <p className="m-0">Marketing assistant</p>
              </Card.Text>
            </Col>
            <Button className="rd" variant="outline-dark">
              <h5 className="m-0 py-1 px-2">
                <svg
                  className="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  fill="currentColor"
                  class="bi bi-send-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
                Message
              </h5>
            </Button>
          </Row>
          <Card.Text className="border-bot mt-4"></Card.Text>
        </Card.Body>
        <Card.Body className="pt-0">
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle profile-pic-50"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3">
              <Card.Text className="mb-2 text-muted f-14 row align-items-start">
                <p className="m-0">
                  <span className="f-14b">Alberto Jurado</span> · 2nd
                </p>
                <p className="m-0">IT Manager</p>
              </Card.Text>
            </Col>
            <Button className="rd" variant="outline-dark">
              <h5 className="m-0 py-1 px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
                Connect
              </h5>
            </Button>
          </Row>
          <Card.Text className="border-bot mt-4"></Card.Text>
        </Card.Body>
        <Card.Body className="pt-0">
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle profile-pic-50"
                src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3">
              <Card.Text className="mb-2 text-muted f-14 row align-items-start">
                <p className="m-0">
                  <span className="f-14b">Joanna Kurkiewicz</span> · 3rd
                </p>
                <p className="m-0">IAM Director</p>
              </Card.Text>
            </Col>
            <Button className="rd" variant="outline-dark">
              <h5 className="m-0 py-1 px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
                Connect
              </h5>
            </Button>
          </Row>
          <Card.Text className="border-bot mt-4"></Card.Text>
        </Card.Body>
        <Card.Body className="pt-0">
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle profile-pic-50"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3">
              <Card.Text className="mb-2 text-muted f-14 row align-items-start">
                <p className="m-0">
                  <span className="f-14b">John Facto</span> · 4th
                </p>
                <p className="m-0">IT Service Desk</p>
              </Card.Text>
            </Col>
            <Button className="rd" variant="outline-dark">
              <h5 className="m-0 py-1 px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
                Connect
              </h5>
            </Button>
          </Row>
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
export default PeopleViewed;
