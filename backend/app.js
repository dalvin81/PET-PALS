const express = require("express");
const PORT = 5000;
const cors = require("cors");
const mongoose = require('mongoose');
const {mongoURL} = require('./keys')
require('./models/model')
require('./models/post.js')
require('./models/info.js')
mongoose.connect(mongoURL)
mongoose.connection.on("connected", ()=> {
    console.log('Successfully connected to database')
})

mongoose.connection.on("error", ()=> {
    console.log('Cannot connect to database')
})


const app = express()
app.use(cors())
app.use(express.json())
app.use(require("./routes/auth.js"))
app.use(require('./routes/create.js'))
app.use(require('./routes/update.js'))
app.use(require("./routes/find.js"))




app.listen(PORT,()=> {
    console.log("server is running on "+PORT)
})
