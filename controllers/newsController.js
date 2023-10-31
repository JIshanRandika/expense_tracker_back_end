const express = require("express");
const News = require("../models/newsModel");
const createError = require('http-errors');

//Valiation file
const { newsSchema } = require("../helpers/schemaValidations");

//Create a Event
const createNews = async (req, res, next) => {
    try {

        //Validation
        const validated_vals = await newsSchema.validateAsync(req.body);

        const news = new News(validated_vals);
        const result = await news.save();
        res.status(200).json(result);

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422;
        next(error)
    }
}

// Get all events
const getNews = async (req, res) => {
    try {
        const result = await News.find();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }

}

// Get one specific event
const getOneNews = async (req, res, next) => {
    const id = req.params.id; //Getting the ID
    try {

        const result = await News.findById({ _id: id })
        if (!result) throw createError.NotFound("This News is not Found!");
        res.status(200).json(result);

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422
        next(error)

    }
}

const upadateNews = async (req, res, next) => {
    const id = req.params.id; //Getting the ID
    try {
        const result = await News.findById({ _id: id })
        if (!result) throw createError.NotFound("This News is not Found!");


        //Validation
        const validated_vals = await newsSchema.validateAsync(req.body);

        await News.findByIdAndUpdate({ _id: id }, validated_vals);
        res.status(200).json("Updated!");

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422
        next(error)

    }
}


// Delete One event
const deleteNews = async (req, res) => {
    const id = req.params.id; //Getting the ID
    try {

        const result = await News.findById({ _id: id })
        if (!result) throw createError.NotFound("This News is not Found!");
        await News.deleteOne({ _id: id })
        res.status(200).json("Deleted!");

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422
        next(error)

    }
}




//Exporting all functions
module.exports = {
    createNews,
    getNews,
    getOneNews,
    deleteNews,
    upadateNews
}