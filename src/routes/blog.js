const express = require('express')
const bodyparser = require("body-parser");
const user_posts = require('../models/post');


const router = express.Router();
router.use(bodyparser.json())


router.post("/", async(req,res)=>{
    try{
        console.log("Hello");
        let posts = await user_posts.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            user: req.user,
        })


        

//   let user_one = await user_posts.findOne({_id: posts.user._id }).populate("user").then(user => {
//       console.log(user,"I am user");
//    });
//         console.log(user_one, "I am POSTS");

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