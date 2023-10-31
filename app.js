const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require("body-parser");
const createError = require('http-errors');
const app = express();


require("dotenv/config");
const cors = require("cors");

//authentication middleware
const { isAuthenticated } = require("./helpers/isAuthenticated");


app.use(bodyPaser.json());
app.use(cors());

//Routes

const newsRouter = require("./routes/newsRouter");
const UserRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

//Databse Connection
mongoose.connect("mongodb+srv://ishan:1998@cluster0.eshgylw.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database Connected Successfully!..");
});


app.use('/news', newsRouter);
app.use('/users', isAuthenticated, UserRouter);
app.use('/auth', authRouter);

//catching not matching routes
app.use((request, response, next) => {
    try {
        throw createError.NotFound("processing error in request!");
    } catch (error) {
        next(error)
    }
});


// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error!",
        },
    });
});

app.listen(3000, () => {
    console.log("Server Started on Port 3000...");
});
