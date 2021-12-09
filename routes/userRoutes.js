const mongoose = require('mongoose')
const User = mongoose.model('users')
const passport = require('passport')
const requireLogin = require('../middlewares/requireLogin')
const multer = require('multer')
const bcrypt = require('bcryptjs')

module.exports = app => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './invoice-client/public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'svg'
      ) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
      }
    }
  })

  // @route   POST /api/existing_user
  // @desc    determine whether the user exist in the database who previously sign up throug local passport strategy
  // @access  Public
  app.post('/api/existing_user', async (req, res) => {
    const { email } = req.body
    try {
      const existingUser = await User.findOne({ email: email })
      existingUser
        ? res.json({ userExist: true })
        : res.json({ userExist: false })
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'internal server error' })
    }
  })

  // @route   GET /api/get/users
  // @desc    get all users in saved in the database
  // @access  Private
  app.get('/api/get/users', async (req, res) => {
    try {
      const users = await User.find({}).sort({ date: -1 })
      res.json(users)
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'internal server error' })
    }
  })

  // @route     POST /api/users
  // @desc   authenticate the users signed through local-strategy
  // @access  Public

  app.post(
    '/api/users',
    passport.authenticate('local-registration'),
    (req, res) => {
      res.send(req.user)
    }
  )

  // @route     PUT /api/users/:id
  // @desc     Update the user information
  // @access  Private

  app.put(
    '/api/update_user',
    requireLogin,
    upload.single('avatar'),
    async (req, res) => {
      const { _id, email, name } = req.body
      console.log(req.body)
      // Build user object
      const userFields = {}
      if (email) userFields.email = email
      if (name) userFields.name = name

      req.file
        ? (userFields.avatar = `uploads/${req.file.filename}`)
        : (userFields.avatar = null)

      try {
        let user = await User.findById(_id)

        if (!user) return res.status(404).json({ msg: 'User Not Found' })

        user = await User.findByIdAndUpdate(
          _id,
          { $set: userFields },
          { new: true }
        )

        res.json(user)
      } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'internal server error' })
      }
    }
  )

  // @route     PUT/api/update_password
  // @desc      Update the user password
  // @access    Private

  app.put('/api/update_password', requireLogin,async (req,res)=>{
    const{_id} = req.body;
    let {newPassword} = req.body;
    console.log(req.body)
    try{
    let user = await User.findById(_id);
    if(!user) return res.status(404).json({msg:"User not found"});
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword,salt)
    newPassword = hash;
  
  user = await User.findByIdAndUpdate(
    _id,
    { $set: {password:newPassword} },
    { new: true }
  )
    res.json(user);

  }
  catch(err)
  {
    console.error(err)
    res.status(500).json({ msg: 'internal server error' })
  }
  })

  
  // @route     DELETE /api/delete_users
  // @desc     Delete a user
  // @access  Private

  app.delete('/api/delete_user/:id', requireLogin, async(req,res)=>{

  console.log(req.params.id);
    try{
     let user = await User.findById(req.params.id);
     if(!user) return res.status(404).json({msg:"User not found"});

     user = await User.findByIdAndDelete(req.params.id);
     res.status(200).json(user._id);

    }
    catch(err) {
      console.error(err)
      res.status(500).json({ msg: 'internal server error' })
    }
  })



  // @route     POST /api/login/users
  // @desc      Determine whether the user exist and return the correct access
  // @access  Public
  app.post(
    '/api/login/user',
    passport.authenticate('local'),
    async (req, res) => {
      res.json({ userExist: true })
    }
  )

  // @route     GET /api/user_password
  // @desc      Get the current password of the authenticated user
  // @access  Private

  app.post('/api/user_password', async (req, res) => {
    const { _id, currentPassword } = req.body

    try {
      const user = await User.findById({ _id })
      if (user) {
        bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
          if (err) throw error

          if (isMatch) {
            return res.status(200).json(true)
          } else {
            return res.json(false)
          }
        })
      } else {
        return res.status(404).json({ msg: 'User Not Found' })
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'internal server error' })
    }
  })
}
