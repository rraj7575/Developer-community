import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "./../../actions/profileAction";

class Experience extends Component {
  onClickDeleteExperience = (id) => {
    this.props.onDeleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map((exp) => {
      const { _id, company, title, from, to } = exp;
      return (
        <tr key={_id}>
          <td> {company} </td>
          <td> {title} </td>
          <td>
            <Moment date={from} format="YYYY/MM/DD" />-
            {to === null ? "Now" : <Moment date={to} format="YYYY/MM/DD" />}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.onClickDeleteExperience(_id)}
            >
              {" "}
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h4 className="mb-4"> Experience Credentials </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Titles</th>
              <th>Years</th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  onDeleteExperience: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...deleteExperience(dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Experience);
