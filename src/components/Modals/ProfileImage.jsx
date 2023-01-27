import { Modal, Button, Container } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function ProfileImage(props) {
    return (
        <Modal show={props.show2} onHide={props.handleClose2} size="lg">
            <Modal.Header>
                Edit Profile Image
                <BsX
                    onClick={props.handleClose2}
                    className="modal-close"
                    size={30}
                />
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <input
                        type="file"
                        onChange={(e) => {
                            props.setImage(e.target.files[0]);
                        }}
                    />
                    <br />
                    <br />
                    <div className="btn-group">
                        <Button
                            variant="secondary"
                            onClick={(e) => {
                                props.handleClose2();
                                props.setImage(null);
                                props.setImageUrl("");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            className="float-right pilled"
                            onClick={props.handleSave2}
                            disabled={props.image ? null : true}
                        >
                            Update
                        </Button>
                    </div>

                    <hr />

                    {props.image && (
                        <img src={props.imageUrl} className="image-preview" />
                    )}
                </Container>
            </Modal.Body>
        </Modal>
    );
}
