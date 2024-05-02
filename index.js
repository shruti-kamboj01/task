const express = require("express");
const app = express();

const database = require("./config/database")

const user = require("./routes/user")

const PORT = 8001;

database.connect();
app.use(express.json());
app.use("/api/v1", user)

app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

app.listen(PORT, () => {
    console.log(`app listing on ${PORT}`);
})