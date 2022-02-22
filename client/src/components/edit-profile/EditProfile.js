import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import TextFieldGroup from './../common/TextFieldGroup'
import TextAreaFieldGroup from './../common/TextAreaFieldGroup'
import InputGroup from './../common/InputGroup'
import SelectListGroup from './../common/SelectListGroup'
import {createProfile, getProfile} from './../../actions/profileAction'
import {withRouter, Link} from 'react-router-dom'
import isEmpty from './../../validation/is-empty'

class CreateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      displaySocialInput: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
    if (nextProps.profile.profile) {
      // const {skills} = nextProps.profile
      const profile = {...nextProps.profile.profile}
      const skillsCSV = profile.skills.join(',')
      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.status = !isEmpty(profile.status) ? profile.status : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''


      // profile.company = !isEmpty(profile.company) ? profile.company : ''
      // profile.website = !isEmpty(profile.website) ? profile.website : ''
      // profile.status = !isEmpty(profile.status) ? profile.status : ''
      // profile.location = !isEmpty(profile.location) ? profile.location : ''
      // profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
      // profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      // profile.social = !isEmpty(profile.social) ? profile.social : {}
      // profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
      // profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
      // profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
      // profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
      // profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        social: profile.social,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {handle, company, website, location, status,
      skills, githubusername, bio, twitter, facebook,
      linkedin, youtube, instagram} = this.state

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
      instagram
    }
    this.props.onCreateProfile(profileData, this.props.history)
  }


  onChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  addSocialLink = (e) => {
    e.preventDefault()
    this.setState(preState => ({
      displaySocialInput: !preState.displaySocialInput
    }))
  }
  render(){
    const {handle, company, website, location, errors,
      skills, githubusername, bio, displaySocialInput,
      linkedin, twitter, youtube, instagram, facebook, status} = this.state
    let socialInputes
    if (displaySocialInput) {
      socialInputes = (
        <div>
          <InputGroup
            onChange={this.onChange}
            placeholder='Twitter Profile URL'
            name='twitter'
            value={twitter}
            icon='fab fa-twitter'
            error={errors.twitter}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder='Facebook Profile URL'
            name='facebook'
            value={facebook}
            icon='fab fa-facebook'
            error={errors.facebook}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder='Instagram Profile URL'
            name='instagram'
            value={instagram}
            icon='fab fa-instagram'
            error={errors.instagram}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder='YouTube Profile URL'
            name='youtube'
            value={youtube}
            icon='fab fa-youtube'
            error={errors.youtube}
          />
          <InputGroup
            onChange={this.onChange}
            placeholder='Linkdin Profile URL'
            name='linkedin'
            value={linkedin}
            icon='fab fa-linkedin'
            error={errors.linkedin}
          />
        </div>
      )
    }
    const options = [
      {label: '* Select Professional Status', value: '0'},
      {label: 'Developer', value: 'Developer'},
      {label: 'Junior Developer', value: 'Junior Developer'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: 'Intern', value: 'Intern'},
    ]
    return(
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className="btn btn-light">
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Edit your profile</h1>
              <small className='d-block pb-3'>* = required field </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Profile handle'
                  name='handle'
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}

                />
                <SelectListGroup
                  placeholder='Status'
                  name='status'
                  value={status}
                  options={options}
                  onChange={this.onChange}
                  error={errors.status}
                  info='Give us an idea of where you are at in your career'
                />
                <TextFieldGroup
                  placeholder='Company'
                  name='company'
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder='Website'
                  name='website'
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                />
                <TextFieldGroup
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder='* Skills'
                  name='skills'
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                />
                <TextFieldGroup
                  placeholder='Github Username'
                  name='githubusername'
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                />
                <TextAreaFieldGroup
                  placeholder='Sort Bio'
                  name='bio'
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className='mb-3'>
                  <button onClick={this.addSocialLink}
                          className='btn btn-light'>
                    Add social link
                  </button>
                  <span className='text-muted'> optional </span>
                </div>
                {socialInputes}
                <input type='submit' value='Submit' className='btn btn-info btn-block mt-4'/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  onCreateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => {
  return{
    ...createProfile(dispatch),
    ...getProfile(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile))