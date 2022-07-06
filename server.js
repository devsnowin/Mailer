const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { validatekey } = require("./src/middleware/api");
require("dotenv").config();

// App variables
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to mongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Endpoints
app.use("/api/v1/", validatekey, require("./src/routes/mailRoute"));
app.use("/", require("./src/routes/userRoute"));

// Listen to the server
app.listen(PORT, () =>
  console.log(`Server started at port http://localhost:${PORT}`),
);
