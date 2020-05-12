const path = require("path")
const db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        console.log("at home page")
        res.sendFile(path.join(__dirname, "../public/html/index.html"));
    });

    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/exercise.html"));
    })

    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/stats.html"));
    })

    app.get("/api/workouts", function (req, res) {
        db.Workout.find({}, {})
            .then(lastWorkout => {
                res.json(lastWorkout)
            }).catch(err => {
                res.json(err);
            });  
    })

    app.put("/api/workouts/:id", function (req, res) {
        db.Workout.findOneAndUpdate(
            {_id: req.params.id}, 
            { $push: { exercises: req.body } }, 
            { new: true })
            .then(result => {
                res.json(result);
            }).catch(err => {
                res.json(err);
            });
    })

    app.post("/api/workouts", function(req,res) {
        db.Workout.create({})
        .then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            res.json(err)
        });
    });

    app.get("/api/workouts/range", function(req,res) {
        db.Workout.find({})
        .then(data => {
            console.log(data)
            res.json(data)
        }).catch(err => {
            res.json(err);
        });
    })
}
