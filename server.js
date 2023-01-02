require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const sectorRoutes = require("./routes/Sectors");

//invoking express
const app = express();

const cors = require("cors");

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//enabling cors

app.use(cors());

//routes

app.use("/api/sectors", sectorRoutes);

//connect to db
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(" connected to db &  listening to port", process.env.PORT)
    );
  })
  .catch((error) => {
    console.log(error);
  });

//listen for requests
