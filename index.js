const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');
const authRouter = require('./routes/auth.routes.js');

const app = express();
dotenv.config()
const port = process.env.PORT || 3001;

connectDb();
app.use(cors);
app.use("/api/auth" , authRouter);
app.listen(port , ()=>{
    console.log(`Server is running on port : ${port}`);
})