import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const ADD = () => {
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
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
          setError("Type Is Empty");
        }
        break;
    }
  };

  useEffect(() => {
    {
      fetch(`http://localhost/react-project/back-end/getCategories.php`)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Error occured");
          } else {
            console.log(res.result);
            setCategories(res.result || []);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.notation !== "" &&
      formData.type !== ""
    ) {
      fetch("http://localhost/react-project/back-end/add.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError(res.result);
          } else {
            setMsg("Algorithm Added successfully!! Redirecting...");
            setTimeout(() => {
              navget("/");
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
    <div className="add__div__main">
      <div className="msg__div">
        {msg !== "" ? (
          <span className="success">{msg}</span>
        ) : (
          <span className="error">{error}</span>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul className="add__ul">
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter alg Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <li>
            <label htmlFor="notation">Notation:</label>
            <input
              type="text"
              name="notation"
              id="notation"
              value={formData.notation}
              placeholder="Enter Alg Notation"
              onChange={(e) => handleChange(e, "notation")}
            />
          </li>
          <li>
            <label htmlFor="type">Type:</label>
            <select
              value={formData.type}
              name="type"
              id="type"
              onChange={(e) => handleChange(e, "type")}
            >
              <option value="">Choose category</option>
              {categories.map((category) => (
                <option value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </li>
          <button type="submit" className="add__submit">
            Add Algorithm
          </button>
        </ul>
      </form>
    </div>
  );
};

export default ADD;
