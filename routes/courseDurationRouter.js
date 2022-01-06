import express from "express";

import protectRouter from "../middlewares/protectRouter"

import Student from "../models/Student.model"

const courseDurationRouter = express.Router();

// @route     Student api/courseduration/:studentId
// @desc      Student courseDuration
// @access    Private (implement auth later)
courseDurationRouter.get("/:studentId", async(req, res) => {
    try {
        const foundStudent = await Student.findById(req.params.studentId);
        res.json(foundStudent.courseDuration);
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: "Could not get course duration from Student", error })
    }
});

// @route     Student api/courseduration/:studentId
// @desc      Student courseDuration
// @access    Private (implement auth later)
courseDurationRouter.post("/:studentId", protectRouter, async(req, res) => {
    try {
        const { title, description, start, startTimezone, end, endTimezone, isAllDay, recurrenceRule, recurrenceId, recurrenceExceptions, roomId } = req.body;
        const newcourseDuration = { title, description, start, startTimezone, end, endTimezone, isAllDay, recurrenceRule, recurrenceId, recurrenceExceptions, roomId }
        const newStudentcourseDuration = await Student.findByIdAndUpdate(
            req.params.studentId, {
                $push: {
                    courseDuration: newcourseDuration,
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
                const lastcourseDuration = (result.courseDuration).slice(-1)[0];
                res.json(lastcourseDuration)
            }
        });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// @route     Student api/courseduration/delete/:courseDurationId
// @desc      Delete a courseduration under a Student by text,owner,ownerId
// @access    Public
courseDurationRouter.post("/delete/:courseDurationId", protectRouter, async(req, res) => {
    const savecourseDuration = {
        _id: req.params.courseDurationId,
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        startTimezone: req.body.startTimezone,
        end: req.body.end,
        endTimezone: req.body.endTimezone,
        isAllDay: req.body.isAllDay,
        recurrenceRule: req.body.recurrenceRule,
        recurrenceId: req.body.recurrenceId,
        recurrenceExceptions: req.body.recurrenceExceptions,
        roomId: req.body.roomId
    };
    console.log(savecourseDuration)
    try {
        const findStudent = await Student.findByIdAndUpdate(
            req.body.studentId, {
                $pull: {
                    courseDuration: savecourseDuration,
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
                res.json(result.courseDuration);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


export default courseDurationRouter;