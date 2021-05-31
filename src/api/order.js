import axiosClient from "./axiosClient";

const OrderApi = {
  getAllByUser: () => {
    return axiosClient.get("/orders/user");
  },

  cancelOrder: (orderId) => {
    return axiosClient.put(`/orders/${orderId}?cancel`);
  },

  getAll: () => {
    return axiosClient.get("/orders/admin");
  },

  updateOrder: (orderId) => {
    const url = `/orders/${orderId}/update`;
    return axiosClient.put(url);
  },

  returnOrder: (orderId) => {
    const url = `/orders/${orderId}/return`;
    return axiosClient.put(url);
  },
};

export default OrderApi;
