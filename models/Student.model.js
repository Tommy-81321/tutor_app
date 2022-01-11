import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types

// Create course duration Schema  
const CourseDurationSchema = new Schema({
    start: {
        type: Date,
    },
    startTimezone: {
        type: Date,
        default: null
    },
    end: {
        type: Date,
    },
    endTimezone:  {
        type: Date,
        default: null
    },
    isAllDay: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    description: {
        type: String,
        default: ""
    },
    recurrenceRule: {
        type: String
    },
    recurrenceId: {
        type: String
    },
    recurrenceExceptions: {
        type: String
    },
    roomId: {
        type: Number,
        default: 1
    }
});
// Create charge Schema  
const ChargeSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
    },
    dateDeposited: {
        type: Date,
    },
    reason: {
        type: String
    },
    details: {
        type: String
    }
}, { timestamps: true });

// Create payment Schema  
const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    creditAmount: {
        type: Number,
    },
    paymentDate: {
        type: Date,
    },
    dateDeposited: {
        type: Date,
    },
    paymentDetails: {
        type: String
    }

}, { timestamps: true });

// Create Schema  
const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    courseType :{
        type: String,
    },
    parentsName:{
        type: String
    },
    familyEmail:{
        type: String,
    },
    familyPhone:{
        type: Number,
    },
    familyAddress:{
        type: String,
    },
    familyAddress2:{
        type: String,
    },
    familyCity:{
        type: String,
    },
    familyState:{
        type: String,
    },
    familyZip:{
        type: String,
    },
    email:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    zip:{
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    skillLevel: {
        type: String
    },
    birthDate:{
        type: Date
    },
    startDate:{
        type: Date
    },
    school: {
        type: String
    },
    courses: [],
    note: {
        type: String
    },
    status: {
        type: Boolean
    },
    receivesEmail: {
        type: Boolean
    },
    payment: [PaymentSchema],
    charge: [ChargeSchema],
    courseDuration: [CourseDurationSchema]

}, { timestamps: true });

const Student = mongoose.model("student", StudentSchema);
export default Student;