const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db.js');
const authRouter = require('./routes/auth.routes.js');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/error.middlewares.js');

const app = express();
dotenv.config()
const port = process.env.PORT || 3001;

connectDb();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth" , authRouter);
app.use(errorHandler);
app.listen(port , ()=>{
    console.log(`Server is running on port : ${port}`);
})