import { useContext, useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ADD from "./add";
import Content from "./content";
import EDIT from "./edit";

const AdminDashboard = () => {
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
      <div className="add__main__div__1">
        <Link to="/ADD" className="add__div">
          <p className="add__text">Add a Algorithm</p>
        </Link>
        <br />
        <Link to="/ADDUSER" className="add__div">
          <p className="add__text">Add a User</p>
        </Link>
      </div>
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

export default AdminDashboard;

{
  /* <div className="add__main__div__2">
  <Link to="/content" className="add__div">
    <p className="add__text">Show Database</p>
  </Link>
</div> */
}
