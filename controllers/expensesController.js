const express = require("express");
const Expenses = require("../models/expensesModel");
const createError = require('http-errors');

//Valiation file
const { newsSchema } = require("../helpers/schemaValidations");

//Create a Event
const createExpenses = async (req, res, next) => {
    try {
        //Validation
        const validated_vals = await newsSchema.validateAsync(req.body);

        const expenses = new Expenses(validated_vals);
        const result = await expenses.save();
        res.status(200).json(result);

    } catch (error) {
        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422;
        next(error)
    }
}

// Get all events
const getExpenses = async (req, res) => {
    try {
        const result = await Expenses.find();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }

}
