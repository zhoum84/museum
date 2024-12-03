import React from "react";
import { useState } from "react";
import axios from "axios";

export const ArtistPage = () => {
  const [action, setAction] = useState("view");

  const [artist_id, setArtistId] = useState("");
  const [artwork_id, setArtworkId] = useState("");

  // Artwork details
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [medium, setMedium] = useState("");
  const [material, setMaterial] = useState("");

  // Artist details
  const [artist_name, setArtistName] = useState("");
  const [date_of_death, setDateOfDeath] = useState("");
  const [artist_medium, setArtistMedium] = useState("");
  const [discipline, setDiscipline] = useState("");

  // Series details
  const [series_id, setSeriesId] = useState("");
  const [new_series_id, setNewSeriesId] = useState("");

  const [res, setRes] = useState([]);
  const handleClick = (e) => {
    setAction(e.target.value);
  };

  const updateArtwork = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/artwork/update",
        {
          artwork_id,
          height,
          width,
          length,
          status,
          name,
          medium,
          material,
        }
      );
      console.log("Artwork update response:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error making POST request for artwork update:", error);
    }
  };

  const updateArtist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/artist/update", {
        artist_id,
        name,
        date_of_death,
      });
      console.log("Artist update response:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error making POST request for artist update:", error);
    }
  };

  const updateArtistMediumDiscipline = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/artist/medium-discipline/update",
        {
          artist_id,
          medium,
          discipline,
        }
      );
      console.log("Artist Medium/Discipline update response:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error(
        "Error making POST request for artist medium/discipline update:",
        error
      );
    }
  };

  const updateSeries = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/series/update", {
        artwork_id: artwork_id,
        series_id: series_id,
        new_series_id: new_series_id,
      });
      console.log("Data:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const elongateId = (id) => {
    const obj = {
      Mid: "Museum ID",
      Eid: "Exhibition ID",
      Artist_id: "Artist ID",
      Art_id: "Art ID",
      Cid: "Curator ID",
    };
    if (Object.keys(obj).includes(id)) {
      return obj[id];
    }
    return id;
  };

  return (
    <div>
      Manage Artists and Artwork
      <form className={"form"}>
        <label>
          <input
            type="radio"
            value="Edit Artist"
            checked={action === "Edit Artist"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Update Artist
        </label>
        <label>
          <input
            type="radio"
            value="Edit Artwork"
            checked={action === "Edit Artwork"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Update Artwork
        </label>
        <label>
          <input
            type="radio"
            value="Edit Series"
            checked={action === "Edit Series"}
            onClick={(e) => handleClick(e)}
          />
          Update Series
        </label>
      </form>
      {action === "Edit Artist" && (
        <>
          <div>
            <label>
              Enter artist ID:{" "}
              <input
                type="text"
                value={artist_id}
                onChange={(e) => setArtistId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter name:{" "}
              <input
                type="text"
                value={artist_name}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter date of death:{" "}
              <input
                type="text"
                value={date_of_death}
                onChange={(e) => setDateOfDeath(e.target.value)}
              />
            </label>
          </div>
          <button onClick={updateArtist}>Update Artist</button>

          <div>
            <label>
              Enter medium:{" "}
              <input
                type="text"
                value={artist_medium}
                onChange={(e) => setArtistMedium(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter discipline:{" "}
              <input
                type="text"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
              />
            </label>
          </div>
          <button onClick={updateArtistMediumDiscipline}>
            Update Medium/Discipline
          </button>
        </>
      )}
      {action === "Edit Artwork" && (
        <>
          <div>
            <label>
              Enter artwork ID:{" "}
              <input
                type="text"
                value={artwork_id}
                onChange={(e) => setArtworkId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter height:{" "}
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter width:{" "}
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter length:{" "}
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter status:{" "}
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter name:{" "}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter medium:{" "}
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter material:{" "}
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
            </label>
          </div>
          <button onClick={updateArtwork}>Update Artwork</button>
        </>
      )}
      {action === "Edit Series" && (
        <>
          <div>
            <label>
              Enter artwork id:{" "}
              <input
                type="text"
                value={artwork_id}
                onChange={(e) => setArtworkId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter series id to remove artwork from:{" "}
              <input
                type="text"
                value={series_id}
                onChange={(e) => setSeriesId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter series id to remove artwork to:{" "}
              <input
                type="text"
                value={new_series_id}
                onChange={(e) => setNewSeriesId(e.target.value)}
              />
            </label>
          </div>
          <button onClick={updateSeries}>Update Series</button>
        </>
      )}
    </div>
  );
};
