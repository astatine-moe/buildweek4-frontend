import { Modal, Form, Button } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function AddExperience(props) {
    return (
        <Modal show={props.showAddForm} onHide={props.closeAddForm} size="lg">
            <Modal.Header>
                Add Experience
                <BsX
                    onClick={props.closeAddForm}
                    className="modal-close"
                    size={30}
                />
            </Modal.Header>
            <Modal.Body>
                <p className="tip">* Indicates required</p>

                <Form className="mt-4">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Role"
                            value={props.newExperience.role}
                            onChange={props.handleAddRoleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Company*</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Company"
                            value={props.newExperience.company}
                            onChange={props.handleAddCompanyChange}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        className="float-right pilled"
                        onClick={props.handleAddExperience}
                    >
                        Save
                    </Button>
                    <Button onClick={props.closeAddForm}>Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
