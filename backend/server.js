const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config");
dotenv.config();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

if(process.env.NODE_ENV === "development"){
    app.use(cors());
}

app.get("/", (req, res) => {res.send("Social App running")});
app.use("/api/v1/posts", require("./routes/postsRoute"));

connectDB();

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));