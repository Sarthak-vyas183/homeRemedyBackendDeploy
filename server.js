require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const dbconnect = require("./utiles/DB");
const userRouter = require("./Router/userRouter");
const AuthRouter = require("./Router/AuthRouter");
const DoctorRouter = require("./Router/Doctor.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: [
    'https://homeremedies.onrender.com',
    'http://localhost:5173',
    'https://home-made-remedies.netlify.app'
  ],
  methods: "GET, POST, PUT, DELETE",
  credentials: true
};

app.use(cors(corsOptions));
dbconnect();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/doctor", DoctorRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Catch-all route to serve index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
