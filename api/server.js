require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const automationRoutes = require('./routes/automation.route');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/health', (req, res) => {
  res.send('OK');
})
app.use('/', automationRoutes);
app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
