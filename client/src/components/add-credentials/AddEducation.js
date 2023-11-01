import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addEducation } from "./../../actions/profileAction";

class AddEducation extends Component {
  constructor() {
    super();
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: "",
      description: "",
      errors: {},
      disabled: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { school, current, from, to, degree, fieldofstudy, description } =
      this.state;
    const expData = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    this.props.onAddEducation(expData, this.props.history);
  };

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };

  render() {
    const {
      errors,
      school,
      from,
      to,
      fieldofstudy,
      degree,
      disabled,
      current,
      description,
    } = this.state;
    return (
      <div className="add-education">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              {" "}
              Add Your School, bootcamp etc, that you have attended{" "}
            </p>
            <small className="d-block pb-3">* require fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={school}
                onChange={this.onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certificate"
                name="degree"
                value={degree}
                onChange={this.onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* Field Of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={this.onChange}
                error={errors.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={from}
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={to}
                onChange={this.onChange}
                error={errors.location}
                disabled={disabled}
              />
              {/*<div className="form-check mb-4">*/}
              {/*<input*/}
              {/*type="checkbox"*/}
              {/*name='current'*/}
              {/*className="form-check-input"*/}
              {/*value={current}*/}
              {/*checked={current}*/}
              {/*onChange={this.onCheck}*/}
              {/*/>*/}
              {/*<label htmlFor='from' className="form-check-label">*/}
              {/*Current job*/}
              {/*</label>*/}
              {/*</div>*/}
              <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about the program"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...addEducation(dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
