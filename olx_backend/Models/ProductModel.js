import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    pname: {
        type: String
    },
    pdesc: {
        type: String
    },
    pcate:{
        type:String
    },
    pprice:{
        type:String
    },
    pimage:{
        type:String
    }
})

export default mongoose.model("Product", productSchema)