import React, { useState } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ButtonAddToCart = (props) => {
  return <Button variant="primary">Add to Cart</Button>;
};

ButtonAddToCart.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ButtonAddToCart;
