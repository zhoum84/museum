import React from "react";
import { useState } from "react";
import axios from "axios";

export const CuratorPage = () => {
  const [action, setAction] = useState("view");
  const [cid, setCid] = useState("");
  const [eid, setEid] = useState("");
  const [mid, setMid] = useState("");
  const [result, setResult] = useState("");
  const [errorText, setErrorText] = useState('');
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
      const response = await axios.get("http://localhost:4000/curators/view");
      console.log("Data:", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  }

  async function hire() {
    try {
      const response = await axios.post("http://localhost:4000/curators/hire", {
          cid: cid,
          mid: mid,
        });
        setResult(`Hire successful. Curator with id ${cid} has been employed by Museum with id ${mid}.`)
    } catch (error){
        console.error("Error making POST request:", error);
        setErrorText(error.message)
    }
  }

  const fire = async() => {
    try {
        const response = await axios.post("http://localhost:4000/curators/fire", {
            cid: cid,
            mid: mid,
          });
          setResult(`Fire successful. Curator with id ${cid} is no longer employed by Museum with id ${mid}.`)
      } catch (error){
          console.error("Error making POST request:", error);
          setErrorText(error.message)
      }  
  }

  const isNumeric = (str) =>  {
    if (typeof str != "string") return false 
    return !isNaN(str) && !isNaN(parseFloat(str))
  }

  const handleButtonClick = () => {
    setErrorText('')
    if (action === "view"){
        getData()
    } else if (action === "hire"){
        hire()
    } else if (action === "fire"){
        fire()
    }
  }

  const handleResult = () => {

    if(action === "view"){
        return         <table>
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
    } else if (errorText.length > 0){
        return <div style={{color: 'red'}}>{errorText}</div>
    } else {
        return <div>{result}</div>
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
          Enter curator id:{" "}
          <input
            type="text"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
          />
        </label>
        {action === "update" && (
          <label>
            Enter exhibition id:{" "}
            <input
              type="text"
              value={eid}
              onChange={(e) => setEid(e.target.value)}
            />
          </label>
        )}

        {(action === "hire" || action === "fire") && (
          <label>
            Enter museum id:{" "}
            <input
              type="text"
              value={mid}
              onChange={(e) => setMid(e.target.value)}
            />
          </label>
        )}

        <div>
          <button disabled={!isNumeric(cid) && action !== "view"} onClick={handleButtonClick}>{action}</button>
        </div>
      </div>
      <div className={"flex-col"}>
      {handleResult()}
      </div>
    </div>
  );
};
