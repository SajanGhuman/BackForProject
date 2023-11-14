import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Logout from "./logout";

const LR = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));

  const handleLogout = () => {
    localStorage.setItem("login", "false");
    setLogin("false");
  };
  return (
    <div>
      {login === "false" ? (
        <div className="lr__div">
          <Link to="/login">
            <button className="login lr__button">LOGIN</button>
          </Link>
          <Link to="/register">
            <button className="register lr__button">REGISTER</button>
          </Link>
        </div>
      ) : (
        <div className="logout__div">
          <Logout onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default LR;