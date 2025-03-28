import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saurabh123",  // यहाँ अपना नया पासवर्ड डालें
  database: "social"
});

// ✅ Connection Check
db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed: ", err);
    return;
  }
  console.log("✅ Successfully Connected to the Database!");
});
