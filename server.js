require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbconnet = require("./utiles/DB");
const userRouter = require("./Router/userRouter");
const AuthRouter = require("./Router/AuthRouter");
const DoctorRouter = require("./Router/Doctor.router");
const AdminRouter = require("./Router/AdminRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: ["http://localhost:5173", "https://home-made-remedies.netlify.app", "https://frontend-deploy-f2mm.onrender.com/"],
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
dbconnet();

app.get("/", (req, res) => {
  res.send("welcome to the world of Backend");
});
app.use("/api/user", userRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/doctor", DoctorRouter);
app.use("/api/admin", AdminRouter);

app.listen(3000, () => {
  console.log("server is listning");
});
