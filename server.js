const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./src/config/db");
const { validatekey } = require("./src/middleware/api");
require("dotenv").config();

// App variables
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to mongoDB
connectDB();

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000, // 1440 mins -> 24hrs
  max: 5000,
});

// Set view engine
app.engine(".html", require("ejs").__express);
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "html");

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/", limiter);
app.set("trust proxy", 1);

// Endpoints
app.use("/", require("./src/routes/dashboardRoute"));

// API Endpoints
app.use("/api/v1/", validatekey, require("./src/routes/mailRoute"));
app.use("/auth/", require("./src/routes/authRoute"));

// Listen to the server
app.listen(PORT, () =>
  console.log(`Server started at port http://localhost:${PORT}`),
);
