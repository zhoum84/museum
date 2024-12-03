import React from "react";
import { useState } from "react";
import axios from "axios";

// Get_available_exhibitions

// Get_exhibit_artwork_info

// Get_oldest_in_exhibit

export const ExhibitInfo = () => {
  const [action, setAction] = useState("available_exhibits");
  const [res, setRes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [eid, setEid] = useState("");
  const handleClick = (e) => {
    setAction(e.target.value);
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
  async function getData() {
    try {
      const response = await axios.get("http://localhost:4000/exhibitions", {
        params: {
            startDate: startDate,
            endDate: endDate,
            name: name
        }, 
    });
      console.log("Data:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  }

  const oldest = async() => {
    try {
        const response = await axios.get("http://localhost:4000/exhibitions/oldest", {
          params: {
              eid: eid
          }, 
      });
        console.log("Data:", response.data);
        setRes(response.data);
      } catch (error) {
        console.error("Error making GET request:", error);
      }
    }
  
    const artwork_info = async() => {
        try {
            const response = await axios.get("http://localhost:4000/exhibitions/artwork", {
              params: {
                  eid: eid
              }, 
          });
            console.log("Data:", response.data);
            setRes(response.data);
          } catch (error) {
            console.error("Error making GET request:", error);
          }
        }
    

    const handleButtonClick = () => {
        if (action === "available_exhibits"){
            getData()
        } else if (action === "exhibit_artwork"){
            artwork_info()
        } else if (action === "oldest"){
            oldest()
        }
    }
  return (
    <div>
      Exhibit Info For Users
      <form className={"form"}>
        <label>
          <input
            type="radio"
            value="available_exhibits"
            checked={action === "available_exhibits"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Get Available Exhibits at a Museum
        </label>
        <label>
          <input
            type="radio"
            value="exhibit_artwork"
            checked={action === "exhibit_artwork"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Get Exhibit Artwork Info
        </label>
        <label>
          <input
            type="radio"
            value="oldest"
            checked={action === "oldest"}
            onClick={(e) => handleClick(e)}
          />
          Get Oldest In Exhibit
        </label>
      </form>
      {action === "available_exhibits" ? (
        <div className="flex-col">
        <label>
          Enter museum name: <input type="text" value={name} onChange={e => setName(e.target.value)}/>{" "}
        </label>

        <label>
          Enter time range: (YYYY-MM-DD) <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>{" to "} <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </label>

        </div>
      ) : (
        <label>
          Enter exhibit id: <input type="text" value={eid} onChange={e => setEid(e.target.value)}/>{" "}
        </label>
      )}
      <button onClick={handleButtonClick}>{action}</button>
      <div className="flex-col">
      <table>
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
      </table>
      </div>
    </div>
  );
};
