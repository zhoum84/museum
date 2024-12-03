import React from "react";
import { useState } from "react";
import axios from "axios";

export const ArtistPage = () => {
  const [action, setAction] = useState("view");

  const [artist_id, setArtistId] = useState("");
  const [artwork_id, setArtworkId] = useState("");
  const [series_id, setSeriesId] = useState("");
  const [new_series_id, setNewSeriesId] = useState("");

  const [res, setRes] = useState([]);
  const handleClick = (e) => {
    setAction(e.target.value);
  };

  const updateSeries = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:4000/series/update", {
        artwork_id: artwork_id,
        series_id: series_id,
        new_series_id: new_series_id,
      });
      console.log("Data:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error making PUT request:", error);
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
      {/* {action === "Edit Artwork" && (
        <>
          <label>
            Enter new height:{" "}
            <input
              type="text"
              value={eid}
              onChange={(e) => setEid(e.target.value)}
            />
          </label>
          <label>
            Enter new width:{" "}
            <input
              type="text"
              value={newEid}
              onChange={(e) => setNewEid(e.target.value)}
            />
          </label>
        </>
      )} */}
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
