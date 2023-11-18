const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

const admin = require("firebase-admin");
const serviceAccount = require("./path/serviceAccountKey.json"); // เปลี่ยนเส้นทางไฟล์ไปที่ไฟล์ของคุณ

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoURI =
  "mongodb://myUserAdmin:myUserAdmin@0.0.0.0:27017/?authMechanism=DEFAULT&authSource=admin";
const jwtSecretKey = "10583246";

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

connectToDatabase();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // ตั้งค่า databaseURL หากคุณใช้ Firestore หรือ Realtime Database
});

const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. Bearer token is required." });
  }

  const token = authorizationHeader.split(" ")[1];
  // console.log('Token:', token);

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      // รายชื่อ ผู้ให้บริการ cadcame
      const Provider = new Map([
        ["veronica", "veronica.in.th@gmail.com"],
        ["every", "every.internet.01@gmail.com"],
      ]);

      const providerEmails = Array.from(Provider.values());

      if (providerEmails.includes(decodedToken.email)) {
        console.log(`${decodedToken.email} เป็นผู้ให้บริการ`);
        decodedToken.type = "Admin";
        decodedToken.supplier = null;
      } else {
        console.log(`${decodedToken.email} ไม่ได้รับสิทธิ์เป็นผู้ให้บริการ`);
        decodedToken.type = "User";
        decodedToken.supplier = Provider;
      }

      console.log("decodedToken:", decodedToken);

      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      return res.status(403).json({ message: "Invalid token." });
    });
};

app.get("/logged", authenticateToken, async (req, res) => {
  // The user object is available in req.user
  const user = req.user;
  console.log("User:", user);

  // Your logic for handling the user data...

  // ส่งข้อมูลผู้ใช้กลับในรูปแบบ JSON
  res.json({ user });
});

app.post("/saveData", authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: "Data is required." });
    }

    const database = client.db("customer_data");
    const collection = database.collection("user_data");

    const result = await collection.insertOne(data);

    res.status(201).json({
      message: "Data saved successfully.",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error during data save:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ใช้ app.get ถ้าต้องการดึงข้อมูลเท่านั้น
app.get("/user_data", authenticateToken, async (req, res) => {
  try {
    const user = req.user;

    const database = client.db("customer_data");
    const collection = database.collection("user_data");

    if (user.type === "Admin") {
      const admin_data = database.collection("admin_data");
      // ดึงข้อมูลที่ตรงกับ admin
      const ReceivedAdmin = await admin_data.findOne({ "admin.role01": user.email });

      const lists = ReceivedAdmin.machine;

      //ดึงข้อมูล ที่ตรงกับ permit == user.email
      const resultArray = await collection
        .find({ "machine.permit": user.email })
        .toArray();
      console.log("แสดง ข้อมูลที่ดึงมา", resultArray);

      if (lists) {
        // const allAuthors = machine.map(item => item.author);

        res.status(200).json({
          type: "Admin",
          order: {
            lists: lists,
          },
          manage: {
            lists: resultArray,
          },
        });
      } else {
        res.status(200).json({
          type: "Admin",
          order: {
            lists: null,
          },
          manage: {
            lists: resultArray,
          },
        });
      }
    } else {
      // แปลง Map object เป็น JavaScript object
      const supplierObject = Object.fromEntries(user.supplier);

      const user_data = await collection
        .find({ "machine.author": user.email })
        .toArray();
      res.status(200).json({
        type: "User",
        order: {
          //จำนวนการสั่งการ
          lists: null,
        },
        manage: {
          //รายการที่ จัดการ ไป
          lists: user_data,
        },

       // user_data: user_data, //ข้อมูล ของ user
        supplier: supplierObject, // รายชื่อผู้ให้บริการ
      });
    }
  } catch (error) {
    console.error("Error during data retrieval:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/machine/setup/admin", authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { data } = req.body;

    const database = client.db("customer_data");
    const collection = database.collection("admin_data");

    // ดึงข้อมูลที่ตรงกับ data.provider
    const updated = await collection.findOneAndUpdate(
      { "admin.role01": data.machine.permit }, // กำหนดเงื่อนไขค้นหาที่ตรงกับ data.provider
      {
        $push: { machine: data.machine }, // กำหนด field ที่ต้องการอัพเดท
      },
      { new: true } // ตัวเลือกเพื่อให้คืนค่าข้อมูลหลังจากอัพเดท
    );

    if (updated) {
      await res.status(200).json("Data report successfully sent");
    } else {
      await res.status(200).json("Failed to send data report");
    }
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", async () => {
  try {
    await client.close();
    console.log("Disconnected from the database");
    process.exit(0);
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
    process.exit(1);
  }
});
