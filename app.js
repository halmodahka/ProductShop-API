const express = require("express");
let products = require("./products");

const db = require("./db/models");

const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
const slugify = require("slugify");
app.use("/products", productRoutes);

const run = async () => {
  try {
    await db.sequelize.sync();

    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
