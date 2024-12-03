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

app.get("/exhibitions/artwork", (req, res) => {

  const data = req.query;
  const query = `SELECT A.*, S.Name AS SeriesName, AR.Name AS ArtistName, P.Paint_type, SCL.Technique, PH.Film, I.Install_type, O.Medium_exception, M.Material
FROM EXHIBITION_HAS_ARTWORK EHA, ARTWORK A, CREATES C, ARTIST AR, SERIES_HAS_ARTWORK SHA, SERIES S, PAINTING P, SCULPTURE SCL, PHOTO PH, INSTALLATION I, OTHER O, MATERIAL M
WHERE EHA.Art_id = A.Art_id
AND A.Art_id = C.Art_id
AND C.Artist_id = AR.Artist_id
AND A.Art_id = SHA.Art_id
AND SHA.Sid = S.Sid
AND A.Art_id = P.Art_id
AND A.Art_id = SCL.Art_id
AND A.Art_id = PH.Art_id
AND A.Art_id = I.Art_id
AND A.Art_id = O.Art_id
AND A.Art_id = M.Art_id
AND EHA.Eid = ${data.eid};
`;
console.log(query)
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




app.get("/exhibitions", (req, res) => {

  const data = req.query;
  const query = `SELECT E.*
FROM MUSEUM M, HOSTS H, EXHIBITION E
WHERE M.Mid = H.Mid
AND H.Eid = E.Eid
AND M.Name = '${data.name}'
AND (H.start_date BETWEEN '${data.startDate}' AND '${data.endDate}'
OR H.end_date BETWEEN '${data.startDate}' AND '${data.endDate}');
`;
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


app.get("/exhibitions/oldest", (req, res) => {

  const data = req.query;
  const query = `SELECT A.*
FROM EXHIBITION_HAS_ARTWORK EHA, ARTWORK A
WHERE EHA.Art_id = A.Art_id
AND EHA.Eid = ${data.eid}
ORDER BY A.Date_created ASC
LIMIT 1;
`;
console.log(query)
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

app.post("/artwork/update", (req, res) => {
  const { artwork_id, height, width, length, status, name, medium, material } =
    req.body;

  // Construct the query with dynamic SET fields
  let setFields = [];
  if (height !== "") setFields.push(`Height = ${db.escape(height)}`);
  if (width !== "") setFields.push(`Width = ${db.escape(width)}`);
  if (length !== "") setFields.push(`Length = ${db.escape(length)}`);
  if (status !== "") setFields.push(`Status = ${db.escape(status)}`);
  if (name !== "") setFields.push(`Name = ${db.escape(name)}`);
  if (medium !== "") setFields.push(`Medium = ${db.escape(medium)}`);
  if (material !== "") setFields.push(`Material = ${db.escape(material)}`);

  if (setFields.length === 0) {
    res.status(400).send("No fields provided to update");
    return;
  }

  // Combine the fields into a single SET clause
  const setClause = setFields.join(", ");

  // Construct the final query
  let query = `UPDATE ARTWORK SET ${setClause} WHERE Art_id = ${db.escape(
    artwork_id
  )};`;

  console.log("Generated query:", query);

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log("Query results:", results);
    res.json({ message: "Artwork updated successfully", results });
  });
});

app.post("/artist/update", (req, res) => {
  const { artist_id, artist_name, date_of_death } = req.body;
  console.log("body:", req.body);

  if (!artist_id) {
    return res.status(400).send("Artist ID is required");
  }

  let updateFields = [];
  if (artist_name !== "") updateFields.push(`Name = ${db.escape(artist_name)}`);
  if (date_of_death !== "")
    updateFields.push(`Date_of_death = ${db.escape(date_of_death)}`);

  if (updateFields.length === 0) {
    return res.status(400).send("No fields provided to update");
  }

  const updateClause = updateFields.join(", ");
  const query = `UPDATE ARTIST SET ${updateClause} WHERE Artist_id = ${db.escape(
    artist_id
  )};`;

  console.log("Generated query:", query);

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log("Query results:", results);
    res.json({ message: "Artist updated successfully", results });
  });
});

// Update artist's medium and discipline
app.post("/artist/medium-discipline/update", (req, res) => {
  const { artist_id, artist_medium_discipline } = req.body;

  if (!artist_id) {
    return res.status(400).send("Artist ID is required");
  }

  let updateFields = [];
  if (artist_medium !== undefined)
    updateFields.push(
      `Medium_discipline = ${db.escape(artist_medium_discipline)}`
    );

  if (updateFields.length === 0) {
    return res.status(400).send("No fields provided to update");
  }

  const updateClause = updateFields.join(", ");
  const query = `UPDATE ARTIST_MEDIUM_DISCIPLINE SET ${updateClause} WHERE Artist_id = ${db.escape(
    artist_id
  )};`;

  console.log("Generated query:", query);

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log("Query results:", results);
    res.json({
      message: "Artist medium and discipline updated successfully",
      results,
    });
  });
});

// Update series
app.post("/series/update", (req, res) => {
  const data = req.body;
  let query = `DELETE FROM SERIES_HAS_ARTWORK
WHERE Sid = ${data.series_id} AND Art_id = ${data.artwork_id};`;
  console.log(query);
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }

    let insertQuery = `INSERT INTO SERIES_HAS_ARTWORK (Sid, Art_id)
VALUES (${data.new_series_id}, ${data.artwork_id});`;
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error executing query");
        return;
      }

      console.log(results);
      res.json(results);
    });
  });
});

app.post("/artwork/update-status", async (req, res) => {
  const { artId, status } = req.body;

  if (!artId || !status) {
    return res.status(400).json({ message: "Art ID and status are required." });
  }

  let query = `UPDATE ARTWORK
  SET Status = '${status}'
  WHERE Art_id = ${artId};`;
  console.log(query);

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }
    console.log("Query results:", results);
    res.json({
      message: "Artist medium and discipline updated successfully",
      results,
    });
  });
});

app.post("/exhibit/delete", (req, res) => {
  const data = req.body;
  let query = `DELETE FROM HOSTS
WHERE Eid = ${data.exhibitId};

DELETE FROM EXHIBITION_HAS_ARTWORK
WHERE Eid = ${data.exhibitId};

DELETE FROM CURATES
WHERE Eid = ${data.exhibitId};

DELETE FROM EXHIBITION
WHERE Eid = ${data.exhibitId};`;
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


app.post("/exhibit/update", (req, res) => {
  const data = req.body;
  
  console.log(data.exhibitId, data.artId)
  const query = `DELETE FROM EXHIBITION_HAS_ARTWORK
WHERE Eid = ${data.exhibitId} AND Art_id = ${data.artId};

INSERT INTO EXHIBITION_HAS_ARTWORK (Eid, Art_id) VALUES (2, 1);`;
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


app.put("/exhibit/rotate", (req, res) => {
  const data = req.body;
  const query = `UPDATE HOSTS
SET Mid = ${data.mid}, gallery_name = '${data.gallery_name}', start_date = '${data.startDate}', end_date = '${data.endDate}'
WHERE Eid = ${data.eid};
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
// PUT request
app.put("/", (req, res) => {
  const data = req.body;
  res.send(`Hello, this is a PUT request with data: ${JSON.stringify(data)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
