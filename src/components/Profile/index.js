import { Alert } from "react-bootstrap";
import React from "react";
import { Row, Col, Card, Image } from "react-bootstrap";

import OrderList from "../OrderList";
import UserContact from "../UserContact";

const Profile = ({ updateCurrentUser, currentUser }) => {
  return (
    <Card>
      <Image
        style={{ width: "8rem" }}
        roundedCircle
        src={currentUser.avatarUrl || "/img/avatar_default.png"}
      ></Image>

      <Card.Body>
        <Card.Title>{currentUser.name}</Card.Title>
        <Card.Text>{currentUser.email}</Card.Text>
        <Row>
          <Col md="4">
            <Alert variant="info">Thông tin liên hệ</Alert>
            <UserContact
              phone={currentUser.phone}
              country={currentUser.country}
              province={currentUser.province}
              district={currentUser.district}
              detail={currentUser.detail}
              onUpdated={updateCurrentUser}
            />
          </Col>
          <Col md="8">
            <Alert variant="success">Lịch sử mua hàng</Alert>
            <OrderList />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Profile;
