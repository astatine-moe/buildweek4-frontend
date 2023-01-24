import { Card, Col, Row } from "react-bootstrap";

const Experiences = () => {
  return (
    <Card className="frame mt-2">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <h5>Experience</h5>
          <div>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
              </svg>
            </span>
          </div>
        </Card.Title>
        <Row className="px-4">
          <Col md={1} lg={1} className="p-0">
            <img
              className="circle"
              src="https://placekitten.com/50/50"
              alt="company-logo"
            />
          </Col>
          <Col md={11} lg={11} className="p-0">
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
        <Card.Text className="border-bot mt-4"></Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Experiences;
