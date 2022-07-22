 
const express= require ("express")
const mongoose = require("mongoose");
const multer=require("multer")
const postModel = require("./model/post")
const app=express()
const fs=require("fs")
const cors = require("cors");
// const url="http://localhost:3000";

//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//storage
const Storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:Storage
}).single("testimage")

const port = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://sandip12:Sandip@12@sandip.oeloehn.mongodb.net/instaclone?retryWrites=true&w=majority/inst",()=>{
    console.log("coonect to db...");
},(err)=>{
    console.log(err);
})

app.post("/post", (req, res)=> {
    uploadModel.create(req.body).then((data)=> {
        res.status(200).send(data)
})
})


// app.post("/post",(req,res)=>{
//     upload(req,res,(err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             const newImage=new postModel({
//                 author:req.body.name,
//                 location:req.body.location,
//                 description:req.body.description,
//                 date:req.body.date,
//                 image:{
//                     data:fs.readFileSync("uploads/" +req.file.filename) ,
//                     contentType:"image/png"
//                 }
//             })
//             newImage.save().then(()=>{
//                 res.send("success")
//             }).catch((err)=>{
//                 console.log(err)
//             })
//         }
//     })
// })


// app.get("/", (req,res)=>{
//     try{
//         postModel.find().sort({_id:-1}).then((allData)=>{
            
//             res.status(200).send(allData)
//         })
//     }catch(err){
//         console.log(err)
//     }
// })

app.get("/images", (req, res)=> {
    uploadModel.find().then((imageData)=> {
        res.status(200).send({images: imageData});
    })
})
app.listen(port, function() {
    console.log("Server started.......on",port);
});