import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookroute from './route/book.route.js'
import userroute from './route/user.route.js'
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT  = process.env.PORT || 4000;
const URI = process.env.MangoURI;

// conect to Mangodb
try{

      mongoose.connect(URI, {
        useNewUrlparser : true,
        useUnifiedTopology : true
      })
      console.log("Connect to Mongoose DB")
}catch (error){
        console.log("Error : ", error)
}

// defining routes

app.use("/book", bookroute)
app.use("/user", userroute)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})