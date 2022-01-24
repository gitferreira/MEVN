import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from './routes/index'

// ECMA5
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");

//Conexion base de datos
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/dbsystem";
mongoose
  .connect(dbUrl)
  .then((mongoose) => console.log("Reaching 27017"))
  .catch((err) => console.log(err));

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router)

app.set("port", process.env.PORT || 3000);

app.get('/hola', function (req, res) {
    res.send('Hello World!');
  });


app.listen(app.get("port"), () => {
  console.log("server cooking on port " + app.get("port"));
  console.log(path.join(__dirname, "public"));
});
