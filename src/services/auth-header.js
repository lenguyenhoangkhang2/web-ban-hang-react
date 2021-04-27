export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

export function accessToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return "Bearer " + user.accessToken;
  } else {
    return {};
  }
}
