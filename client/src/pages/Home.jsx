import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  const handleSearchClick = () => {
    navigate('/search');
  }

  return (
    <>
      <section className="heading">
        <h1>Museum App</h1>
      </section>

      <button className="btn btn-blue-block" onClick={handleSearchClick}>Search Actions</button>
      <button className="btn btn-blue-block" onClick={handleClick}>Exhibit Management</button>
      <button className="btn btn-blue-block" onClick={handleClick}>Artist and Artwork Management</button>
      <button className="btn btn-blue-block" onClick={handleClick}>Curator Management</button>
      <button className="btn btn-blue-block" onClick={handleClick}>User Exhibit</button>
    <div>

    </div>
    </>
  );
};

export default Home;