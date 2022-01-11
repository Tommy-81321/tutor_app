import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types

// Create Schema  
const PaymentSchema = new Schema({
    amount:{
        type: Number,
    },
    creditAmount:{
        type: Number,
    },
    paymentDate: { 
        type:Date,
    },
    dateDeposited:{
        type:Date,
    },
    PaymentDetails:{
        type:String
    },
    clients: { type: Object, ref: "student" },

}, { timestamps: true });

const Payment = mongoose.model("payment", PaymentSchema);
export default Payment;