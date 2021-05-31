import React, { useState, useEffect } from "react";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Alert from "react-s-alert";

import "./App.css";

import AuthApi, * as AuthService from "./api/auth";

import { ACCESS_TOKEN } from "./constants";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import SaveProduct from "./components/SaveProduct";

import Header from "./parts/Header";
import Home from "./parts/Home";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import CategoryPage from "./components/CategoryPage";
import CheckoutPage from "./components/Checkout";
import Stripe from "./components/Stripe";
import PaymentCancel from "./components/Checkout/cancel";
import PaymentSuccess from "./components/Checkout/success";
import AdminRoute from "./components/Admin/AdminRoute";
import AdminOrderList from "./components/Admin/AdminOrderList";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [hasUpdateCurrentUser, setHasUpdateCurrentUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      return;
    }

    const getUser = async () => {
      try {
        const response = await AuthApi.getCurrentUser();
        const user = response.data;

        setCurrentUser(user);
        setAuthenticated(true);
        setIsAdmin(user.authorities.includes("ROLE_ADMIN"));
        setAuthLoading(false);
      } catch (err) {
        setAuthLoading(false);
        Alert.error("Oops! Something went wrong. Please try again!");
      }
    };
    setHasUpdateCurrentUser(false);
    getUser();
  }, [authenticated, hasUpdateCurrentUser]);

  const signupHandle = async (e, data) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const response = await AuthApi.signup(data.name, data.email, data.password);
      setAuthLoading(false);
      history.replace("/login");
      Alert.success(
        response.data.message || "User registration successful. Please login!"
      );
    } catch (err) {
      setAuthLoading(false);
      Alert.error(
        (err && err.message) || "Oops! Something went wrong. Please try again!"
      );
    }
  };

  const loginHandler = async (e, authData) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const response = await AuthApi.login(authData.email, authData.password);
      const accessToken = response.data.accessToken;
      localStorage.setItem(ACCESS_TOKEN, accessToken);

      setAuthenticated(true);
      setAuthLoading(false);

      history.push("/home");

      Alert.success("Login successfully");
    } catch (err) {
      setAuthLoading(false);
      Alert.error(
        err.response.data.message || "Oops! Something went wrong. Please try again!"
      );
    }
  };

  const logOut = async () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    setIsAdmin(false);

    Alert.success("You're logged out!");
  };

  return (
    <div>
      <Header currentUser={currentUser} isAdmin={isAdmin} logOut={logOut} />

      <div className="container mt3">
        <Switch>
          <Route
            exact
            path={["/", "/home"]}
            render={(props) => <Home isAdmin={isAdmin} {...props} />}
          />
          <Route
            path={"/login"}
            render={(props) => (
              <Login
                onLogin={loginHandler}
                isAuthentication={authenticated}
                loading={authLoading}
                {...props}
              />
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <Signup
                onSignup={signupHandle}
                isAuthentication={authenticated}
                loading={authLoading}
                {...props}
              />
            )}
          ></Route>

          {!authLoading && (
            <PrivateRoute
              path="/profile"
              authenticated={authenticated}
              currentUser={currentUser}
              updateCurrentUser={() => setHasUpdateCurrentUser(true)}
              component={Profile}
            ></PrivateRoute>
          )}
          {!authLoading && (
            <PrivateRoute
              path="/cart"
              authenticated={authenticated}
              currentUser={currentUser}
              component={CartPage}
            ></PrivateRoute>
          )}
          {/* <Route
            exact
            path="/smart-phone"
            render={}
          ></Route>
          <Route
            exact
            path="/laptop"
            component={OAuth2RedirectHandler}
          ></Route> */}

          <Route
            path="/oauth2/redirect"
            oauth2Login={() => setAuthenticated(true)}
            component={OAuth2RedirectHandler}
          ></Route>
          {isAdmin && <Route exact path={"/admin/add-product"} component={SaveProduct} />}
          {isAdmin && (
            <Route
              exact
              path="/admin/edit-product/:productId"
              render={(props) => <SaveProduct editMode={true} {...props} />}
            ></Route>
          )}
          <Route
            exact
            path="/products/:productId"
            render={(props) => (
              <ProductPage
                isAuth={authenticated}
                isAdmin={isAdmin}
                enableBtnAddToCard={true}
                {...props}
              />
            )}
          ></Route>
          <Route
            path="/smartphone"
            render={(props) => (
              <CategoryPage type="SmartPhone" isAuth={authenticated} isAdmin={isAdmin} />
            )}
          ></Route>
          <Route
            path="/laptop"
            render={(props) => (
              <CategoryPage type="Laptop" isAuth={authenticated} isAdmin={isAdmin} />
            )}
          ></Route>
          <Route
            exact
            path="/checkout"
            render={(props) => (
              <CheckoutPage
                isAuth={authenticated}
                currentUser={currentUser}
                updateCurrentUser={() => setHasUpdateCurrentUser(true)}
                {...props}
              />
            )}
          ></Route>
          <Route
            exact
            path="/checkout/stripe"
            render={(props) => <Stripe isAuth={authenticated} {...props} />}
          ></Route>
          <Route exact path="/checkout/success" component={PaymentSuccess}></Route>
          <Route exact path="/checkout/cancel" component={PaymentCancel}></Route>

          {!authLoading && (
            <AdminRoute
              exact
              path="/admin/orders"
              isAdmin={isAdmin}
              component={AdminOrderList}
            ></AdminRoute>
          )}
          <Route component={Error}></Route>
        </Switch>
      </div>

      <Alert
        stack={{ limit: 3 }}
        timeout={3000}
        position="top-right"
        effect="slide"
        offset={65}
      />
    </div>
  );
};

export default App;
