import { Button, Card, Row } from "react-bootstrap";

const AdPremium = () => {
  return (
    <Row>
      <Card className="frame">
        <Card.Body>
          <Card.Title className="d-flex justify-content-end f-14b">
            <span className="mr-2">Ad</span>
            <span>...</span>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted f-14">
            <span style={{ color: "red" }}>Name LastName </span>, unlock your
            full potential with LinkedIn Premium
          </Card.Subtitle>
          <Row className="justify-content-around px-4">
            <img
              className="circle"
              src="https://placekitten.com/100/100"
              alt="profile"
            />
            <img src="https://placekitten.com/100/100" alt="key" />
          </Row>
          {/* Add more fw */}
          <Card.Text className="mt-2">
            See who's view your profile in the last 90 days
          </Card.Text>
          <Button className="rd" variant="outline-info">
            <h5 className="m-0 py-1 px-2">Try for Free</h5>
          </Button>
        </Card.Body>
      </Card>
    </Row>
  );
};
export default AdPremium;
