//Model 만들기

import express from 'express'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
})

const model = mongoose.model("User",userSchema);


export default model;
