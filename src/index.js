import dotenv from "dotenv";
import express from "express";

dotenv.config({
    path: "./.env",
});

const app = express();

const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
    res.send("This is page main");
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});