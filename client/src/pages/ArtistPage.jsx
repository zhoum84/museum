import React from "react";
import { useState } from "react";
import axios from "axios";


export const ArtistPage = () => {
  const [action, setAction] = useState("view");
  // Update_artwork

  // Update_artist
  
  // Update_series  
  const [res, setRes] = useState([]);
  const handleClick = (e) => {
    setAction(e.target.value);
  };

  const elongateId = (id) => {
    const obj = {
      "Mid" : "Museum ID",
      "Eid" : "Exhibition ID",
      "Artist_id" : "Artist ID",
      "Art_id" : "Art ID",
      "Cid" : "Curator ID",
    }
    if (Object.keys(obj).includes(id)){
      return obj[id];
    }
    return id;
  }
  async function getData() {
    try {
      const response = await axios.get("http://localhost:4000/curators");
      console.log("Data:", response.data);
      setRes(response.data)

    } catch (error) {
      console.error("Error making GET request:", error);
    }
  }
  
  return (
    <div>
      Manage Artists and Artwork
      <form className={"form"}>
        <label>
          <input
            type="radio"
            value="view"
            checked={action === "view"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Update Artist
        </label>
        <label>
          <input
            type="radio"
            value="update"
            checked={action=== "update"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Update Artwork
        </label>
        <label>
          <input
            type="radio"
            value="hire"
            checked={action=== "hire"}
            onClick={(e) => handleClick(e)}
          />
          Update Series
        </label>
      </form>
      
      Enter curator id: <input type="text" /> 
      <button onClick={getData}>
        {action}
      </button>
      <table>

      <tr>
      {res.length > 0 && Object.keys(res[0]).map(k => <td>{elongateId(k)}</td>)}
      </tr>
      {res.map(obj => <tr>{Object.entries(obj).map(([key, value]) => (
        <td key={key}>
          {value}
        </td>
        
      ))}</tr>)}
      </table>
    </div>
  );
};