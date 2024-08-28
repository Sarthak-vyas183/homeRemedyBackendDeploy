require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const dbconnet = require("./utiles/DB");
const userRouter = require("./Router/userRouter");
const AuthRouter = require("./Router/AuthRouter")
const DoctorRouter = require("./Router/Doctor.router");
app.use(express.static(path.join(__dirname, 'build')));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
var corsOptions = {
  origin: ['https://homeremedies.onrender.com', 'http://localhost:5173' , "https://home-made-remedies.netlify.app"],
  methods: "GET, POST, PUT, DELETE",
  credentials: true
};
  app.use(cors(corsOptions)) 
dbconnet()




app.get("/" , (req, res)=>{res.send("welcome to the world of Backend")})
app.use("/api/user" , userRouter)
app.use("/api/auth" , AuthRouter)
app.use("/api/doctor" ,DoctorRouter)



app.listen(3000 , () => {
    console.log("server is listning")
})