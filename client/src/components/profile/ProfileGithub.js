import React, { Component } from "react";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      clientSecret: "",
      count: 5,
      sort: "created: asc",
      repos: [],
    };
  }

  render() {
    return <div>{/*<h1>Profile About  </h1>*/}</div>;
  }
}

export default ProfileGithub;
