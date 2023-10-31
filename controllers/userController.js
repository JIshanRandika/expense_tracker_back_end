const express = require("express");
const User = require("../models/userModel");
const createError = require('http-errors');

//Valiation file
const { userSchema } = require("../helpers/schemaValidations");

//Create a Event
const createUser = async (req, res, next) => {
    try {

        //Validation
        const validated_vals = await userSchema.validateAsync(req.body);

        const user = new User(validated_vals);
        const result = await user.save();
        res.status(200).json(result);

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422;
        next(error)
    }
}

// Get all events
const getUsers = async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }

}

// Get one specific event
const getOneUser = async (req, res, next) => {
    const id = req.params.id; //Getting the ID
    try {

        const result = await User.findById({ _id: id })
        if (!result) throw createError.NotFound("This News is not Found!");
        res.status(200).json(result);

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422
        next(error)

    }
}

const updateUser = async (req, res, next) => {
    const id = req.params.id; //Getting the ID
    try {
        const result = await User.findById({ _id: id })
        if (!result) throw createError.NotFound("This News is not Found!");


        //Validation
        const validated_vals = await userSchema.validateAsync(req.body);

        await User.findOneAndUpdate({ _id: id }, validated_vals, { new: true, runValidators: true, context: true });
        res.status(200).json("Updated!");

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422
        next(error)

    }
}


// Delete One event
const deleteUser = async (req, res) => {
    const id = req.params.id; //Getting the ID
    try {

        const result = await User.findById({ _id: id })
        if (!result) throw createError.NotFound("This News is not Found!");
        await User.deleteOne({ _id: id })
        res.status(200).json("Deleted!");

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422
        next(error)

    }
}




//Exporting all functions
module.exports = {
    createUser,
    getUsers,
    getOneUser,
    deleteUser,
    updateUser
}