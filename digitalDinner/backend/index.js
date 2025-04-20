const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/router')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(router)

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhishek708158:1234@myshop.uasaj.mongodb.net/?retryWrites=true&w=majority&appName=myShop', { useNewUrlParser: true, useUnifiedTopology: true }).then(res=>console.log("mongodb Connected successful"))

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});