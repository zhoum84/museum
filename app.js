const express = require("express");
const cors = require("cors");
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
    console.log(results);
    res.json(results);
  });
});

// Search museum by name or id
app.get("/museums", (req, res) => {
  let query = "";
  if ("id" in req.query) {
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
    console.log(results);
    res.json(results);
  });
});

// Search artists by name or id
app.get("/artists", (req, res) => {
  let query = "";
  if ("id" in req.query) {
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
    console.log(results);
    res.json(results);
  });
});

// Search artists by name or id
app.get("/artworks", (req, res) => {
  let query = "";
  if ("id" in req.query) {
    query = `SELECT A.Name as Artwork_Name, M.*, H.start_date, H.end_date, E.Name AS Exhibit_name, H.Gallery_name
FROM ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND EHA.Eid = E.Eid
AND H.Mid = M.Mid
AND A.Art_id = ${req.query.id};`;
  } else {
    query = `SELECT A.Name as Artwork_Name, M.*, H.start_date, H.end_date, E.Name AS Exhibit_name, H.Gallery_name
FROM ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND EHA.Eid = E.Eid
AND H.Mid = M.Mid
AND A.Name='${req.query.name}';`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

// Search Exhibitions by name or id
app.get("/exhibitions", (req, res) => {
  let query = "";
  if ("id" in req.query) {
    query = `SELECT E.Name as Exhibition_name, E.Eid, H.Gallery_name, M.*
FROM ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND EHA.Eid = E.Eid
AND H.Mid = M.Mid
AND E.Eid = ${req.query.id} ;`;
  } else {
    query = `SELECT E.Name as Exhibition_name, E.Eid, H.Gallery_name, M.*
FROM ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND EHA.Eid = E.Eid
AND H.Mid = M.Mid
AND E.Name='${req.query.name}';`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

// Update series
app.post("/series/update", (req, res) => {
  let query = `DELETE FROM SERIES_HAS_ARTWORK
WHERE Sid = ${req.body.series_id} AND Art_id = ${req.body.artwork_id};

INSERT INTO SERIES_HAS_ARTWORK (Sid, Art_id)
VALUES (${req.body.new_series_id}, ${req.body.artwork_id});`;
  console.log(query);
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.get("/curators/view/all", (req, res) => {
  const query = `SELECT * FROM CURATOR`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

// Get employed curators and the museums they are employed at
app.get("/curators/view", (req, res) => {
  const query = `SELECT C.*, EX.Eid, EX.Name AS Exhibit_name, M.*
FROM CURATOR C, EMPLOYS E, MUSEUM M, CURATES CR, EXHIBITION EX
WHERE C.Cid = E.Cid 
AND E.Mid = M.MID
AND C.CID = CR.Cid
AND EX.Eid = CR.Cid
`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log(results);
    res.json(results);
  });
});

// POST request
app.post("/curators/hire", (req, res) => {
  const data = req.body;
  const query = `INSERT INTO EMPLOYS (Cid, Mid)
VALUES (${data.cid}, ${data.mid});
`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.sqlMessage);
      res.status(500).send("Error executing query: " + err.sqlMessage);
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.post("/curators/fire", (req, res) => {
  const data = req.body;
  const query = `DELETE FROM EMPLOYS 
  WHERE Cid = ${data.cid} AND Mid = ${data.mid};`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.sqlMessage);
      res.status(500).send("Error executing query: " + err.sqlMessage);
      return;
    }
    console.log(results);
    res.json(results);
  });
});

// update curator
app.post("/curators/update", (req, res) => {
  const data = req.body;
  const query = `UPDATE CURATES SET ${data.newEid} 
  WHERE Cid = ${data.cid} AND Eid = ${data.eid};`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.sqlMessage);
      res.status(500).send("Error executing query: " + err.sqlMessage);
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.post("/curators/new", (req, res) => {
  const data = req.body;
  const query = `INSERT INTO CURATOR (Cid, Name) 
  VALUES (${data.cid}, '${data.name}');`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err.sqlMessage);
      res.status(500).send("Error executing query: " + err.sqlMessage);
      return;
    }
    console.log(results);
    res.json(results);
  });
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
