import React, { useState } from "react";
import axios from "axios";


// Add_new_exhibit
// Delete_exhibit

// Rotate_exhibit
// Update_artwork_status
// Update_exhibit

export const ExhibitPage = () => {
  const [action, setAction] = useState("view");
  const [res, setRes] = useState([]);
  const [curatorId, setCuratorId] = useState("");
  const [exhibitName, setExhibitName] = useState("");
  const [exhibitId, setExhibitId] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artId, setArtId] = useState("");
  const [status, setStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleClick = (e) => {
    setAction(e.target.value);
    setResponseMessage("");
  };

  const elongateId = (id) => {
    const obj = {
      Mid: "Museum ID",
      Eid: "Exhibition ID",
      Artist_id: "Artist ID",
      Art_id: "Art ID",
      Cid: "Curator ID",
    };
    return obj[id] || id;
  };

  const updateArtworkStatus = async (e) => {
    e.preventDefault();
    if (!artId || !status) {
      setResponseMessage("Please enter both Art ID and Status.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/artwork/update-status",
        {
          artId,
          status,
        }
      );
      console.log("Update artwork status response:", response.data);
      setResponseMessage("Artwork status updated successfully.");
      setRes(response.data);
    } catch (error) {
      console.error("Error making POST request for artwork status:", error);
      setResponseMessage("Error updating artwork status.");
    }
  };

  const addNewExhibit = async (e) => {
    e.preventDefault();
    if (!exhibitName || !exhibitId || !galleryName || !curatorId) {
      setResponseMessage("Please fill in all fields to add a new exhibit.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/exhibit/add", {
        exhibitName,
        exhibitId,
        galleryName,
        curatorId,
      });
      console.log("Add new exhibit response:", response.data);
      setResponseMessage("New exhibit added successfully.");
      setRes(response.data);
    } catch (error) {
      console.error("Error making POST request to add new exhibit:", error);
      setResponseMessage("Error adding new exhibit.");
    }
  };

  const rotateExhibit = async (e) => {
    e.preventDefault();
    if (!exhibitId || !galleryName) {
      setResponseMessage("Please enter Exhibit ID and New Gallery Name.");
      return;
    }
    try {
      const response = await axios.put("http://localhost:4000/exhibit/rotate", {
        exhibitId,
        galleryName,
      });
      console.log("Rotate exhibit response:", response.data);
      setResponseMessage("Exhibit rotated successfully.");
      setRes(response.data);
    } catch (error) {
      console.error("Error making PUT request to rotate exhibit:", error);
      setResponseMessage("Error rotating exhibit.");
    }
  };

  const deleteExhibit = async (e) => {
    e.preventDefault();
    if (!exhibitId) {
      setResponseMessage("Please enter Exhibit ID.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/exhibit/delete",
        {
          data: { exhibitId },
        }
      );
      console.log("Delete exhibit response:", response.data);
      setResponseMessage("Exhibit deleted successfully.");
      setRes(response.data);
    } catch (error) {
      console.error("Error making DELETE request to delete exhibit:", error);
      setResponseMessage("Error deleting exhibit.");
    }
  };

  const updateExhibit = async (e) => {
    e.preventDefault();
    if (!exhibitId || !artId) {
      setResponseMessage("Please enter both Exhibit ID and Art ID.");
      return;
    }
    try {
      const response = await axios.put("http://localhost:4000/exhibit/update", {
        exhibitId,
        artId,
      });
      console.log("Update exhibit response:", response.data);
      setResponseMessage("Exhibit updated successfully.");
      setRes(response.data);
    } catch (error) {
      console.error("Error making PUT request to update exhibit:", error);
      setResponseMessage("Error updating exhibit.");
    }
  };

  return (
    <div>
      Manage Exhibits
      <form className="form">
        <div>
          <label>
            <input
              type="radio"
              value="update"
              checked={action === "update"}
              onClick={handleClick}
            />
            Update Artwork Status
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="hire"
              checked={action === "hire"}
              onClick={handleClick}
            />
            Add New Exhibit
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="rotate"
              checked={action === "rotate"}
              onClick={handleClick}
            />
            Rotate Exhibit
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="delete"
              checked={action === "delete"}
              onClick={handleClick}
            />
            Delete Exhibit
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="update-exhibit"
              checked={action === "update-exhibit"}
              onClick={handleClick}
            />
            Update Exhibit with Artwork
          </label>
        </div>
      </form>
      {action === "update" && (
        <div>
          <div>
            <label>
              Enter Art ID:
              <input
                type="text"
                value={artId}
                onChange={(e) => setArtId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter Status:
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </label>
          </div>
          <button onClick={updateArtworkStatus}>Update Status</button>
        </div>
      )}
      {action === "delete" && (
        <div>
          <div>
            <label>
              Enter Exhibit Id:
              <input
                type="text"
                value={exhibitId}
                onChange={(e) => setExhibitId(e.target.value)}
              />
            </label>
          </div>
          <button onClick={deleteExhibit}>Delete Exhibit</button>
        </div>
      )}
      {action === "rotate" && (
        <div>
          <div>
            <label>
              Enter Exhibit ID:
              <input
                type="text"
                value={exhibitId}
                onChange={(e) => setExhibitId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter New Gallery Name:
              <input
                type="text"
                value={galleryName}
                onChange={(e) => setGalleryName(e.target.value)}
              />
            </label>
          </div>
          <button onClick={rotateExhibit}>Rotate Exhibit</button>
        </div>
      )}
      {action === "update-exhibit" && (
        <div>
          <div>Update Exhibit with Artwork</div>
          <div>
            <label>
              Enter Exhibit ID:
              <input
                type="text"
                value={exhibitId}
                onChange={(e) => setExhibitId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Enter Art ID:
              <input
                type="text"
                value={artId}
                onChange={(e) => setArtId(e.target.value)}
              />
            </label>
          </div>
          <button onClick={updateExhibit}>Update Exhibit</button>
        </div>
      )}
      <div>
        {responseMessage && <p>{responseMessage}</p>}
        {res.length > 0 && (
          <div>
            Results
            <ul>
              {res.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
