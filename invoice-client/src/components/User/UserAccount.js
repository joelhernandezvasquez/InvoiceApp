import React, { useEffect, useState } from 'react'
import history from '../../history'
import DropdownUser from './DropdownUser'
import DashboardHeader from '../Dashboard/DashboardHeader'
import SideMenuSettings from './SideMenuSettings'
import UseScreenSize from '../Hooks/UseScreenSize'
import SideMenuDesktop from '../SideMenuDesktop'
import RenderAvatar from '../ReusableComponents/RenderAvatar'
import Message from '../ReusableComponents/Message'
import DeleteConfirmation from '../ReusableComponents/DeleteConfirmation'
import Modal from '../Modal'
import useModal from '../Hooks/useModal'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { fetchCurrentUser, updateUserPassword, deleteUser,fetchCurrentLocation } from '../../actions'
import axios from 'axios'

const UserAccount = ({
  location,
  fetchCurrentUser,
  currentUser,
  updateUserPassword,
  deleteUser,
  fetchCurrentLocation,
  routing
}) => {
  const viewportWidth = UseScreenSize()
  const [isCorrectPassword, setCorrectPassword] = useState(null)
  const [isconfirmPassword, setConfirmPassword] = useState(null)
  const [passwordChangeMessage, setPasswordChange] = useState(null)
  const [deleteUserModal, openModal, closeModal] = useModal(false)
  const [userDeletionMessage, openMessage, closeMessage] = useModal(false)

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  useEffect(() => {
    fetchCurrentUser();
    fetchCurrentLocation(location.pathname.replace('/',''))
  }, [])

  useEffect(() => {
    if (passwordChangeMessage) {
      setTimeout(() => {
        setPasswordChange(null)
      }, 10000)
    }
  }, [passwordChangeMessage])

  useEffect(() => {
    if (userDeletionMessage) {
      setTimeout(() => {
        closeMessage()
        history.push('/login')
      }, 5000)
    }
  }, [userDeletionMessage])

  const validate = values => {
    let errors = {}

    if (!values.currentPassword) {
      errors.currentPassword = 'Required'
    }

    if (!values.newPassword) {
      errors.newPassword = 'Required'
    } else if (values.newPassword.length < 8) {
      errors.newPassword = 'Minimun 8 characters'
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required'
    } else if (values.confirmPassword.length < 8) {
      errors.confirmPassword = 'Minimun 8 characters'
    }

    return errors
  }

  const onSubmit = async (values, { resetForm }) => {
    if ((await validateCurrentPassword()) && confirmPassword()) {
      const status = await updateUserPassword(
        currentUser._id,
        formik.values.newPassword
      )
      resetForm()
      setPasswordChange(status)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  const validateCurrentPassword = async () => {
    let result = null

    try {
      const response = await axios.post(`/api/user_password`, {
        _id: currentUser._id,
        currentPassword: formik.values.currentPassword
      })
      result = response.data
      setCorrectPassword(result)
    } catch (err) {
      console.log(err)
      result = false
    }

    return result
  }

  const confirmPassword = () => {
    let result = null

    const { newPassword, confirmPassword } = formik.values
    result = newPassword === confirmPassword
    setConfirmPassword(result)
    return result
  }

  const showPasswordChangeMessage = () => {
    if (passwordChangeMessage === 200) {
      return (
        <Message
          type='success'
          title='Succesfull'
          message='Your password has been successfully changed.'
        />
      )
    }
  }

  const onDeleteUser = async () => {
    const status = await deleteUser(currentUser._id)
    closeModal()
    if (status === 200) {
      openMessage()
    }
  }

  const renderDeleteAccountConfirmation = () => {
    return (
      <div className='card'>
        <i
          class='fa fa-check-circle-o'
          id='icon-success'
          aria-hidden='true'
        ></i>
        <p className='info'>Your Account has been deleted succesfully.</p>
      </div>
    )
  }

  return (
    <div className='user-account'>
        <DashboardHeader currentLocation = {routing?routing.location:''}/> 
      {viewportWidth >= 1280 && <SideMenuDesktop />}

      {deleteUserModal ? (
        <Modal
          modalStyle={'delete-user-modal'}
          content={
            <DeleteConfirmation
              message={
                'Are you sure you want to delete your account? This action cannot be undone.'
              }
              cancelAction={closeModal}
              deleteAction={onDeleteUser}
            />
          }
          onDissmiss={closeModal}
        />
      ) : null}

      {userDeletionMessage ? (
        <Modal
          modalStyle={'account-delete-confirmation'}
          content={renderDeleteAccountConfirmation()}
        />
      ) : null}

      <div className='user-account__wrapper container'>
        <div className='wrapper-top'>
          <div className='profile-picture'>
            <RenderAvatar avatar={currentUser ? currentUser.avatar : ''} />
          </div>

          <h2 className='profile-name'>
            {' '}
            {currentUser ? currentUser.name : ''} / Edit Profile
          </h2>
        </div>

        <div className='wrapper-content'>
          {viewportWidth < 767 ? <DropdownUser /> : <SideMenuSettings />}

          <form
            className='wrapper-form-user-details'
            onSubmit={formik.handleSubmit}
          >
            {isCorrectPassword === false ? (
              <Message
                type='error'
                title='Something Went Wrong'
                message='The current password does not match our records'
              />
            ) : (
              ''
            )}
            {isconfirmPassword === false ? (
              <Message
                type='error'
                title='Something Went Wrong'
                message='Please check your confirmation password match the new password'
              />
            ) : (
              ''
            )}
            {showPasswordChangeMessage()}

            <div className='input-field'>
              <label className='primary-form-label' htmlFor='currentPassword'>
                {' '}
                Current Password{' '}
              </label>
              <input
                className='primary-form-text-input'
                type='password'
                name='currentPassword'
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <div className='emptyField'>
                  {formik.errors.currentPassword}
                </div>
              ) : null}
            </div>

            <div className='input-field'>
              <label className='primary-form-label' htmlFor='newPassword'>
                {' '}
                New Password{' '}
              </label>
              <input
                className='primary-form-text-input'
                type='password'
                name='newPassword'
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className='emptyField'>{formik.errors.newPassword}</div>
              ) : null}
            </div>

            <div className='input-field'>
              <label className='primary-form-label' htmlFor='confirmPassword'>
                {' '}
                Confirm Password{' '}
              </label>
              <input
                className='primary-form-text-input'
                type='password'
                name='confirmPassword'
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className='emptyField'>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>

            <button className='btn-set-password' type='submit'>
              Change Password
            </button>
          </form>

          <div className='delete-account'>
            <h2 className='delete-account-title'>Close your Account</h2>
            <p className='delete-account-text'>
              Click the button below to delete your entire Invoicely account.
              This means you will no longer be able to access your business,
              invoices and customer records, and personal financial information.
            </p>
            <button
              className='delete-account-btn-delete'
              onClick={() => openModal()}
            >
              Close Invoicely Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    routing:state.routing
  }
}
export default connect(mapStateToProps, {
  fetchCurrentUser,
  updateUserPassword,
  deleteUser,
  fetchCurrentLocation
})(UserAccount)
