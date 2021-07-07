import React, { useState, useEffect } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { Redirect, useHistory } from "react-router-dom";
import CartApi from "../../api/cart";
import { loadStripe } from "@stripe/stripe-js";
import SAlert from "react-s-alert";
import UserContact from "../UserContact";
import PaymentApi from "../../api/payment";

const public_key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const CheckoutPage = ({ currentUser, updateCurrentUser }) => {
  const [listItem, setListItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const getCheckout = async () => {
      const response = await CartApi.getCart();

      if (response.data.length > 0) {
        const cartTotal = response.data
          .filter(({ enable }) => enable)
          .map(({ productPrice, productDiscount, quantity }) => {
            return (
              Math.round(
                (productPrice * quantity * (100 - productDiscount)) / 100 / 10000
              ) * 10000
            );
          })
          .reduce((total, current) => total + current, 0);
        setTotalPrice(cartTotal);
        setListItem(response.data.filter(({ enable }) => enable));
      }

      setLoading(false);
    };
    getCheckout();
  }, []);

  const handleStripePayment = async () => {
    try {
      const stripePromise = await loadStripe(public_key);
      const response = await PaymentApi.addStripePayment();
      if (response.status === 200) {
        const session_id = response.data;
        stripePromise.redirectToCheckout({ sessionId: session_id });
      }
    } catch (error) {
      const message =
        error.response.data.message ||
        error.response.data ||
        error.response ||
        "Có lỗi xảy ra";
      SAlert.error(message);
    }
  };

  const handleCodPayment = async () => {
    try {
      const response = await PaymentApi.addCodPayment();
      if (response.status === 200) {
        SAlert.success(response.data.message);
        history.replace("/profile");
      }
    } catch (error) {
      if (error.response.status === 400) {
        SAlert.error(error.response.data.message);
      }
    }
  };

  console.log(loading);

  return listItem.length > 0 ? (
    <>
      <Alert variant="info">
        <h4 className="text-center mb-0">CHECK OUT</h4>
      </Alert>
      <Row className="justify-content-center">
        <Col lg="7">
          <div className="text-center">
            <strong>ĐƠN HÀNG</strong>
          </div>
          {listItem.map((item) => (
            <Row
              className="mt-3 mb-3 pt-2 pb-2 border"
              key={item.cartId}
              style={{ borderColor: "#333" }}
            >
              <Col md="3">
                <img className="img-thumbnail" src={item.productImageUrl} alt="" />
              </Col>
              <Col md="8">
                <div style={{ minHeight: "60px" }}>
                  <strong style={{ fontSize: "18px", color: "#f44336" }}>
                    {item.productName}
                  </strong>
                </div>
                <div>
                  <strong>Số lượng: {item.quantity}</strong>
                </div>
                <div className="mb-3">
                  <strong>Thành tiền: </strong>
                  <NumberFormat
                    value={
                      Math.round(
                        (item.productPrice *
                          item.quantity *
                          (100 - item.productDiscount)) /
                          100 /
                          10000
                      ) * 10000
                    }
                    thousandSeparator={true}
                    suffix="đ"
                    displayType="text"
                  />{" "}
                  {item.productDiscount > 0 && (
                    <NumberFormat
                      className="old-price"
                      value={item.quantity * item.productPrice}
                      thousandSeparator={true}
                      suffix="đ"
                      displayType="text"
                    />
                  )}
                </div>
              </Col>
            </Row>
          ))}
          <div className="mb-4">
            <strong className="cart-total-price">
              Tổng tiền:{" "}
              <NumberFormat
                value={totalPrice}
                thousandSeparator={true}
                suffix="đ"
                displayType="text"
              />
            </strong>
          </div>
        </Col>
        <Col lg={5}>
          <div className="text-center">
            <strong>THÔNG TIN LIÊN HỆ</strong>
          </div>
          {currentUser && (
            <UserContact
              country={currentUser.country}
              province={currentUser.province}
              district={currentUser.district}
              detail={currentUser.detail}
              phone={currentUser.phone}
              onUpdated={updateCurrentUser}
            />
          )}
        </Col>
      </Row>
      <Row className="justify-content-center mt-4 mb-5">
        <Col md="4" className="text-center">
          <Button variant="warning" className="w-100" onClick={handleCodPayment}>
            Thanh Toán khi nhận hàng
          </Button>
        </Col>
        <Col md="4" className="text-center">
          <Button className="w-100" onClick={handleStripePayment}>
            Thanh Toán qua Stripe
          </Button>
        </Col>
      </Row>
    </>
  ) : (
    !loading && <Redirect to="/cart" />
  );
};

export default CheckoutPage;
