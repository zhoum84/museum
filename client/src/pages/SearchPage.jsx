import React from "react";
import { useState } from "react";
import axios from "axios";
export const SearchPage = () => {
  const [search, setSearch] = useState("artist");
  const [searchByName, setSearchByName] = useState(true);
  
// Search Functions
// Search_artist

// Search_artwork

// Search_exhibition

// Museum Information
// Get_museum_info

  const [res, setRes] = useState([]);
  const handleClick = (e) => {
    setSearch(e.target.value);
  };

  const elongateId = (id) => {
    const obj = {
      "Mid" : "Museum ID",
      "Eid" : "Exhibition ID",
      "Artist_id" : "Artist ID",
      "Art_id" : "Art ID",
      "Cid" : "Curator ID",
    }

    console.log(Object.keys(obj))

    console.log(obj["Mid"])
    if (Object.keys(obj).includes(id)){
      return obj[id];
    }
    return id;
  }
  async function getData() {
    try {
      const response = await axios.get("http://localhost:4000/");
      console.log("Data:", response.data);
      setRes(response.data)

    } catch (error) {
      console.error("Error making GET request:", error);
    }
  }
  return (
    <div>
      What would you like to search?
      <form className={"form"}>
        <label>
          <input
            type="radio"
            value="artist"
            checked={search === "artist"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Artist
        </label>
        <label>
          <input
            type="radio"
            value="artwork"
            checked={search === "artwork"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Artwork
        </label>
        <label>
          <input
            type="radio"
            value="exhibit"
            checked={search === "exhibit"}
            onClick={(e) => handleClick(e)}
          />
          Exhibit
        </label>
        <label>
          <input
            type="radio"
            value="museum"
            checked={search === "museum"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Museum
        </label>
      </form>
      
      <div>Search by: 
      <label>
        <input type="radio" checked={searchByName} onClick={() => setSearchByName(true)} />Name
      </label>
      <label>
        <input type="radio" checked={!searchByName} onClick={() => setSearchByName(false)}/> ID
      </label>
      </div>
      Enter {search} {searchByName ? "name: " : "id: "}<input type="text" /> 
      <button onClick={getData}>
        Search!
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
