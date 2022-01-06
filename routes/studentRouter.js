import express from "express";

// Item model to find data in DB
import Student from "../models/Student.model";

// Auth middleware
import protectRouter from "../middlewares/protectRouter";

const studentRouter = express.Router();

// @route     GET api/Students/getall
// @desc      Get All Students
// @access    Public
studentRouter.get("/getall", async(req, res) => {
    try {
        const response = await Student.find().sort({ date: -1 });
        res.json(response);
    } catch (error) {
        console.log(error)
    }
});

// @route     GET api/Students/getone/:id
// @desc      GET a single Student based on StudentId
// @access    Public
studentRouter.get("/getone/:id", async(req, res) => {
    try {
        const StudentId = req.params.id
        const foundStudent = await Student.findById(StudentId)
        res.json(foundStudent);
    } catch (error) {
        console.log(error)
    }
});

// @route     Student api/Students
// @desc      Create a Student
// @access    Private (implement auth later)
studentRouter.post("/", async(req, res) => {
    const { 
    firstName,
    lastName,
    courseType,
    parentsName,
    familyEmail,
    familyPhone,
    familyAddress,
    familyAddress2,
    familyCity,
    familyState,
    familyZip,
    email,
    city,
    state,
    zip,
    phoneNumber,
    skillLevel,
    birthDate,
    startDate,
    school,
    courses,
    note,
    status,
    receivesEmail,} = req.body
    console.log(req.user)
    try {
        const newStudent = new Student({
            firstName,
            lastName,
            courseType,
            parentsName,
            familyEmail,
            familyPhone,
            familyAddress,
            familyAddress2,
            familyCity,
            familyState,
            familyZip,
            email,
            city,
            state,
            zip,
            phoneNumber,
            skillLevel,
            birthDate,
            startDate,
            school,
            courses,
            note,
            status,
            receivesEmail,
        });
        const registeredStudent = await newStudent.save();
        res.json(registeredStudent);
    } catch (error) {
        console.log(error)
    }
});

// @route     delete api/Students/:id
// @desc      Delete a Student
// @access    Private (implement auth later)
studentRouter.delete("/:id", protectRouter, async(req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.id);

        // Check if user is the one who created Student
        if (req.body.reqOwner !== foundStudent.owner) {
            res.json({ msg: "You do not have access to delete this Student." })
        } else {
            foundStudent.remove().then(() => res.json({ success: true, msg: "Succesfully deleted Student" }));
        }
    } catch (error) {
        res.status(404).json({ success: false });
    }
});

export default studentRouter;