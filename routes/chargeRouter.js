import express from "express";

import protectRouter from "../middlewares/protectRouter"

import Student from "../models/Student.model"

const chargeRouter = express.Router();

// @route     Student api/charges/:studentId
// @desc      Student charge
// @access    Private (implement auth later)
chargeRouter.get("/:studentId", async(req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.studentId);
        res.json(foundStudent.charge);
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: "Could not get charges from Student", error })
    }
});

// @route     Student api/charges/:studentId
// @desc      Student charge
// @access    Private (implement auth later)
chargeRouter.post("/:studentId", protectRouter, async(req, res) => {
    try {
        const { amount, date, dateDeposited, reason, details } = req.body;
        const newcharge = { amount, date, dateDeposited, reason, details }
        const newStudentCharge = await Student.findByIdAndUpdate(
            req.params.studentId, {
                $push: {
                    charge: newcharge,
                },
            }, {
                new: true,
            }
        ).exec((err, result) => {
            if (err) {
                return res.status(422).json({
                    error: err,
                    msg: "Please provide correct owner name, owerId and studentId",
                });
            } else {
                const lastcharge = (result.charge).slice(-1)[0];
                res.json(lastcharge)
            }
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// @route     Student api/charges/delete/:chargeId
// @desc      Delete a charges under a Student by text,owner,ownerId
// @access    Public
chargeRouter.post("/delete/:chargeId", protectRouter, async(req, res) => {
    const saveCharge = {
        _id: req.params.chargeId,
        amount: req.body.amount,
        date: req.body.date,
        dateDeposited: req.body.dateDeposited,
        reason: req.body.reason,
        details: req.body.details
    };
    console.log(saveCharge)
    try {
        const findStudent = await Student.findByIdAndUpdate(
            req.body.studentId, {
                $pull: {
                    charge: saveCharge,
                },
            }, {
                new: true,
            }
        ).exec((err, result) => {
            if (err) {
                return res.status(422).json({
                    error: err,
                    msg: "Please provide correct studentId",
                });
            } else {
                res.json(result.charge);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


export default chargeRouter;