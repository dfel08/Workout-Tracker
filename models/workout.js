const mongoose = require("mongoose");
//track the name, type, weight, sets, reps, and duration
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true,
                required: "Enter a name for the workout"
            },
            type: {
                type: String,
                trim: true,
                required: "Enter the type of workout"
            },
            weight: {
                type: Number,
                required: "Enter the weight"
            },
            sets: {
                type: Number,
                required: "Enter the number of sets"
            },
            reps: {
                type: Number,
                required: "Enter the number of reps"
            },
            duration: {
                type: Number,
                required: "Enter the duration"
            },
            distance: {
                type: Number,
                required: "Enter the distance"
            }
        }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;