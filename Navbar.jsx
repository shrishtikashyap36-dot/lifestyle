import React from 'react';

const Navbar = ({ setActiveTab }) => {
  return (
    <nav className="navbar">
      <div className="logo">LifeEasy</div>
      <div className="nav-links">
        <button className="nav-btn" onClick={() => setActiveTab('complaints')}>Complaints</button>
        <button className="nav-btn" onClick={() => setActiveTab('reviews')}>Reviews</button>
        <button className="nav-btn" onClick={() => setActiveTab('calculator')}>Calculator</button>
        <button className="nav-btn special-btn" onClick={() => setActiveTab('2d3d')}>2D → 3D</button>
      </div>
    </nav>
  );
};

export default Navbar;