const express = require('express');
const bodyParser = require('body-parser')



const secret = "Assignment"
const jwt = require('jsonwebtoken')

const register = require('./routes/register')
const login = require('./routes/login')
const postBlog = require('./routes/blog')


const app = express();
app.use(bodyParser.json())
app.use(express.json())


app.use("/posts", (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.status(403).json({
                        status: "Failed",
                        message: err.message
                    })
                }
                req.user = decoded.data
                next();
            })
        } else {
            return res.status(404).json({
                status: "Failed",
                message: "Not authenticated user"
            })
        }
    } catch (e) {
        res.json({
            status: "Error",
            message: e.message
        })
    }
})



//Router MIddlewares
app.use(express.json());
app.use("/register", register)
app.use("/login", login)
app.use("/posts", postBlog)

module.exports = app;