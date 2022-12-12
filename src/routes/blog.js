const express = require('express')
const bodyparser = require("body-parser");
const user_posts = require('../models/post');


const router = express.Router();
router.use(bodyparser.json())


router.post("/blog", async(req,res)=>{
    try{
        console.log("hello from posts")

        let posts = await user_posts.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            user: req.user_data,
        })

        console.log(user);

        res.json({
            status: "Success",
            posts
        })

    }catch(e){
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})



module.exports = router;