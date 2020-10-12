const express = require('express');
require('dotenv').config();

const app = express()


const port = process.env.PORT || 3003;

app.listen(port,() => console.log(`listening on port ${port}...`))