const mongoose = require("mongoose")
const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: 1 })
    .then(workout => {
      res.send(workout);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log("Hello:", req.params.id);
  var duration = req.body.duration;
  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } },
    { new: true, runValidators: true })
    .then(newWorkout => {
      var totalDuration = newWorkout.totalDuration || 0
      totalDuration += duration;
      Workout.findByIdAndUpdate(req.params.id, { totalDuration: totalDuration })
        .then(newWorkoutDuration => {
          res.json(newWorkoutDuration)
        })
    }).catch((err) => {
      res.json(err)
    })


  //console.log("Goodbye:", workoutById);
  //const objExercise = workoutById.exercises;
  //objExercise.push(body);
  //try {
  //   const updated = workoutById.save();   
  //   return res.status(200).send(updated)
  // }
  // catch (err) {
  //   return res.status(500).send(err);
  // }
  //});
})

router.post("/api/workouts", (req, res) => {
  Workout.create({}).then((newWorkout) => {
    res.json(newWorkout)
  }).catch((err) => {
    res.json(err)
  })
});



router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ date: 1 })
    .then(workout => {
      res.send(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/exercise.html'));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/stats.html'));
});

module.exports = router;
