import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import TextAreaFieldGroup from './../common/TextAreaFieldGroup'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from "../common/TextFieldGroup";
import { addExperience } from './../../actions/profileAction'

class AddExperience extends Component {
  constructor(){
    super()
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: '',
      description: '',
      errors: {},
      disabled: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { company, current,from, to, title, location, description } = this.state
    const expData = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    }
    this.props.onAddExperience(expData, this.props.history)
  }

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  render() {
    const { errors, company, from, to, location, title, disabled, current, description } = this.state
    return(
      <div className='add-experience'>
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to='/dashboard' className="btn btn-light">
              Go Back
            </Link>
              <h1 className="display-4 text-center">
                Add Experience
              </h1>
              <p className="lead text-center"> Add Your Job Experience</p>
              <small className="d-block pb-3">* require fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder='* Company'
                name='company'
                value={company}
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder='* Job Title'
                name='title'
                value={title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder='Location'
                name='location'
                value={location}
                onChange={this.onChange}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name='from'
                type='date'
                value={from}
                onChange={this.onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name='to'
                type='date'
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
                placeholder='Job Description'
                name='description'
                value={description}
                onChange={this.onChange}
                error={errors.description}
                info='Tell us about the position'
              />
              <input
                type="submit"
                value='Submit'
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors :PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = dispatch => {
  return {
    ...addExperience(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience))