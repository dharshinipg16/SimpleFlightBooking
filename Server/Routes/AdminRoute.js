import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
/*import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path"; */

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Insert user into the admin table
  const insertSQL = 'INSERT INTO admin (email, password) VALUES (?, ?)';
  con.query(insertSQL, [email, password], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: 'Failed to register user' });
    }

    return res.json({ Status: true, Message: 'User registered successfully' });
  });
});

router.get('/category', (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.post('/add_category', (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  con.query(sql, [req.body.category], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  })
})

router.get('/booking', (req, res) => {
  const sql = "SELECT * FROM flightlist";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.get('/yourbooking', (req, res) => {
  const sql = "SELECT * FROM flightlist WHERE ubooked!=0 ";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.post('/bookslot', (req, res) => {
  const { name } = req.body;
  
  // Find the flight by name to update available slots and booked slots
  const getFlightSQL = 'SELECT * FROM flightlist WHERE name = ?';
  con.query(getFlightSQL, [name], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });

    if (result.length === 0) {
      return res.json({ Status: false, Error: 'Flight not found' });
    }

    const flight = result[0];

    if (flight.availableslots <= 0) {
      return res.json({ Status: false, Error: 'No available slots for this flight' });
    }

    // Update available slots and booked slots
    //ACTUALLY THIS WORKS, BUT THE REASON WHY IT IS RELOADED IS THAT IN SQL WORKBENCH THE SAFE MODE IS TOGGLED ON, ONCE OFF IT WILL BE PERMANENTLY UPDATED
    const updateSQL = 'UPDATE flightlist SET availableslots = ?, booked = ? WHERE name = ?';
    con.query(
      updateSQL,
      [flight.availableslots - 1, flight.booked + 1, name],
      (err, updateResult) => {
        if (err) return res.json({ Status: false, Error: 'Failed to update slots' });

        return res.json({ Status: true, Message: 'Slot booked successfully' });
      }
    );
  });
});



export {router as adminRouter};