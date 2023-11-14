import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Logout from "./logoutButton/";
import LOGIN from "./login";
import LoginButton from "./loginButton";

const LR = () => {
  const [change, setChange] = useState(Boolean);
  const navget = useNavigate();

  const changeFunc = () => {
    setChange(true);
    setTimeout(() => navget("/"), 3000);
  };
  return (
    <div>
      {localStorage.getItem("login") === "false" ? (
        <LoginButton changeFunc={changeFunc} />
      ) : (
        <div className="logout__div">
          <Logout />
        </div>
      )}
    </div>
  );
};

export default LR;
