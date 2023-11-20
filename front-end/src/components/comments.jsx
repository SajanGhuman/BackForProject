import "../App.css";
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState({
    userID: localStorage.getItem("userID"),
    title: "",
    content: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleText = (e) => {
    setComments({ ...comments, [e.target.name]: e.target.value });
    console.log(comments);
  };

  const submitComment = (e) => {
    e.preventDefault();

    if ((comments.title !== "", comments.content !== "")) {
      fetch("http://localhost/react-project/back-end/comments.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comments),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError(res.result);
          } else {
            setMsg("Adding comment...");
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
    <div>
      <div className="msg__div">
        {msg !== "" ? (
          <span className="comments__msg">{msg}</span>
        ) : (
          <span className="commetns__error">{error}</span>
        )}
      </div>
      <h1>Comments: </h1>
      <div className="comments__title__div">
        <label htmlFor="comments__title">
          <h3>Add Title: </h3>
        </label>
        <textarea
          className="comments__title"
          name="title"
          id="comments__title"
          cols="150"
          rows="5"
          onChange={handleText}
        ></textarea>
      </div>

      <div className="comments__content__div">
        <label htmlFor="comments__content">
          <h3>Add Comment: </h3>
        </label>
        <textarea
          className="comments__content"
          name="content"
          id="comments__content"
          cols="150"
          rows="10"
          onChange={handleText}
        ></textarea>
      </div>
      <button onClick={submitComment} className="comment__button">
        Comment
      </button>
      <div className="filler__div" ></div>
    </div>
  );
};

export default Comments;
