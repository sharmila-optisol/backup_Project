import mongoose from "mongoose";

export let UserSchema = new mongoose.Schema({
    username:{type:String,required :true},
    email:{type:String,required :true,unique:true},
    password:{type:String},
    googleId:{type:String},
    isVerified:{type:Boolean},
    emailToken:{type:String},
    isAdmin:{type:Boolean,default:false},
    img:{type:String},
},
    {timestamps:true}
)

export let User = mongoose.model("User",UserSchema);
