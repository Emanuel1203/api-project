const express = require("express");
const morgan = require("morgan");

const port = 8080;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/hello",(req, res, next) => {
 try{
    res.send("world");
 } catch (e) {
    next(e);
 }
});

app.use((req, res, next) => {
    try{
        res
        .status(404)
        .send(
            "route does not exist. check the url endpoint and method you are using with your request."
        );
    } catch (e) {
        next(e);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res
    .status(err.status || 500)
    .send(err.message || "an error occured on the server. Try again later.");
});

app.listen(port, () => 
console.log(`server running at http://localhost:${port}`)
)