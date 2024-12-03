import React from "react";
import { useState } from "react";
import axios from "axios";
export const SearchPage = () => {
  const [search, setSearch] = useState("artists");
  const [searchByName, setSearchByName] = useState(true);
  const [query, setQuery] = useState("");
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

  async function makeSearch() {
    try {
      console.log(search)
      const response = await axios.get(`http://localhost:4000/${search}`, {
        params: { ...searchByName && {name: query}, 
        ...!searchByName && {id: query} 
      },
      });
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
            value="artists"
            checked={search === "artists"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Artist
        </label>
        <label>
          <input
            type="radio"
            value="artworks"
            checked={search === "artworks"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Artwork
        </label>
        <label>
          <input
            type="radio"
            value="exhibitions"
            checked={search === "exhibitions"}
            onClick={(e) => handleClick(e)}
          />
          Exhibit
        </label>
        <label>
          <input
            type="radio"
            value="museums"
            checked={search === "museums"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Museum
        </label>
      </form>
      <div>
        Search by:{" "}
        <label>
          <input
            type="radio"
            checked={searchByName}
            onClick={() => setSearchByName(true)}
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            checked={!searchByName}
            onClick={() => setSearchByName(false)}
          />{" "}
          ID
        </label>
      </div>
      Enter {search} {searchByName ? "'s name: " : "'s id: "}
      <input 
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)}/>
      <button onClick={makeSearch}>Search!</button>
      <div className={"flex-col"}>
        <table>
          <tbody>
          <tr>
            {res.length > 0 &&
              Object.keys(res[0]).map((k) => <td>{elongateId(k)}</td>)}
          </tr>
          {res.map((obj) => (
            <tr>
              {Object.entries(obj).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};
