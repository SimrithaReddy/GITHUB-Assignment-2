const express = require('express')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt');
const users = require('../models/user');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');

const router = express.Router()
router.use(bodyparser.json())


/**
 * Register an user
 */

router.post("/",
body('name').isAlpha(),
body('email').isEmail(),
// password must be at least 5 chars long
body('password').isLength({ min: 5 }),
async (req,res)=>{
    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        let user_data = await users.findOne({ email })

        if (user_data) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exists with that email"
            })
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.json({
                    status: "Failed",
                    message: err.message
                })
            }

            user_data = await users.create({
                name: name,
                email: email,
                password: hash
            })

            res.json({
                status: "success",
                message: "User successfully created",
                user: user_data
            })

        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})


module.exports = router