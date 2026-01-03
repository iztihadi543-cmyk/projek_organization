// backend/server.js
require('dotenv').config(); // Load variabel rahasia dari .env
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});