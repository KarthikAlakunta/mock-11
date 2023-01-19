require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const cors = require("cors");
const server = express();
server.use(express.json());
server.use(cors());
const PORT = process.env.PORT || 8080;
const UserRouter = require("./Routes/user.router");
server.use("/user",UserRouter);
server.get("/", (req, res) => {
  res.json({ message: "200", data: "Hello mock-11" });
});

server.listen(PORT, async(req, res) => {
    try{
        await connect();
        console.log("DB Connected");
        console.log(`server started on port ${PORT} `);
    }catch(e){
        console.log(e.message)
    }
    
});
