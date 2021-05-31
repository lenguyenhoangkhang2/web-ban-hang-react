import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import OrderApi from "../../api/order";
import OrderListItem from "../OrderListItem";
import PropTypes from "prop-types";

const OrderList = ({ isAdmin }) => {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const getListOrder = async () => {
      try {
        let response;
        if (isAdmin) {
          response = await OrderApi.getAll();
        } else {
          response = await OrderApi.getAllByUser();
        }
        setListOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListOrder();
  }, [isAdmin]);

  return listOrder.length > 0 ? (
    listOrder.map((order) => (
      <Row key={order.id}>
        <Col>
          <OrderListItem isAdmin={isAdmin} order={order} />
        </Col>
      </Row>
    ))
  ) : (
    <div className="text-center">
      <strong>CHƯA CÓ ĐƠN HÀNG NÀO ĐƯỢC ĐẶT</strong>
    </div>
  );
};

OrderList.defaultProps = {
  isAdmin: false,
};

OrderList.propTypes = {
  isAdmin: PropTypes.bool,
};

export default OrderList;
