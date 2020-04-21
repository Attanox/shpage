import React from "react";

import SearchBar from "./SearchBar";

import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav">
      <div className="nav-bar">
        <div className="logo">
          <span role="img" aria-label="logo">
            🐯
          </span>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}
