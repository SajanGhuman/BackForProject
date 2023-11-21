import "../App.css";
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const EditComment = () => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const { id } = useParams();

  const [formData, setFormData] = useState({
    userID: "",
    id: id,
    commentName: "",
    name: "",
    content: "",
  });

  const navget = useNavigate();

  const handleChange = (e, type) => {
    switch (type) {
      case "name":
        setError("");
        setFormData({ ...formData, commentName: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Name Is Empty");
        }
        break;
      case "content":
        setError("");
        setFormData({ ...formData, content: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Content Is Empty");
        }
        break;
    }
  };

  useEffect(() => {
    if (id !== "") {
      fetch(`http://localhost/react-project/back-end/getComment.php?id=${id}`)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Error occured");
          } else {
            setFormData({
              ...formData,
              commentName: res.result[0].commentName || "",
              content: res.result[0].content || "",
              userID: res.result[0].userID || "",
              name: res.result[0].name || "",
            });
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id !== "") {
      fetch("http://localhost/react-project/back-end/editComment.php", {
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
            setError("Could not update user!!Try again");
          } else {
            setMsg("User updated successfully!! Redirecting...");
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
    <div className="user__div__main">
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
              value={
                formData.commentName !== ""
                  ? formData.commentName
                  : formData.name
              }
              placeholder="Enter Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <li>
            <label htmlFor="content">Comment:</label>
            <input
              type="text"
              name="content"
              id="content"
              value={formData.content}
              placeholder="Enter Comment"
              onChange={(e) => handleChange(e, "content")}
            />
          </li>
          <button type="submit" className="add__submit" disabled={msg !== ""}>
            Update Comment
          </button>
        </ul>
      </form>
    </div>
  );
};

export default EditComment;
