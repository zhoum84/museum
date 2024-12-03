import React from "react";
import { useState } from "react";
import axios from "axios";

export const CuratorPage = () => {
  const [action, setAction] = useState("view");
  //   Update_curator

  //   Fire_curator

  //   Hire_curator
  const [res, setRes] = useState([]);
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
      const response = await axios.get("http://localhost:4000/curators");
      console.log("Data:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  }

  return (
    <div>
      Manage Curators
      <form className={"form"}>
        <label>
          <input
            type="radio"
            value="view"
            checked={action === "view"}
            onClick={(e) => handleClick(e)}
          />{" "}
          View
        </label>
        <label>
          <input
            type="radio"
            value="update"
            checked={action === "update"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Update Curator Exhibits
        </label>
        <label>
          <input
            type="radio"
            value="hire"
            checked={action === "hire"}
            onClick={(e) => handleClick(e)}
          />
          Hire
        </label>
        <label>
          <input
            type="radio"
            value="fire"
            checked={action === "fire"}
            onClick={(e) => handleClick(e)}
          />{" "}
          Fire
        </label>
      </form>
      <div className="flex-col">
        <label>
          Enter curator id: <input type="text" />
        </label>
        {action === "update" && (
          <label>
            Enter exhibition id: <input type="text" />
          </label>
        )}

        {action === "hire" && (
          <label>
            Enter museum id: <input type="text" />
          </label>
        )}
        <div>
          <button onClick={getData}>{action}</button>
        </div>
      </div>
      <div className={"flex-col"}>
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
