const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {type : String, unique : true, trim : true, required : [true, 'Name must be required']},
    email : {type : String, unique : true, trim : true, required : [true, 'Email must be required']},
    password : {type : String, trim : true, required : [true, 'Password must be required'], minlength: [6,
         'At least 6 character']}
}, {timestamps: true})

userSchema.pre('save', function(next) { //Pre is middleware of mongoose
    let user = this
    bcrypt.hash(user.password, 10, function(err, hash) { //bcypt.hash is func to hash password
        if(err){
            console.log(err)
            return next(err)
            
        }else{
            user.password = hash
            next()
        }
    })
})

const User = mongoose.model('User', userSchema)

module.exports = User