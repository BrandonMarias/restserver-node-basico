const roleValidator = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'error al validar role'
            })
        }

        const {role} = req.user;
        if (!roles.includes(role)) {
            return res.status(401).json({
                msg: 'error de autorización'
            })
        }

        next();
    }
}


module.exports = {roleValidator}