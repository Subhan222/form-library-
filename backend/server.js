import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';


const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

app.post('/', (req, res) => {
  const { text, password } = req.body;
  console.log("Received data:", req.body);
  // You can add more processing logic here as needed
  res.send("Data received successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
