import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});


const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
    res.send("This is page main");
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});