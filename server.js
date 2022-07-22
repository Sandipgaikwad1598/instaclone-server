
const express = require("express")
const mongoose = require("mongoose");
const postModel = require("./model/post")
const app = express()
const cors = require("cors");
// const url="http://localhost:3000";

//middleware
app.use(cors());
app.use(express.json({limit : "30mb",extended: true}));
app.use(express.urlencoded({ extended: false }))


const port = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://sandip12:Sandip@12@sandip.oeloehn.mongodb.net/instaclone?retryWrites=true&w=majority/inst", () => {
    console.log("coonect to db...");
}, (err) => {
    console.log(err);
})


app.post("/uploads", (req, res) => {
    var today = new Date();
    var option = {
        day: "numeric",
        month: "long",
        year: "numberic"
    }
    var setday = today.toLocaleDateString("en-US", option);
    postModel.create({
        author: req.body.author,
        location: req.body.location,
        image: req.body.image,
        likes: 15,
        date: setday,
        description: req.body.description,
    })
   then((post) => {
        res.send(post)
    }).catch((err) => {
        console.log(err)
    })
})

app.get("/images", (req, res) => {
    uploadModel.find().then((imageData) => {
        res.status(200).send({ images: imageData });
    }).catch((err) => { res.status(400).send(err) })
})
app.listen(port, function () {
    console.log("Server started.......on", port);
});