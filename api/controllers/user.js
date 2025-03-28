import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Get User Function
export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("User not found");
    }
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

// Update User Function
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? WHERE id=?";

   

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) {
          console.error("MySQL Error:", err);
          return res.status(500).json(err);
        }

        if (!data) {
          return res.status(404).json("No response from the database.");
        }

        if (data.affectedRows > 0) {
          return res.status(200).json("Profile updated successfully!");
        }

        return res.status(403).json("You can update only your own profile!");
      }
    );
  });
};