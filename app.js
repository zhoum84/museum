const express = require("express");
const cors = require("cors")
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "museum",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

// Test
app.get("/", (req, res) => {
  const query = "SELECT * FROM MUSEUM";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log(results)
    res.json(results);
  });
});


app.get("/curators", (req, res) => {
  const query = "SELECT * FROM CURATOR";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log(results)
    res.json(results);
  });
});


// POST request
app.post("/", (req, res) => {
  const data = req.body;
  res.send(`Hello, this is a POST request with data: ${JSON.stringify(data)}`);
});

// PUT request
app.put("/", (req, res) => {
  const data = req.body;
  res.send(`Hello, this is a PUT request with data: ${JSON.stringify(data)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
