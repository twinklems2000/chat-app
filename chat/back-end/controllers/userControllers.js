const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/userModel')

const jwtkey = 'chat'

module.exports.register = async (req, res) => {
  let error = validationResult(req)

  if (!error.isEmpty()) {
    res.send(error)
  } else {
    let result = await User.findOne(req.body)
    if (result === null) {
      let user = new User(req.body)
      let data = await user.save()
      Jwt.sign({ data }, jwtkey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          res.send({
            errors: [
              { msg: 'Something went wrong, please try after some time' },
            ],
          })
        } else {
          let hashPassword = bcrypt.hashSync(data.password, 10)
          data.password = hashPassword
          data = data.toObject()
          res.send({ data, auth: token })
        }
      })
    } else {
      res.send({
        errors: [{ msg: 'User already exist' }],
      })
    }
  }
}

module.exports.login = async (req, res) => {
  let error = validationResult(req)

  if (!error.isEmpty()) {
    res.send(error)
  } else {
    let result = await User.findOne(req.body)
    if (result !== null) {
      Jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          res.send({
            errors: [
              { msg: 'Something went wrong, please try after some time' },
            ],
          })
        } else {
          let hashPassword = bcrypt.hashSync(result.password, 10)
          result.password = hashPassword
          result = result.toObject()
          res.send({ result, auth: token })
        }
      })
    } else {
      res.send({ errors: [{ msg: 'User not found' }] })
    }
  }
}

module.exports.setAvatar = async (req, res) => {
  let userId = req.params.id
  let avtarImg = req.body.image
  let result = await User.findByIdAndUpdate(userId, {
    isAvtarImgSet: true,
    avtarImg,
  })
  if (result !== null) {
    res.send({ isSet: result.isAvtarImgSet, image: result.avtarImg })
  } else {
    res.send({ errors: [{ msg: 'User not found' }] })
  }
}

module.exports.getAllUser = async (req, res) => {
  try {
    let result = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'avtarImg',
      'name',
      '_id',
    ])
    res.send(result)
  } catch (error) {
    res.send(error)
  }
}
