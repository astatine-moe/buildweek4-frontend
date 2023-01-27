import { Modal, Form, Button } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function EditExperience(props) {
    return (
        <Modal show={props.editFormOpen} onHide={props.closeEditForm} size="lg">
            <Modal.Header>
                Edit Experience
                <BsX
                    onClick={props.closeEditForm}
                    className="modal-close"
                    size={30}
                />
            </Modal.Header>
            <Modal.Body>
                <p className="tip">* Indicates required</p>

                <Form className="mt-4">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Role*</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.selectedExperience.role}
                            onChange={(e) =>
                                props.setSelectedExperience({
                                    ...props.selectedExperience,
                                    role: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Company*</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.selectedExperience.company}
                            onChange={(e) =>
                                props.setSelectedExperience({
                                    ...props.selectedExperience,
                                    company: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        className="float-right pilled"
                        onClick={props.handleEditExperience}
                    >
                        Save
                    </Button>
                    <Button onClick={props.closeEditForm}>Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
