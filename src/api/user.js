import axiosClient from "./axiosClient";

const UserApi = {
  updateInfo: (userInfo) => {
    const url = "/user/info";
    return axiosClient.put(url, {
      phone: userInfo.phone,
      country: userInfo.country,
      province: userInfo.province,
      district: userInfo.district,
      detail: userInfo.detail,
    });
  },
};

export default UserApi;
