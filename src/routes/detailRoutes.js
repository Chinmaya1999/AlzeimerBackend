const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const User = mongoose.model("User");
const router = express.Router();
router.use(requireAuth);

router.get("/operationUser", async (req, res) => {
    res.send(req.user);
});

router.put("/operationUser", async (req, res) => {
    const { _id, phone, name, city, dist } = req.body.userData;
    User.findById(_id, function (err, p) {
        if (!p) return next(new Error("Could not load Document"));
        else {
            // do your updates here
            p.phone = phone;
            p.city = city;
            p.dist = dist;
            p.name = name;

            p.save(function (err) {
                if (err) console.log("error");
                else console.log("success");
            });
        }

        res.send(req.body.userData);
    });
});
module.exports = router;
