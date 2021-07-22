const reviews = () => {
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
};

module.exports = reviews;
