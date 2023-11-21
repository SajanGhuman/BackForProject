import "../App.css";
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const DeleteUsers = () => {
  const navget = useNavigate();

  const { userID } = useParams();

  const data = {
    userID: userID,
  };
  console.log(data);
  const confirm = () => {
    if (data.userID === "") {
      return;
    }
    fetch("http://localhost/react-project/back-end/deleteUsers.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      navget("/dashboard");
    });
  };

  const goBack = () => {
    navget("/dashboard");
  };
  return (
    <div>
      <h1 className="sure__text">Are you sure you want to delete this row?</h1>
      <button className="go__back__button" onClick={goBack}>
        Go Back
      </button>
      <button className="del__button" onClick={confirm}>
        Delete
      </button>
    </div>
  );
};

export default DeleteUsers;
