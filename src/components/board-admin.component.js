import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.message && error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h3>{this.state.content}</h3>
        </div>
      </div>
    );
  }
}
