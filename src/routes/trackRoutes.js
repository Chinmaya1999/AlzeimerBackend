const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");
const User = mongoose.model("User");
const router = express.Router();
const unirest= require("unirest");
router.use(requireAuth);

router.get("/getdetails", async (req, res) => {
    console.log("Hiii user info", req.user);
    res.send(req.user);
});

router.get("/tracks", async (req, res) => {
    console.log("Req is ", req.user);
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
});

router.post("/tracks", async (req, res) => {
    const { name, locations } = req.body;
    if (!name || !locations) {
        return res
            .status(422)
            .send({ error: "You must provide a name and location" });
    }
    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

router.post('/sendMessage', async (req,res)=>{
    console.log(req.user.phone);
    const API="kYC8XGxNcTKrBMwDIUm5Fq23buhvS41jyWlgsd67QfRJPzZeEAbjWY9mOcy5zKe4N6UhsVXnwFl7tgpS";

    const re = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    re.headers({
    "authorization": API
    });

    re.form({
    "message": "The patient is outside safe area",
    "language": "english",
    "route": "q",
    "numbers": req.user.phone,
});

re.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

});

module.exports = router;
