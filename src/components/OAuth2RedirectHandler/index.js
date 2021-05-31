import React, { useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import Alert from "react-s-alert";
import { login } from "../../api/auth";

const OAuth2RedirectHandler = ({ oauth2Login }) => {
  const history = useHistory();
  const location = useLocation();

  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);

    history.push("/home");
    window.location.reload();
  } else {
    console.log(error);
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: location.pathname,
          },
        }}
      />
    );
  }
};

export default OAuth2RedirectHandler;
