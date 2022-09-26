import mongoose from "mongoose";

const reviewSchema =new mongoose.Schema({
    username:{
        type:String,
    },
    rating:{
        type:String,
    },
    comment:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})
export const ProductSchema = new mongoose.Schema({
    title:{type:String,required :true,unique:true},
    desc:{type:String,},
    img:{type:String},
    categories:{type:Array},
    size:{type:Array},
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        default:0,
    },
    color:{type:Array},
    price:{type:Number},
    inStock:{type:Boolean,default:true}
},
    {timestamps:true}
)

export const Product = mongoose.model("Product",ProductSchema);