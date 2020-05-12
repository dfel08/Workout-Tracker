var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",

{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(require("./routes/apiRoute.js"));

app.listen(PORT, function() {
console.log("App listening on: http://localhost:" + PORT);
});
