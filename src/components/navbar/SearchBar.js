import React from "react";
import Mag from "../../images/icons/mag.svg";

export default function SearchBar() {
  return (
    <div>
      <input type="search" name="search" id="search" />
      <button type="submit">
        <img src={Mag} alt="search icon" />
      </button>
    </div>
  );
}
