import express from "express";

import protectRouter from "../middlewares/protectRouter"

import Student from "../models/Student.model"

const paymentRouter = express.Router();

// @route     Student api/payments/:studentId
// @desc      Student payment
// @access    Private (implement auth later)
paymentRouter.get("/:studentId", async(req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.studentId);
        // console.log(foundStudent.payments);
        res.json(foundStudent.payment);
        // console.log(req.body)
        // res.json("Hello payments")
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: "Could not get payments for Student", error })
    }
});

// @route     Student api/payments/:studentId
// @desc      Student payment
// @access    Private (implement auth later)
paymentRouter.post("/:studentId", protectRouter, async(req, res) => {
    try {
        const { amount, creditAmount, paymentDate, paymentDetails } = req.body;
        const newPayment = { amount, creditAmount, paymentDate, paymentDetails }
        const newStudentPayment = await Student.findByIdAndUpdate(
            req.params.studentId, {
                $push: {
                    payment: newPayment,
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
                const lastPayment = (result.payment).slice(-1)[0];
                res.json(lastPayment)
            }
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// @route     Student api/payments/delete/:paymentId
// @desc      Delete a payments under a Student by text,owner,ownerId
// @access    Public
paymentRouter.post("/delete/:paymentId", protectRouter, async(req, res) => {
    const savePayment = {
        _id: req.params.paymentId,
        amount: req.body.amount,
        creditAmount: req.body.creditAmount,
        paymentDate: req.body.paymentDate,
        dateDeposited: req.body.dateDeposited,
        paymentDetails: req.body.paymentDetails
    };
    console.log(savePayment)
    try {
        const findStudent = await Student.findByIdAndUpdate(
            req.body.studentId, {
                $pull: {
                    payment: savePayment,
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
                res.json(result.payment);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


export default paymentRouter;