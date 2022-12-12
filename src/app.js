const express = require('express');
const bodyParser = require('body-parser')



const secret = "Assignment"
const jwt = require('jsonwebtoken')

const register = require('./routes/register')
const login = require('./routes/login')
const postBlog = require('./routes/blog')


const app = express();


// app.use("/blog", (req, res, next) => {
//     try {
//         let token = req.headers.authorization;
//         if (token) {
//             jwt.verify(token, secret, function (err, decoded) {
//                 console.log(decoded);
//                 if (err) {
//                     return res.status(403).json({
//                         status: "Failed",
//                         message: err.message
//                     })
//                 }
//                 req.user_data = decoded.data
//                 next();
//             })
//         } else {
//             return res.status(404).json({
//                 status: "Failed",
//                 message: "Not authenticated user"
//             })
//         }
//     } catch (e) {
//         res.json({
//             status: "Error",
//             message: e.message
//         })
//     }
// })



//Router MIddlewares
app.use(express.json());
app.use("/", register)
app.use("/", login)
app.use("/", postBlog)

module.exports = app;