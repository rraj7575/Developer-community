import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-md-3 col-4 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt="user"
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center"> {profile.user.name}</h1>
              <p className="lead text-center">
                {" "}
                {profile.status}{" "}
                {isEmpty(
                  profile.company ? null : <span>at {profile.company}</span>
                )}{" "}
              </p>
              <p>
                {" "}
                {isEmpty(
                  profile.location ? null : <span>at {profile.location}</span>
                )}{" "}
              </p>
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blanck"
                  >
                    <i className="fas fa-globe fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blanck"
                  >
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blanck"
                  >
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blanck"
                  >
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blanck"
                  >
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )}
                {isEmpty(
                  profile.instagram && profile.social.instagram
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blanck"
                  >
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
