const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/", require("./src/routes/mailRoute"));
app.use("/", require("./src/routes/userRoute"));

app.listen(PORT, () =>
  console.log(`Server started at port http://localhost:${PORT}`),
);
