require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const urlController = require('./controllers/urlController');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(cookieParser());
app.use(express.json());


// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
//     next();
// });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/url', require('./routes/urlRoutes'));

app.get('/:shortCode', urlController.redirect);

app.get('/', (req, res) => {
    res.send('Welcome to API');
});
app.get("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





