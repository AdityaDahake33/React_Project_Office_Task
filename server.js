import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let alerts = [];

app.post('/api/alerts', (req, res) => {
  const { timestamp, message, source } = req.body;
  if (timestamp && message && source) {
    const newAlert = {
      id: Date.now().toString(), // Simple unique ID
      timestamp,
      message,
      source,
    };
    alerts.push(newAlert);
    console.log('Received new alert:', newAlert);
    res.status(200).send('Alert received');
  } else {
    res.status(400).send('Invalid alert format');
  }
});

app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// Add a basic route for the root path
app.get('/', (req, res) => {
  res.send('API is running. Access /api/alerts for data.');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});