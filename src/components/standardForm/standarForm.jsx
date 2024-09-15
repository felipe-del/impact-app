import React from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const StandardForm = ({ formData, formFields, handleInputChange, handleSubmit, submissionStatus, error }) => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <Form onSubmit={handleSubmit} className="mt-4">
                        {formFields.map((field, index) => (
                            <Form.Group key={index} controlId={`form${field.name}`} className="mb-3">
                                <Form.Label>{field.label}</Form.Label>
                                {field.type === 'textarea' ? (
                                    <Form.Control
                                        as="textarea"
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder={field.placeholder}
                                    />
                                ) : (
                                    <Form.Control
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                    />
                                )}
                            </Form.Group>
                        ))}
                        {error && <Alert variant="danger">{error}</Alert>}
                        {submissionStatus && <Alert variant="success">{submissionStatus}</Alert>}

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default StandardForm;
