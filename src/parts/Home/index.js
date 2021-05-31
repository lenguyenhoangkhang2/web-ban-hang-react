import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import ProductList from "../../components/Product-List";
const Home = ({ isAdmin }) => {
  return (
    <div className="container">
      <Row>
        <Col>
          <Alert variant="primary">
            <h4>LAPTOP MỚI</h4>
          </Alert>
        </Col>
      </Row>
      {<ProductList isAdmin={isAdmin} pageSize={8} category="Laptop" />}

      <Row>
        <Col>
          <Alert variant="primary">
            <h4>ĐIỆN THOẠI MỚI</h4>
          </Alert>
        </Col>
      </Row>
      {<ProductList isAdmin={isAdmin} pageSize={8} category="SmartPhone" />}
    </div>
  );
};
export default Home;
