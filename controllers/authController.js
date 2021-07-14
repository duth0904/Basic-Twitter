const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
    try {
        
        const user = await User.create(req.body)
        const token = jwt.sign({userID : user._id}, process.env.APP_SECRET)
        res.status(200).json({
            status: 'Success',
            data : {token, userName : user.name}
        })
    } catch (error) {
        res.json(error)
    }
}

exports.login = async (req, res, next) =>{
    try {
        const user = await User.findOne({email : req.body.email})
        if(!user){
            //Error
        }
        if(await bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign({userID : user._id}, process.env.APP_SECRET)
            res.status(200).json({
                status : 'Success',
                data : {token, userName : user.name}
            })
        }else {
            // Error
        }
    } catch (error) {
        
    }
}

exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = {user : null}
        if(req.user){
            const user = await User.findOne({_id : req.user.userID})
            data.user = {userName : user.name}
        }
        res.status(200).json({
            status : 'success',
            data: data
        })
    } catch (error) {
        res.json(error)
    }
}