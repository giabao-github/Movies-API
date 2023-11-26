// yarn add jsonwebtoken
import jwt from 'jsonwebtoken';

// create token to encrypt data
const createToken = (data) => {
    // HS256
    let token = jwt.sign({ data }, "MOVIES", { expiresIn: "5y" });
    return token;
}

// check valid token
const checkToken = (token) => {
    return jwt.verify(token, "MOVIES");
}

// decrypt token
const decodeToken = (token) => {
    return jwt.decode(token);
}

const lockApi = (req, res, next) => {
    try {
        let { token } = req.headers;
        console.log(token)

        checkToken(token);
        next();

    }
    catch (exception) {
        console.log(exception.message)
        res.status(401).send("Access denied!");
    }

}

export {
    createToken,
    checkToken,
    decodeToken,
    lockApi
}