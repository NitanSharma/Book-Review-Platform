const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/monogo.config.js');
const bookRoutes = require('./src/routes/book.routes.js');
const userRoutes = require('./src/routes/user.routes.js');
const reviewRoutes = require('./src/routes/review.routes.js');
const cookieParser = require('cookie-parser');
// const ExpressError = require('./src/utils/ExpressError.js');

dotenv.config();

const app = express();// Middleware

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));// this is to allow cross origin requests 

app.use(express.json())// this is to parse json data
app.use(express.urlencoded({extended:true}))// this is to parse url encoded data
app.use(cookieParser());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

// app.all("*", (req,res,next) => {// all other request other than route
//     next(new ExpressError(404, "Page Not Found!"));
// })

app.use((err, req ,res,next) => {// middlware for error
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).send({
        status: "error",
        statusCode,
        message
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});















