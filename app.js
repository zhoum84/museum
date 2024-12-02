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

// Search museum by name or id
app.get("/museums", (req, res) => {

  let query = "";
  if ("id" in req.query){
    query = `SELECT M.*, C.Name AS ContactName, C.Email, C.Phone_num, H.Day, H.Opening_time, H.Closing_time\
    FROM MUSEUM M, CONTACT C, HOURS H\
    WHERE M.Mid = C.Mid\
    AND M.Mid = H.Mid\
    AND M.Mid = ${req.query.id};`;
  } else {
    query = `SELECT M.*, C.Name AS ContactName, C.Email, C.Phone_num, H.Day, H.Opening_time, H.Closing_time\
    FROM MUSEUM M, CONTACT C, HOURS H\
    WHERE M.Mid = C.Mid\
    AND M.Mid = H.Mid\
    AND M.Name = '${req.query.name}';`;
  }

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


// Search artists by name or id
app.get("/artists", (req, res) => {

  let query = "";
  if ("id" in req.query){
    query = `SELECT AR.Artist_id, AR.Name AS Artist_Name, M.Name as Museum_name, EHA.Eid, H.Gallery_name, E.Name AS Exhibit_name,  H.start_date, H.end_date, A.Art_id, A.Name as Artwork_Name
FROM ARTIST AR, CREATES C, ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE AR.Artist_id = C.Artist_id
AND C.Art_id = A.Art_id
AND A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND H.Mid = M.Mid
AND E.Eid = EHA.Eid
AND AR.Artist_id=${req.query.id};`;
  } else {
    query = `SELECT AR.Artist_id, AR.Name AS Artist_Name, M.*, EHA.Eid, H.Gallery_name, E.Name AS Exhibit_name,  H.start_date, H.end_date, A.Art_id, A.Name as Artwork_Name
FROM ARTIST AR, CREATES C, ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE AR.Artist_id = C.Artist_id
AND C.Art_id = A.Art_id
AND A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND H.Mid = M.Mid
AND E.Eid = EHA.Eid
AND AR.Name='${req.query.name}'`;
  }

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
