const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const authenticateRefreshJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

function parseJwt(token) {
    try {
        // Split the token into its parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('The token is invalid');
        }

        // Decode the payload
        const decodedPayload = atob(parts[1]);

        // Parse the decoded payload
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
}

module.exports = {authenticateJWT, parseJwt}