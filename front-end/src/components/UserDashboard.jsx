import { useContext, useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ADD from "./add";
import Content from "./content";
import EDIT from "./edit";

const UserDashboard = () => {
  const [show, setShow] = useState(true);
  const [id, setID] = useState(null);

  useEffect(() => {
    handleID();
  }, [id]);

  const handleID = () => {
    console.log("running");
  };

  const handleShow = (algID) => {
    setID(algID);
  };

  return (
    <div>
      {show ? (
        <Content handleShow={handleShow} />
      ) : (
        <IDContext.Provider value={id}>
          <EDIT />
        </IDContext.Provider>
      )}
    </div>
  );
};

export default UserDashboard;
