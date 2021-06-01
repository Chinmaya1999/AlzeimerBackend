require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("./middlewares/requireAuth");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const detailRoutes = require("./routes/detailRoutes");
const mongoURI =
    "mongodb+srv://abhinav:abhinav@locationtracker.smw1h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("Connected");
});
mongoose.connection.on("error", () => {
    console.log("Error");
});

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(detailRoutes);

app.get("/", requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`);
});

app.listen(3001, () => {
    console.log("Listening on port 3001");
});
