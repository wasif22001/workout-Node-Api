const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

// get all workouts
const getWorkouts = async(req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout workouts
const getWorkout = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    
    res.status(200).json(workout)
}

// create  a new workout
const createWorkout = async (req, res) =>{
    const {title, load, reps} = req.body

    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)

    } catch(err){
        res.status(400).json({error: err.message})
    }
}


// delete a workout

// update a workout



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
    
}
