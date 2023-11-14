import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Cube from "./cube";

const Navbar = () => {
    const [login, setLogin] = useState(localStorage.getItem("login"));

  return (
    <nav>
      <ul className="nav__ul">
        <li>
          <Link to="/">
            <Cube />
          </Link>
        </li>
        <li>
          <Link to="/content">ALGORITHMS</Link>
        </li>
        <li>
          {login === "false" ? (
            <Link to="/needToLogin">DASHBOARD</Link>
          ) : (
            <Link to="/dashboard">DASHBOARD</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
