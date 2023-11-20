import "../App.css";
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const EDIT = () => {  
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const { algID } = useParams();

  const [formData, setFormData] = useState({
    algID: algID,
    name: "",
    notation: "",
    type: "",
  });

  const handleChange = (e, type) => {
    switch (type) {
      case "name":
        setError("");
        setFormData({ ...formData, name: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Name Is Empty");
        }
        break;
      case "notation":
        setError("");
        setFormData({ ...formData, notation: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Notation Is Empty");
        }
        break;
      case "type":
        setError("");
        setFormData({ ...formData, type: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("type Is Empty");
        }
        break;
    }
  };

  useEffect(() => {
    if (algID !== "") {
      fetch(`http://localhost/react-project/back-end/edit.php?algID=${algID}`)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Error occured");
          } else {
            setFormData({...formData,
              name: res.result[0].name || "",
              notation: res.result[0].notation || "",
              type: res.result[0].type || "",
            });
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, [algID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.algID !== "") {
      fetch("http://localhost/react-project/back-end/editForm.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Valiation Failed!! Try Again");
          } else {
            setMsg("Algorithm Added successfully!! Redirecting...");
            setTimeout(() => {
              navget("/dashboard");
            }, 3000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required");
    }
  };
  return (
    <div className="edit__div">
      {msg !== "" ? (
        <span className="success">{msg}</span>
      ) : (
        <span className="error">{error}</span>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul className="edit__ul">
          <li>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter alg Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <li>
            <label htmlFor="notation">Notation: </label>
            <input
              type="text"
              name="notation"
              value={formData.notation}
              placeholder="Enter Alg Notation"
              onChange={(e) => handleChange(e, "notation")}
            />
          </li>
          <li>
            <label htmlFor="type">Type: </label>
            <select
              value={formData.type}
              name="type"
              id="type"
              onChange={(e) => handleChange(e, "type")}
            >
              <option value="f2l">F2l</option>
              <option value="oll">OLL</option>
              <option value="pll">PLL</option>
            </select>
          </li>
          <button type="submit" className="add__submit">
            Update Algorithm
          </button>
        </ul>
      </form>
    </div>
  );
};

export default EDIT;
