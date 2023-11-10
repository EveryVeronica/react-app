const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI = 'mongodb://myUserAdmin:myUserAdmin@0.0.0.0:27017/?authMechanism=DEFAULT&authSource=admin';

// Your MongoDB collections
const usersCollection = 'users';
const importedDataCollection = 'importedData';

// Connect to MongoDB
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

app.post('/saveData', async (req, res) => {
  // โค้ดบันทึกข้อมูลลง MongoDB
});

app.get('/getData/:uid', async (req, res) => {
  // โค้ดดึงข้อมูลจาก MongoDB
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
