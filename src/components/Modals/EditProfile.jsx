import { Modal, Button, Form } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function EditProfile(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg">
            <Modal.Header>
                Edit Bio
                <BsX
                    onClick={props.handleClose}
                    className="modal-close"
                    size={30}
                />
            </Modal.Header>
            <Modal.Body>
                <p className="tip">* Indicates required</p>

                <Form className="mt-4">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.updateProfile.name}
                            onChange={props.onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="surname">
                        <Form.Label>Surname*</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.updateProfile.surname}
                            onChange={props.onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email*</Form.Label>
                        <Form.Control
                            type="email"
                            value={props.updateProfile.email}
                            onChange={props.onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bio">
                        <Form.Label>Bio*</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.updateProfile.bio}
                            onChange={props.onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title*</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.updateProfile.title}
                            onChange={props.onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image*</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.updateProfile.image}
                            onChange={props.onChangeHandler}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        className="float-right pilled"
                        onClick={props.handleSave}
                    >
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
