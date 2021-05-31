import React, { useState } from "react";
import { Table, Card, ListGroup, Button, Row, Col } from "react-bootstrap";
import OrderApi from "../../api/order";
import SAlert from "react-s-alert";

const orderStatus = {
  Open: { status: "Đang xử lý", nextAction: "Xác nhận" },
  Confirmed: { status: "Đã xác nhận", nextAction: "Gửi hàng" },
  Shipping: { status: "Đang gửi hàng", nextAction: "Đã nhận hàng" },
  Returned: { status: "Không nhận hàng", nextAction: "Gửi lại" },
  Collected: { status: "Đã nhận hàng" },
  Canceled: { status: "Đã hủy" },
};

const OrderListItem = ({ order, isAdmin }) => {
  const [orderItem, setOrderItem] = useState({
    id: order.id,
    status: order.status,
    updatedDate: order.updatedDate,
    createdDate: order.createdDate,
    listProductItems: order.items,
    total: order.total,
  });

  console.log(orderItem);

  const handleCancelOrder = async () => {
    try {
      const response = await OrderApi.cancelOrder(orderItem.id);
      if (response.status === 200) {
        setOrderItem({ ...orderItem, status: "Canceled" });
        SAlert.success(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 400) {
        SAlert.error(error.response.data.message);
      }
    }
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await OrderApi.updateOrder(orderItem.id);
      if (response.status === 200) {
        setOrderItem({ ...orderItem, status: response.data.orderStatus });
        SAlert.success("Cập nhật đơn hàng thành công!");
      }
    } catch (error) {
      if (error.response.status === 400) {
        SAlert.error(error.response.data.message);
      }
    }
  };

  const handleReturnOrder = async () => {
    try {
      const response = await OrderApi.returnOrder(orderItem.id);
      if (response.status === 200) {
        setOrderItem({ ...orderItem, status: "Returned" });
      }
    } catch (error) {
      if (error.response.status === 400) {
        SAlert.error(error.response.data.message);
      }
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header>
        <strong>Mã đơn hàng:</strong> {orderItem.id}
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Tình trạng:</strong> {orderStatus[orderItem.status].status}
          <br />
          <strong>Ngày đặt hàng: </strong>
          {orderItem.createdDate}
          <br />
          <strong>Cập nhật lần cuối: </strong> {orderItem.updatedDate}
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="mb-2">
            <strong>Danh sách sản phẩm</strong>
          </div>
          <Table bordered striped variant="info" size="sm">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {orderItem.listProductItems.map((item) => (
                <tr key={item.productName}>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className="text-right pr-4 pt-2 pb-2">
                  <strong>Tổng tiền: {orderItem.total}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
          <Row>
            {isAdmin && (
              <Col>
                {!["Collected", "Canceled"].includes(orderItem.status) && (
                  <Button
                    size="sm"
                    onClick={handleUpdateOrder}
                    className="mr-md-2"
                    variant="success"
                  >
                    {orderStatus[orderItem.status].nextAction}
                  </Button>
                )}
                {orderItem.status === "Shipping" && (
                  <Button size="sm" onClick={handleReturnOrder} variant="warning">
                    Đơn hàng trả về
                  </Button>
                )}
              </Col>
            )}
            <Col className="text-md-right">
              {!["Collected", "Canceled"].includes(orderItem.status) && (
                <Button size="sm" variant="danger" onClick={handleCancelOrder}>
                  Hủy đơn hàng
                </Button>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default OrderListItem;
