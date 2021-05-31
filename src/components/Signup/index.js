import React, { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import Alert from "react-s-alert";

import { signup } from "../../api/auth";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../../constants";

const Signup = ({ onSignup, isAuthentication, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const location = useLocation();

  if (isAuthentication) {
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }

  return (
    <Row>
      <Card as={Col} md="6" className="text-center">
        <Card.Body>
          <Card.Title className="mb-4">
            <h3>Create your account</h3>
          </Card.Title>
          <Button className="w-100 mb-3" href={GOOGLE_AUTH_URL} variant="danger">
            Signup with google
          </Button>
          <Button className="w-100" href={FACEBOOK_AUTH_URL} variant="primary">
            Signup with facebook
          </Button>
          <Card.Subtitle className="mt-3">
            <h5>Or</h5>
          </Card.Subtitle>
          <Form
            onSubmit={(e) =>
              onSignup(e, {
                email: email,
                name: name,
                password: password,
              })
            }
          >
            <Form.Group>
              <Form.Label className="text-left">Your Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-left">Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-left">Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button className="w-50 mb-3" variant="dark" type="submit">
                Signup
              </Button>
            </Form.Group>
          </Form>
          <Card.Text>
            Already have an account? <Link to="/login"> Login</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Signup;
