// ESM syntax is supported.
export {}
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dotenv = require("dotenv").config();

// Routes
import {
    userRouter,
    studentRouter,
    paymentRotuer,
    chargeRouter,
    courseDurationRouter
} from "./routes/index";

const app = express();

// More difficult to see that app is using express
app.disable("x-powered-by");

// Middleware to allow Cross origin point, parsing JSON, and body
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const uri = process.env.TEACHER_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60, // 1 hour
    }),
    secret: 'some-string',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use((req, res, next) => {
    app.locals.currentUser = req.session.currentUser;
    next();
});


// User Routes
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/students", studentRouter);
apiRouter.use("/payments", paymentRotuer);
apiRouter.use("/charges", chargeRouter);
apiRouter.use("/courseduration", courseDurationRouter);





const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}/`)
})