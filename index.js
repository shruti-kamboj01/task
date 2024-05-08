const express = require("express");
const app = express();

const database = require("./config/database")

const cloudinary = require("./config/cloudinary");
const fileupload = require("express-fileupload");



const user = require("./routes/user")
const post = require("./routes/post")

const PORT = 8001;

database.connect();
app.use(express.json());

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

cloudinary.cloudinaryConnect();
app.use("/api/v1", user)
app.use("/api/v1",post)

app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

app.listen(PORT, () => {
    console.log(`app listing on ${PORT}`);
})