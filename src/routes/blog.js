const express = require('express')
const bodyparser = require("body-parser");
const user_posts = require('../models/post');


const router = express.Router();
router.use(bodyparser.json())


router.get("/", async (req, res) => {
    try {
        let posts = await user_posts.find()

        res.json({
            status: "Success",
            posts
        })

    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})

router.post("/", async (req, res) => {
    try {
        let posts = await user_posts.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            user: req.user,
        })

        res.json({
            status: "Success",
            posts
        })

    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        await user_posts.updateOne({ _id: req.params.id }, { $set: req.body })

        res.json({
            status: "Success"
        })

    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})


router.delete("/:id", async (req, res) => {
    try {
        await user_posts.deleteOne({ _id: req.params.id })

        res.json({
            status: "Successly Deleted"
        })

    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;