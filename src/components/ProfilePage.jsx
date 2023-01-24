import ProfileCenter from "./ProfileCenter";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const ProfilePage = (props) => {
  const { user_id } = useParams();
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
    </Container>
  );
};

export default ProfilePage;
