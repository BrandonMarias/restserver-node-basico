const jwt = require('jsonwebtoken')

const jwtValidation = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'sin autorización'
        })
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.PRIVATEKEY)

        req.uid = uid;

        next()
    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: 'token no valido'
        })
    }

    console.log(token)
}

module.exports = { jwtValidation}