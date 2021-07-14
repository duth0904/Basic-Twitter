const jwt = require('jsonwebtoken')
exports.verifyToken = (req, res, next) => {
    const Authorization = req.header('authorization')
    //Access authorization from req header
    if(!Authorization){
        //Error
    }

    //getToken
    const token = Authorization.replace('Bearer ','')
    //Verify Token
    const {userID}  = jwt.verify(token, process.env.APP_SECRET)   
    // Assign req
    req.user = {userID}
    next()
}