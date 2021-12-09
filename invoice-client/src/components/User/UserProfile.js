import React, { useState, useEffect } from 'react'
import DashboardHeader from '../Dashboard/DashboardHeader'
import SideMenuSettings from './SideMenuSettings'
import UseScreenSize from '../Hooks/UseScreenSize'
import DropdownUser from './DropdownUser'
import SideMenuDesktop from '../SideMenuDesktop'
import RenderAvatar from '../ReusableComponents/RenderAvatar'
import history from '../../history'
import { connect } from 'react-redux'
import { fetchCurrentUser, updateUser,fetchCurrentLocation } from '../../actions'
import { BsFillPersonFill } from 'react-icons/bs'

const UserProfile = ({location, fetchCurrentUser, currentUser, updateUser,fetchCurrentLocation,routing }) => {
  const getLocalStorageData = JSON.parse(localStorage.getItem('userInput'))

  const [userInput, setUserInput] = useState({
    name: getLocalStorageData ? getLocalStorageData.userInput.name : '',
    email: getLocalStorageData ? getLocalStorageData.userInput.email : '',
    uploadPhoto: null
  })

  const [selectImage, setSelectedImage] = useState(null)

  const viewportWidth = UseScreenSize()
  


  useEffect(() => {
    fetchCurrentUser()

    if (currentUser) {
      loadUserInputData()
    }
    fetchCurrentLocation(location.pathname.replace('/',''))
  }, [])

  useEffect(() => {
    localStorage.setItem('userInput', JSON.stringify({ userInput }))
  }, [userInput])

  const loadUserInputData = () => {
    setUserInput({
      ...userInput,
      email: currentUser.email,
      name: currentUser.name,
      uploadPhoto: currentUser.avatar
    })
  }


  const renderUploadAvatar = () => {
    if (currentUser) {
      if (selectImage) return <img src={selectImage} alt='avatar' />

      if (currentUser.avatar)
        return <img src={currentUser.avatar} alt='avatar' />

      return <BsFillPersonFill className='icon' />
    }
  }

  const renderProfilePictureLabel = () => {
    if (currentUser) {
      return currentUser.avatar ? 'Change Picture' : 'Upload Picture'
    }
  }

  const updateAvatar = e => {
    if (e.target.files && e.target.files[0])
      setUserInput({
        ...userInput,
        uploadPhoto: e.target.files[0]
      })
    setSelectedImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('_id', currentUser._id)
    formData.append('name', userInput.name)
    formData.append('email', userInput.email)
    formData.append('avatar', userInput.uploadPhoto)

    updateUser(formData)
    history.push('/dashboard')
  }

  const removeAvatar = e => {
    e.preventDefault()
    setUserInput({ ...userInput, uploadPhoto: null })
    setSelectedImage('uploads/none_avatar.png')
  }


  return (
    <div className='user-profile'>
        <DashboardHeader currentLocation = {routing?routing.location:''}/> 
      {viewportWidth >= 1280 && <SideMenuDesktop />}
      <div className='content-wrapper container'>
        <div className='content-wrapper__top'>
          <div className='profile-picture'>
          <RenderAvatar avatar = {currentUser?currentUser.avatar:''}/>
          </div>

          <h2 className='profile-name'>
            {currentUser ? currentUser.name : ''} / Edit Profile
          </h2>
        </div>

        <div className='content-wrapper__content'>
        
          {viewportWidth < 767 ? (currentUser && currentUser.password? <DropdownUser />:null) : <SideMenuSettings />}

          <form
            className='form-profile-details'
            onSubmit={e => handleSubmit(e)}
          >
            <div className='form-heading'>
              <div className='profile-picture'>{renderUploadAvatar()}</div>

              <div className='btn-containers'>
                <div className='file-input'>
                  <input
                    type='file'
                    id='file'
                    className='file'
                    onChange={e => updateAvatar(e)}
                  />
                  <label id='label-file' for='file'>
                    {renderProfilePictureLabel()}
                  </label>
                </div>

                <button onClick={e => removeAvatar(e)}>Remove Picture</button>
              </div>
            </div>

            <div className='input-field'>
              <label className='primary-form-label'> Email </label>
              <input
                className='primary-form-text-input'
                type='text'
                value={userInput.email}
                onChange={e =>
                  setUserInput({ ...userInput, email: e.target.value })
                }
              />
            </div>

            <div className='input-field'>
              <label className='primary-form-label'> Name </label>
              <input
                className='primary-form-text-input'
                type='text'
                value={userInput.name}
                onChange={e =>
                  setUserInput({ ...userInput, name: e.target.value })
                }
              />
            </div>

            <button className='btn-submit' type='submit'>
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    routing: state.routing
  }
}

export default connect(mapStateToProps, { fetchCurrentUser, updateUser,fetchCurrentLocation })(
  UserProfile
)
