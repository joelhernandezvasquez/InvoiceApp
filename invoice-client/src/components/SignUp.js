import React, { useState, useRef } from 'react'
import Message from './ReusableComponents/Message'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createUser } from '../actions'
import axios from 'axios'
import LogoIcon from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/googleIcon.svg'
import GraphicBg from '../assets/images/authGraphic.png'
import Frame from '../assets/images/Frame.png'

const SignUp = ({ createUser, users }) => {
  const [existingUser, setExistingUser] = useState(null)
  const emailInputRef = useRef()

  const initialValues = {
    name: '',
    email: '',
    password: ''
  }

  const onSubmit = async values => {
    // checking if the user has an account in the database before created it.

    const response = await axios.post('/api/existing_user', { ...values })
    const { data } = response

    if (data.userExist) {
      setExistingUser(true)
      emailInputRef.current.focus()
      return
    }
    setExistingUser(false)
    createUser(values)
  }

  const validate = values => {
    let errors = {}

    if (!values.name) {
      errors.name = 'Required'
    }

    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email Format'
    }

    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 8) {
      errors.password = 'Minimun 8 characters'
    }

    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div className='auth-container'>
      <div className='graphic'>
        <img src={GraphicBg} alt='graphic shap' />
      </div>

      <div className='container'>
        <div className='auth-header'>
          <img src={Frame} alt='computer frames' />
        </div>

        <div className='form-container'>
          <div className='inner-container'>
            <div className='logo-container'>
              <img className='logo' src={LogoIcon} alt='logo icon' />
            </div>
            <h2 className='section-title text-center'>
              Sign Up into your Invoicely account
            </h2>

            <a className='google-btn' href='/auth/google/register'>
              <img className='google-icon' src={GoogleIcon} alt='google icon' />
              <span className='btn-text'>Sign Up</span>
            </a>
            <div className='divider-line'>
              <div className='line'></div>
              <span>Or</span>
              <div className='line'></div>
            </div>

            {existingUser && (
              <Message
               type="error"
                title='Something is not quite Right.'
                message='This email has already been registered. Please choose a different email, or sign in if you are already a user.'
              />
            )}

            <form className='auth-form' onSubmit={formik.handleSubmit}>
              <div className='form-control'>
                <label className='primary-label' htmlFor='name'>
                  name
                </label>
                <input
                  className='text-field'
                  type='text'
                  name='name'
                  placeholder={'Name'}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className='emptyField'>{formik.errors.name}</div>
                ) : null}
              </div>

              <div className='form-control'>
                <label className='primary-label' htmlFor='email'>
                  email
                </label>
                <input
                  className='text-field'
                  ref={emailInputRef}
                  type='email'
                  name='email'
                  placeholder={'sarac@gmail.com'}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='emptyField'>{formik.errors.email}</div>
                ) : null}
              </div>

              <div className='form-control'>
                <label className='primary-label' htmlFor='password'>
                  password
                </label>
                <input
                  className='text-field'
                  type='password'
                  name='password'
                  placeholder={'Minimun 8 Characters'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className='emptyField'>{formik.errors.password}</div>
                ) : null}
              </div>

              <button className='btn btn-primary auth-btn' type='submit'>
                Sign Up
              </button>

              <p className='account-access-text'>
                Already have an Account? <Link to='/login'>Sign in?</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer>
        <p>Copyright © 2021 OX . All rights reserved.</p>
      </footer>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { createUser })(SignUp)
