import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.send("This is page main");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDb Connection error", err);
  });
