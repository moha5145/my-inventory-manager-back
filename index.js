require('dotenv').config();
const cors = require('cors');
const express = require('express');
const formidable = require('express-formidable');
const mongoose = require('mongoose');
const app = express();
app.use(formidable());
app.use(cors());


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


const itemsRouter = require('./routes/items');
app.use(itemsRouter);

const stocksRouter = require('./routes/stocks');
app.use(stocksRouter);

const categoriesRouter = require('./routes/categories');
app.use(categoriesRouter);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

//Connect to the database before listening
const port = process.env.PORT || 4000;
connectDB().then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}!`));
})