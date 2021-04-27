import React, { useState } from "react";
import { Grid, Col, Card, Row } from "react-bootstrap";
import ProductView from "./product-view.component";

const ProductList = () => {
  return (
    <Row>
      <Col md="3">
        <ProductView />;
      </Col>
      <Col md="3">
        <ProductView />;
      </Col>
      <Col md="3">
        <ProductView />;
      </Col>
      <Col md="3">
        <ProductView />;
      </Col>
      <Col md="3">
        <ProductView />;
      </Col>
      <Col md="3">
        <ProductView />;
      </Col>
    </Row>
  );
};

export default ProductList;
