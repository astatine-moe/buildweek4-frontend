import ProfileCenter from "./ProfileCenter";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/SideBar";

const ProfilePage = (props) => {
  const { user_id } = useParams();
  const down = () => {
    window.location.replace(
      `https://backend-w4-build-weeklinkedin-production.up.railway.app/users/${user_id}/pdf`
    );
  };
  return (
    <Container>
      <Row>
        <Col md={9}>
          <ProfileCenter id={encodeURIComponent(user_id)} />
        </Col>
        <Col xs={0} md={3}>
          <Sidebar />
        </Col>
      </Row>
      <Row className="w-100" style={{ borderRadius: "20px" }}>
        <Col
          md={9}
          className=" border bg-light my-3 p-3 d-flex justify-content-center w-100"
        >
          <Button className="bg-dark border-none" onClick={down}>
            PDF
          </Button>
          <Button className="ml-3 bg-dark">CSV</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
