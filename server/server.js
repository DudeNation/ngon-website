const express = require('express');
const connectDB = require('../server/src/config/db.js');
const bodyParser = require('body-parser');


const app = express();

// Connect Database
connectDB();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Define Routes

app.use('/ngon/auth', require('../server/src/routes/auth'));
app.use('/ngon/menu', require('../server/src/routes/menu'));
app.use('/ngon/cart', require('../server/src/routes/cart'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
