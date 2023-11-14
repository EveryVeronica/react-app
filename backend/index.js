const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const admin = require('firebase-admin');
const serviceAccount = require('./path/serviceAccountKey.json'); // เปลี่ยนเส้นทางไฟล์ไปที่ไฟล์ของคุณ








const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb://myUserAdmin:myUserAdmin@0.0.0.0:27017/?authMechanism=DEFAULT&authSource=admin';
const jwtSecretKey = '10583246';

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

connectToDatabase();




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // ตั้งค่า databaseURL หากคุณใช้ Firestore หรือ Realtime Database
});







const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Bearer token is required.' });
  }

  const token = authorizationHeader.split(' ')[1];
  console.log('Token:', token);

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      return res.status(403).json({ message: 'Invalid token.' });
    });
};

app.get('/logged', authenticateToken, async (req, res) => {
  // The user object is available in req.user
  const user = req.user;
  console.log('User:', user);

  // Your logic for handling the user data...

  // ส่งข้อมูลผู้ใช้กลับในรูปแบบ JSON
  res.json({ user });
});





app.post('/saveData', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const {keyid,data } = req.body;

    if (!data) {
      return res.status(400).json({ message: 'Data is required.' });
    }

    const database = client.db('customer_data');
    const collection = database.collection('user_data');

    const result = await collection.insertOne({
      user_id: user.uid,
      keyid:keyid,
      data
    });

    res.status(201).json({ message: 'Data saved successfully.', insertedId: result.insertedId });
  } catch (error) {
    console.error('Error during data save:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ใช้ app.get ถ้าต้องการดึงข้อมูลเท่านั้น
app.get('/user_data', authenticateToken, async (req, res) => {
  try {
    const user = req.user;

    const database = client.db('customer_data');
    const collection = database.collection('user_data');

    // ดึงข้อมูลที่ตรงกับ user_id
    const result = await collection.find({ user_id: user.uid }).toArray();

    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error during data retrieval:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('Disconnected from the database');
    process.exit(0);
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    process.exit(1);
  }
});
