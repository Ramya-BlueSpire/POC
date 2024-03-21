// server.js
const express = require('express');
const router = require('./routes/route');

const app = express();

app.use(router)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Service 2 is running on port ${PORT}`);
});
