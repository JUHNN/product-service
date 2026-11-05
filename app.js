const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const productRoutes = require('./routes/products');
const requestLogger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 3001;
const serviceName = process.env.SERVICE_NAME || 'product-service';

// 1. Middleware
app.use(express.json());
app.use(requestLogger);

// 2. Routes
app.use('/api/products', productRoutes);

// 3. 404 Handler (unmatched routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// 4. Error Handling (must be after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`${serviceName} running on http://localhost:${port}`);
});