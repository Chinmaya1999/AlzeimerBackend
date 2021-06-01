const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");
//const fast2sms=require('fast-two-sms');

router.post("/signup", async (req, res) => {
    // console.log(req.body);
    const { email, password, phone } = req.body;
    try {
        const user = new User({ email, password, phone });
        await user.save();
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({ token });
    } catch (err) {
        res.status(424).send(err.message);
    }
    
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).send("Must provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ error: "Email not found" });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({ token, user });
    } catch (err) {
        return res.status(422).send({ error: "Invalid password" });
    }
});

/*router.post("/sendMessage",async (req,res)=>{
    const { email, password, phone } = req.body;
    API_KEY="kYC8XGxNcTKrBMwDIUm5Fq23buhvS41jyWlgsd67QfRJPzZeEAbjWY9mOcy5zKe4N6UhsVXnwFl7tgpS";
    mg="ghjgjgjjgjgjggjgjg";
    const response = await fast2sms.sendMessage({authorization : API_KEY,
                        message:msg,
                        numbers:[phone]});
    res.send(response);
});*/

module.exports = router;
