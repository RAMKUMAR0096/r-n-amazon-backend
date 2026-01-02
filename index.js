const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
require('dotenv').config();
const port = process.env.PORT;




app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api',router)

app.get('/', (req, res) => {
    return res.json({
        message: "server is running",
        success: true,
        error: false
    })
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running in ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})

