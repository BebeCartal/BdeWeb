const jwt = require('jsonwebtoken');

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }
    if (headerValue && headerValue.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }
    //console.log(process.env.ACCESS_TOKEN_SECRET)
    // Véracité du token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}

module.exports = checkTokenMiddleware;