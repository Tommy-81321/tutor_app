import mongoose, { Schema} from "mongoose";
const { ObjectId } = mongoose.Schema.Types

// Create Schema  
const ChargeSchema = new Schema({
    amount:{
        type: Number,
    },
    date: { 
        type:Date,
    },
    dateDeposited:{
        type:Date,
    },
    reason:{
        type:String
    },
    details:{
        type:String
    },
    clients: { type: Object, ref: "student" },

}, { timestamps: true });

const Charge = mongoose.model("charge", ChargeSchema);
export default Charge;