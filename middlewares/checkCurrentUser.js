const jwt = require('jsonwebtoken')

exports.checkCurrentUser = (req, res, next) => {
    const Authorization = req.header('authorization')
    if(!Authorization){
        req.user = null
        next()
    }else{
        const token = Authorization.replace('Bearer ', '')
        try {
            const {userID} = jwt.verify(token, process.env.APP_SECRET)
            req.user = {userID}
            next()
        } catch (error) {
            req.user = null
            next()
        }  
    }
}

