-- DROP TABLE HOURS;
-- DROP TABLE CONTACT;
-- DROP TABLE MUSEUM;
-- 127.0.0.1

CREATE TABLE MUSEUM( 
    Mid INT, 
    Name VARCHAR(15) NOT NULL, 
    Street VARCHAR(15) NOT NULL, 
    City VARCHAR(15) NOT NULL, 
    State VARCHAR(13) NOT NULL, 
    Zip NUMERIC(5) NOT NULL, 
    Country VARCHAR(15) NOT NULL,
    PRIMARY KEY(Mid)
);

CREATE TABLE CONTACT(
    Mid INT,
    Name VARCHAR(15) NOT NULL,
    Email VARCHAR(25) NOT NULL,
    Phone_num NUMERIC(10),
    PRIMARY KEY(Mid, Phone_num),
    FOREIGN KEY(Mid) REFERENCES MUSEUM(Mid)
);

CREATE TABLE HOURS (
    Mid INT,
    Day VARCHAR(8),
    Opening_time TIME NOT NULL,
    Closing_time TIME NOT NULL,
    PRIMARY KEY(Mid, Day),
    FOREIGN KEY(Mid) REFERENCES MUSEUM(Mid)
);

CREATE TABLE GALLERY_SPACE(
    Mid INT,
    Gallery_name VARCHAR(15),
    Height INT,
    Width INT,
    Length Int,
    PRIMARY KEY(Mid, Gallery_name),
    UNIQUE(Gallery_name),
    FOREIGN KEY(Mid) REFERENCES MUSEUM(Mid)
);

CREATE TABLE CURATOR(
    Cid Int,
    Name VARCHAR(15) NOT NULL,
    PRIMARY KEY(Cid)
);


CREATE TABLE ARTWORK(
    Art_id Int,
    Name VARCHAR(15) NOT NULL,
    Date_created DATE,
    Height INT,
    Width INT,
    Length INT,
    Status VARCHAR(10),
    PRIMARY KEY(Art_id)
);

CREATE TABLE ARTIST(
    Artist_id INT,
    Name VARCHAR(15) NOT NULL,
    date_of_birth DATE NOT NULL,
    date_of_death DATE,
    PRIMARY KEY(Artist_id)
);

CREATE TABLE EXHIBITION(
    Eid INT,
    Name VARCHAR(15) NOT NULL,
    PRIMARY KEY(Eid)
);

CREATE TABLE HOSTS(
    Mid INT,
    Gallery_name VARCHAR(15),
    Eid INT,
    Start_date DATE NOT NULL,
    End_date DATE NOT NULL,
    PRIMARY KEY (Mid, Gallery_name, Eid),
    FOREIGN KEY (Mid) REFERENCES MUSEUM(Mid),
    FOREIGN KEY (Gallery_name) REFERENCES GALLERY_SPACE(Gallery_name),
    FOREIGN KEY (Eid) REFERENCES EXHIBITION(Eid)
);

CREATE TABLE CURATES(
    Cid INT,
    Eid INT,
    PRIMARY KEY(Cid, Eid),
    FOREIGN KEY (Cid) REFERENCES Curator(Cid),
    FOREIGN KEY (Eid) REFERENCES EXHIBITION(Eid)
);

CREATE TABLE EMPLOYS(
    Mid INT,
    Cid Int UNIQUE,
    PRIMARY KEY(Mid, Cid),
    FOREIGN KEY(Mid) REFERENCES MUSEUM(Mid),
    FOREIGN KEY(Cid) REFERENCES CURATOR(Cid)
);

CREATE TABLE EXHIBITION_HAS_ARTWORK(
    Eid INT,
    Art_id Int,
    PRIMARY KEY(Eid, Art_id),
    FOREIGN KEY(Eid) REFERENCES EXHIBITION(Eid),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)
);

CREATE TABLE PAINTING(
    Art_id Int,
    Paint_type VARCHAR(10) NOT NULL,
    Surface VARCHAR(10) NOT NULL,
    PRIMARY KEY(Art_id),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)
);

CREATE TABLE SCULPTURE(
    Art_id Int,
    Technique VARCHAR(10) NOT NULL,
    PRIMARY KEY(Art_id),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)

);
CREATE TABLE PHOTO(
    Art_id Int,
    Film VARCHAR(10) NOT NULL,
    PRIMARY KEY(Art_id),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)
);

CREATE TABLE INSTALLATION(
    Art_id Int,
    Install_type VARCHAR(10) NOT NULL,
    PRIMARY KEY(Art_id),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)
);

CREATE TABLE OTHER(
    Art_id Int,
    Medium_exception VARCHAR(10) NOT NULL,
    PRIMARY KEY(Art_id),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)

);
CREATE TABLE MATERIAL(
    Art_id Int,
    Material VARCHAR(10) NOT NULL,
    PRIMARY KEY(Art_id),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)
);

CREATE TABLE SERIES(
    Sid Int,
    Name VARCHAR(15) NOT NULL,
    PRIMARY KEY(Sid)
);

CREATE TABLE SERIES_HAS_ARTWORK(
    Sid Int,
    Art_id Int,
    PRIMARY KEY(Sid, Art_id),
    FOREIGN KEY(Sid) REFERENCES SERIES(Sid),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)
);

CREATE TABLE CREATES(
    Artist_id Int,
    Art_id Int,
    PRIMARY KEY(Artist_id, Art_id),
    FOREIGN KEY(Artist_id) REFERENCES ARTIST(Artist_id),
    FOREIGN KEY(Art_id) REFERENCES ARTWORK(Art_id)
);

CREATE TABLE ARTIST_MEDIUM_DISCIPLINE(
    Artist_id Int,
    Medium_discipline VARCHAR(12) NOT NULL,
    PRIMARY KEY(Artist_id, Medium_discipline),
    FOREIGN KEY(Artist_id) REFERENCES ARTIST(Artist_id)
);



INSERT INTO MUSEUM (Mid, Name, Street, City, State, Zip, Country)
VALUES
(1, 'Museum of Art', 'Main St', 'CityA', 'StateA', 12345, 'CountryA'),
(2, 'History Museum', 'Second St', 'CityB', 'StateB', 23456, 'CountryB'),
(3, 'Science Museum', 'Third St', 'CityC', 'StateC', 34567, 'CountryC');


INSERT INTO CONTACT (Mid, Name, Email, Phone_num)
VALUES
(1, 'John Doe', 'john@example.com', 1234567890),
(2, 'Jane Smith', 'jane@example.com', 2345678901),
(3, 'Alice Johnson', 'alice@example.com', 3456789012);


INSERT INTO HOURS (Mid, Day, Opening_time, Closing_time)
VALUES
(1, 'Monday', '09:00:00', '17:00:00'),
(2, 'Tuesday', '10:00:00', '18:00:00'),
(3, 'Wednesday', '11:00:00', '19:00:00');


INSERT INTO GALLERY_SPACE (Mid, Gallery_name, Height, Width, Length)
VALUES
(1, 'Gallery A', 10, 20, 30),
(2, 'Gallery B', 15, 25, 35),
(3, 'Gallery C', 20, 30, 40),
(1, 'Gallery D', 10, 20, 30);


INSERT INTO CURATOR (Cid, Name)
VALUES
(1, 'Curator Abby'),
(2, 'Curator Bianca'),
(3, 'Curator Calvin');


INSERT INTO ARTWORK (Art_id, Name, Date_created, Height, Width, Length, Status)
VALUES
(1, 'Artwork A', '2020-01-01', 10, 20, 30, 'Available'),
(2, 'Artwork B', '2021-02-02', 15, 25, 35, 'On Loan'),
(3, 'Artwork C', '2022-03-03', 20, 30, 40, 'In Storage');


INSERT INTO ARTIST (Artist_id, Name, date_of_birth, date_of_death)
VALUES
(1, 'Artist Annaie', '1980-01-01', NULL),
(2, 'Artist Bob', '1970-02-02', '2020-02-02'),
(3, 'Artist Chris', '1990-03-03', NULL);


INSERT INTO EXHIBITION (Eid, Name)
VALUES
(1, 'Exhibition A'),
(2, 'Exhibition B'),
(3, 'Exhibition C');

INSERT INTO HOSTS (Mid, Gallery_name, Eid, Start_date, End_date)
VALUES
(1, 'Gallery A', 1, '2023-01-01', '2023-06-01'),
(2, 'Gallery B', 2, '2023-02-01', '2023-07-01'),
(3, 'Gallery C', 3, '2023-03-01', '2023-08-01');

INSERT INTO CURATES(Cid, Eid)
VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO EMPLOYS (Mid, Cid)
VALUES
(1, 1),
(2, 2),
(3, 3);


INSERT INTO EXHIBITION_HAS_ARTWORK (Eid, Art_id)
VALUES
(1, 1),
(2, 2),
(3, 3);


INSERT INTO PAINTING (Art_id, Paint_type, Surface)
VALUES
(1, 'Oil', 'Canvas'),
(2, 'Acrylic', 'Wood'),
(3, 'Watercolor', 'Paper');


INSERT INTO SCULPTURE (Art_id, Technique)
VALUES
(1, 'Carving'),
(2, 'Casting'),
(3, 'Modeling');


INSERT INTO PHOTO (Art_id, Film)
VALUES
(1, '35mm'),
(2, 'Digital'),
(3, 'Polaroid');


INSERT INTO INSTALLATION (Art_id, Install_type)
VALUES
(1, 'Interactive'),
(2, 'Site-specific'),
(3, 'Immersive');


INSERT INTO OTHER (Art_id, Medium_exception)
VALUES
(1, 'Mixed Media'),
(2, 'Found Objects'),
(3, 'Performance');


INSERT INTO MATERIAL (Art_id, Material)
VALUES
(1, 'Wood'),
(2, 'Metal'),
(3, 'Plastic');


INSERT INTO SERIES (Sid, Name)
VALUES
(1, 'Series A'),
(2, 'Series B'),
(3, 'Series C');


INSERT INTO SERIES_HAS_ARTWORK (Sid, Art_id)
VALUES
(1, 1),
(2, 2),
(3, 3);


INSERT INTO CREATES (Artist_id, Art_id)
VALUES
(1, 1),
(2, 2),
(3, 3);


INSERT INTO ARTIST_MEDIUM_DISCIPLINE (Artist_id, Medium_discipline)
VALUES
(1, 'Painting'),
(2, 'Sculpture'),
(3, 'Photography');


-- 1c - Get_oldest_in_exhibit

-- 2a - Search_artist
-- 2b - Search_artwork
-- 2c - Search_exhibition

-- 3a - Add_new_exhibit
-- 3b - Rotate_exhibit
-- 3c - Delete_exhibit
-- 3d - Update_artwork_status
-- 3e - Update_exhibit

-- 4a - Update_artwork
-- 4b - Update_artist
-- 4c - Update_series
 
-- 5a - Update_curator
-- 5b - Fire_curator
-- 5c - Hire_curator

-- 6 - Get_museum_info

-- 1a - Get_available_exhibitions
SELECT E.*
FROM MUSEUM M, HOSTS H, EXHIBITION E
WHERE M.Mid = H.Mid
AND H.Eid = E.Eid
AND M.Name = 'Museum of Art'
AND (H.start_date BETWEEN '2024-01-01' AND '2024-01-01'
OR H.end_date BETWEEN '2024-01-01' AND '2024-01-01');

-- 1b - Get_exhibit_artwork_info
SELECT A.*, S.Name AS SeriesName, AR.Name AS ArtistName, P.Paint_type, SCL.Technique, PH.Film, I.Install_type, O.Medium_exception, M.Material
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
AND EHA.Eid = 1;

-- 1c - Get_oldest_in_exhibit
SELECT A.*
FROM EXHIBITION_HAS_ARTWORK EHA, ARTWORK A
WHERE EHA.Art_id = A.Art_id
AND EHA.Eid = 1
ORDER BY A.Date_created ASC
LIMIT 1;

-- 2a - Search_artist
SELECT AR.Artist_id, AR.Name AS Artist_Name, M.*, EHA.Eid, H.Gallery_name, E.Name AS Exhibit_name,  H.start_date, H.end_date, A.Art_id, A.Name as Artwork_Name
FROM ARTIST AR, CREATES C, ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE AR.Artist_id = C.Artist_id
AND C.Art_id = A.Art_id
AND A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND H.Mid = M.Mid
AND E.Eid = EHA.Eid
AND AR.Name='Artist Annie';

-- 2b - Search_artwork
SELECT A.Name as Artwork_Name, A.Art_id, M.*, H.start_date, H.end_date, E.Name AS Exhibit_name, H.Gallery_name
FROM ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M
WHERE A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND H.Mid = M.Mid
AND (A.Name='Artwork A' OR A.Art_id = 1);

-- 2c - Search_exhibition
SELECT E.Name as Exhibition_name, E.Eid, H.Gallery_name, M.*
FROM ARTWORK A, EXHIBITION_HAS_ARTWORK EHA, HOSTS H, MUSEUM M, EXHIBITION E
WHERE A.Art_id = EHA.Art_id
AND EHA.Eid = H.Eid
AND EHA.Eid = E.Eid
AND H.Mid = M.Mid
AND (E.Name='Exhibition A' OR E.Eid = 1);

-- 3a - Add_new_exhibit
INSERT INTO EXHIBITION (Eid, Name)
VALUES (4, 'Exhibition D');

INSERT INTO HOSTS (Eid, Mid, gallery_name, start_date, end_date)
VALUES (4, 1, 'Gallery D', '2024-11-01', '2025-05-01');

INSERT INTO CURATES (Eid, Cid)
VALUES (4, 1);

-- 3b - Rotate_exhibit
UPDATE HOSTS
SET Mid = 2, gallery_name = 'Gallery B', start_date = '2024-01-01', end_date = '2025-01-01'
WHERE Eid = 1;

-- 3c - Delete_exhibit
DELETE FROM HOSTS
WHERE Eid = 4;

DELETE FROM EXHIBITION_HAS_ARTWORK
WHERE Eid = 4;

DELETE FROM CURATES
WHERE Eid = 4;

DELETE FROM EXHIBITION
WHERE Eid = 4;

-- 3d - Update_artwork_status
UPDATE ARTWORK
SET Status = 'On Loan'
WHERE Art_id = 3;

-- 3e - Update_exhibit
DELETE FROM EXHIBITION_HAS_ARTWORK
WHERE Eid = 3 AND Art_id = 3;

INSERT INTO EXHIBITION_HAS_ARTWORK (Eid, Art_id)
VALUES (2, 3);

-- 4a - Update_artwork
UPDATE ARTWORK
SET Name = 'Mona Lisa'
WHERE Art_id = 1;

-- 4b - Update_artist
UPDATE ARTIST
SET date_of_death = '2024-12-01'
WHERE Artist_id = 3;

UPDATE ARTIST_MEDIUM_DISCIPLINE
SET Medium_discipline = 'Other'
WHERE Artist_id = 1;

-- 4c - Update_series
DELETE FROM SERIES_HAS_ARTWORK
WHERE Sid = 1 AND Art_id = 1;

INSERT INTO SERIES_HAS_ARTWORK (Sid, Art_id)
VALUES (2, 1);

-- 5a - Update_curator
UPDATE CURATES
SET Eid = 1
WHERE Cid = 2 AND Eid = 2;

-- 5b - Fire_curator
DELETE FROM EMPLOYS
WHERE Cid = 1 AND Mid = 1;

-- 5c - Hire_curator
INSERT INTO EMPLOYS (Cid, Mid)
VALUES (1, 1);

-- 6 - Get_museum_info
SELECT M.*, C.Name AS ContactName, C.Email, C.Phone_num, H.Day, H.Opening_time, H.Closing_time
FROM MUSEUM M, CONTACT C, HOURS H
WHERE M.Mid = C.Mid
AND M.Mid = H.Mid
AND M.Mid = '1';