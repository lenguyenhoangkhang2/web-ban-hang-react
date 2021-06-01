import React, { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Card, Button, Form, Row, Col, Image, Spinner } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";

import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../../constants";
import SAlert from "react-s-alert";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const location = useLocation();

  if (props.location.state.error) {
    SAlert.error(props.location.state.error);
  }

  if (props.isAuthentication) {
    return (
      <Redirect
        to={{
          pathname: "/home",
          state: {
            from: location.pathname,
          },
        }}
      />
    );
  }

  return (
    <Row>
      <Card as={Col} md="6" className="text-center">
        <Card.Body>
          <Card.Title className="mb-4">
            <h3>Login to JAVA</h3>
          </Card.Title>
          <Form
            onSubmit={(e) => {
              props.onLocalLogin(e, { email: email, password: password });
            }}
          >
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
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
              ></Form.Control>
              <Form.Text
                className="text-left pe-auto"
                style={{ cursor: "pointer" }}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Show password" : "Hide password"}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Button className="w-50" variant="dark" type="submit">
                {!props.loading ? (
                  "Login"
                ) : (
                  <Spinner animation="border" variant="light" size="sm" />
                )}
              </Button>
            </Form.Group>
            <Card.Subtitle>
              <h5>Or</h5>
            </Card.Subtitle>
            <Form.Group>
              <Button className="w-100" href={GOOGLE_AUTH_URL} variant="danger">
                <FaGoogle /> Login with Google
              </Button>
            </Form.Group>
            <Form.Group>
              <Button className="w-100" href={FACEBOOK_AUTH_URL} variant="primary">
                <FaFacebook /> Login with Facebook
              </Button>
            </Form.Group>
          </Form>
          <Card.Text>
            No account? <Link to="/signup"> Create account</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Login;
