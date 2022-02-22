import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {loginUser} from './../../actions/authActions'
import TextFieldGroup from './../common/TextFieldGroup'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    const userData = {
      email,
      password,
    }
    this.props.onLogin(userData)
  }

  onChangeInput = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  render(){
    const {errors, email, password} = this.state
    const {history} = this.props
    const {location} = history
    const {state} = location
    return(
     <div className='login'>
       <div className='container'>
         <div className='row'>
           <div className='col-md-8 m-auto'>
             {state && <div style={{padding: '5px'}} className='alert-success text-center'>{state.message}</div>}
             <h1 className='display-4 text-center'>Log In</h1>
             <p className='lead text-center'> Sign in to your account</p>
             <form noValidate onSubmit={this.onSubmit}>
               <TextFieldGroup
                 placeholder='Email Address'
                 name='email'
                 value={email}
                 onChange={this.onChangeInput}
                 type='email'
                 error={errors.email}
               />
               <TextFieldGroup
                 placeholder='Password'
                 name='password'
                 value={password}
                 onChange={this.onChangeInput}
                 type='password'
                 error={errors.password}
               />
               <input
                 type='submit'
                 className='btn btn-info btn-block mt-4'
               />
             </form>
           </div>
         </div>
       </div>
     </div>
    )
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => {
  return {
    ...loginUser(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)