const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");

const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser(), express.json());
// app.use(express.json());
app.use(express.urlencoded())
app.use(routes())

if(!isProduction){
    app.use(cors());
}

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(e => e.massage);
        err.title = "Validation error";
    };
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});




module.exports = app;
