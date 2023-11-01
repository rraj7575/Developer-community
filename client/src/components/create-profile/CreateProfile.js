import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "./../common/TextFieldGroup";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import InputGroup from "./../common/InputGroup";
import SelectListGroup from "./../common/SelectListGroup";
import { createProfile } from "./../../actions/profileAction";
import { withRouter } from "react-router-dom";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInput: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    } = this.state;

    const profileData = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    };
    this.props.onCreateProfile(profileData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addSocialLink = (e) => {
    e.preventDefault();
    this.setState((preState) => ({
      displaySocialInput: !preState.displaySocialInput,
    }));
  };
  render() {
    const {
      handle,
      company,
      website,
      location,
      errors,
      skills,
      githubusername,
      bio,
      displaySocialInput,
      linkedin,
      twitter,
      youtube,
      instagram,
      facebook,
    } = this.state;
    let socialInputes;
    if (displaySocialInput) {
      socialInputes = (
        <div>
          <InputGroup
            onChange={this.onChange}
            placeholder="Twitter Profile URL"
            name="twitter"
            value={twitter}
            icon="fab fa-twitter"
            error={errors.twitter}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder="Facebook Profile URL"
            name="facebook"
            value={facebook}
            icon="fab fa-facebook"
            error={errors.facebook}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder="Instagram Profile URL"
            name="instagram"
            value={instagram}
            icon="fab fa-instagram"
            error={errors.instagram}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder="YouTube Profile URL"
            name="twitter"
            value={youtube}
            icon="fab fa-youtube"
            error={errors.youtube}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder="Linkdin Profile URL"
            name="linkdin"
            value={linkedin}
            icon="fab fa-linkedin"
            error={errors.linkedin}
          />
        </div>
      );
    }
    const options = [
      { label: "* Select Professional Status", value: "0" },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Intern", value: "Intern" },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  options={options}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                />
                <TextAreaFieldGroup
                  placeholder="Sort Bio"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    onClick={this.addSocialLink}
                    className="btn btn-light"
                  >
                    Add social link
                  </button>
                  <span className="text-muted"> optional </span>
                </div>
                {socialInputes}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...createProfile(dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile));
