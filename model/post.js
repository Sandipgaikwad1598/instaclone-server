const mongoose =require("mongoose")

const postSchema=new mongoose.Schema({
    image:{
        type:String,
        require:true
       
    },
    author:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
     likes:{
        type:String,
    }

})
const postModel=mongoose.model("post",postSchema)

module.exports=postModel