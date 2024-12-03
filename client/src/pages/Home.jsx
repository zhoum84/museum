import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleCuratorClick = () => {
    navigate("/curators");
  };

  const handleArtistClick = () => {
    navigate("/artists");
  };

  const handleExhibitClick = () => {
    navigate('/exhibits')
  }

  const handleUserExhibitClick = () => {
    navigate('/exhibitinfo')
  }
  return (
    <>
      <section className="heading">
        <h1>Museum App</h1>
      </section>

      <button className="btn btn-blue-block" onClick={handleSearchClick}>Search Actions</button>
      <button className="btn btn-blue-block" onClick={handleExhibitClick}>Exhibit Management</button>
      <button className="btn btn-blue-block" onClick={handleArtistClick}>Artist and Artwork Management</button>
      <button className="btn btn-blue-block" onClick={handleCuratorClick}>Curator Management</button>
      <button className="btn btn-blue-block" onClick={handleUserExhibitClick}>User Exhibit</button>
    <div>

    </div>
    </>
  );
};

export default Home;
