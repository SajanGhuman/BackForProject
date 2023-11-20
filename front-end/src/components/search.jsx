import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Search = () => {
  return (
    <div className="search__container">
      <div className="search__div">
        <input type="text" />
      </div>
    </div>
  );
};

export default Search;
