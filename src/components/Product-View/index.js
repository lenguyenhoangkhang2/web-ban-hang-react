import React from "react";
import { Card, Badge, Button, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import "./style.css";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill } from "react-icons/bs";
import SAlert from "react-s-alert";
import Rating from "react-rating";
import CartApi from "../../api/cart";

const ProductView = ({ isAuth, isAdmin, enableBtnAddToCard, product }) => {
  const getImageOfficial = () => {
    const official = product.images.find(({ type }) => type === "Official");
    return official.url;
  };

  const addToCart = async () => {
    try {
      const response = await CartApi.addProduct(product.id);
      if (response.status === 200) {
        SAlert.success(response.data);
      }
    } catch (error) {
      SAlert.error(error.response.data.message);
    }
  };

  return (
    <Card className="product-card p-2" key={product.id}>
      <Link to={`/products/${product.id}`}>
        <Card.Img style={{ cursor: "pointer" }} variant="top" src={getImageOfficial()} />
      </Link>
      <Card.Body className="p-2">
        <Link to={`/products/${product.id}`}>
          <h3 style={{ cursor: "pointer" }}>{product.name}</h3>
        </Link>
        <Card.Text></Card.Text>
        <h5>
          <NumberFormat
            value={product.price - (product.price * product.discount) / 100}
            thousandSeparator={true}
            suffix="đ"
            displayType="text"
          />{" "}
          {product.discount !== 0 && (
            <React.Fragment>
              <NumberFormat
                className="old-price"
                value={product.price}
                thousandSeparator={true}
                suffix="đ"
                displayType="text"
              />{" "}
              <Badge variant="danger">-{product.discount}%</Badge>
            </React.Fragment>
          )}
        </h5>
        <div style={{ minHeight: "30px" }}>
          {product.reviewCount > 0 && (
            <>
              <Rating
                initialRating={product.rating}
                emptySymbol={<BsStar color="#fb7234" />}
                fullSymbol={<BsStarFill color="#fb7234" />}
                readonly
              />{" "}
              <span style={{ color: "#fb7234" }}>{product.reviewCount}</span>
            </>
          )}
        </div>
        {isAdmin && (
          <ButtonGroup className="w-100" size="sm">
            <Button
              as={Link}
              to={`/admin/edit-product/${product.id}`}
              className="mb-2"
              variant="success"
            >
              Edit
            </Button>
            <Button as={Link} to="#" className="mb-2" variant="danger">
              Delete
            </Button>
          </ButtonGroup>
        )}

        {enableBtnAddToCard && isAuth && (
          <Button onClick={addToCart} variant="primary">
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

ProductView.defaultProps = {
  isAdmin: false,
  isAuth: false,
  enableBtnAddToCard: false,
  product: null,
};

ProductView.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  enableBtnAddToCard: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
    reviewCount: PropTypes.number.isRequired,
    rating: PropTypes.number,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["Official", "Slider", "Banner"]).isRequired,
      })
    ),
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    brandName: PropTypes.string.isRequired,
  }),
};

export default ProductView;
