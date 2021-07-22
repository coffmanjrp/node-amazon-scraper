const express = require('express');
const request = require('request-promise');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.SCRAPER_API_KEY;
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Amazon Scraper API.');
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, () =>
  console.log(colors.cyan(`Server running on port ${PORT}`).bold)
);
