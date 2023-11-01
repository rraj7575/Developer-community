import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Landing extends Component {
  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard')
    // }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Center</h1>
                <p className="lead">
                  Create a developer profile and connect with other developers
                </p>
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  {" "}
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  {" "}
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...loginUser(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
