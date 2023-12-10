// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/sticky-note-app")
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });



// Routes
const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
