import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
// import ProfileGithub from './ProfileGithub'
import ProfileHeader from "./ProfileHeader";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./../common/Spinner";
import { getProfileByHandle } from "../../actions/profileAction";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.onGetProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profile
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {/*{profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}*/}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  onGetProfileByHandle: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  // errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...getProfileByHandle(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
