var express = require('express');
var getVideoIds = require('./routes/getVideoIds')
const path = require('path')
const cors = require('cors');
const app = express();
require("dotenv").config()

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.static(path.join(__dirname, "yt-playlist-length-calculator", "build")))
app.use('/getId', getVideoIds);

app.get("*", (req, res) => {
    return res.render("index.html")
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)) 