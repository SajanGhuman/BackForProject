import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    categoryName: "",
  });

  const handleChange = (e, type) => {
    setError("");
    switch (type) {
      case "id":
        setError("");
        setFormData({ ...formData, id: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Category ID Is Empty");
        }
        break;
      case "name":
        setError("");
        setFormData({ ...formData, categoryName: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Category Name Is Empty");
        }
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.categoryName !== "" && formData.id) {
      fetch("http://localhost/react-project/back-end/addCategory.php", {
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
            setMsg("Category Added successfully!! Redirecting...");
            setTimeout(() => {
              navget("/");
            }, 3000);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required");
    }
  };

  return (
    <div className="add__category__div">
      <div className="msg__div">
        {msg !== "" ? (
          <span className="add__category__msg">{msg}</span>
        ) : (
          <span className="add__category__error">{error}</span>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul className="add__ul">
          <li>
            <label htmlFor="id">Category ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              placeholder="Enter Category ID"
              onChange={(e) => handleChange(e, "id")}
            />
          </li>
          <li>
            <label htmlFor="categoryName">Category Name:</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              placeholder="Enter Category Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <button type="submit" className="add__submit" disabled={msg !== ""}>
            Add Category
          </button>
        </ul>
      </form>
    </div>
  );
};

export default AddCategory;
