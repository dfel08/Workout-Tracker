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
  Workout.findById(req.params.id, function (err, workoutById) {
    const objExercise = workoutById.exercises;
    objExercise.push(req.body);
    try {
      const updated = workoutById.save();   
      return res.status(200).send(updated)
    }
    catch (err) {
      return res.status(500).send(err);
    }
  });
})

router.post("/api/workouts", (req, res) => {
  const newWorkoutObj = new Workout(req.body);
  newWorkoutObj.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newWorkoutObj)
  });
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
