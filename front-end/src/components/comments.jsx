import "../App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
const Comments = () => {
  const [comments, setComments] = useState({
    userID: localStorage.getItem("userID"),
    name: "",
    content: "",
  });

  const [commentsSection, setCommentsSection] = useState([]);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleText = (e) => {
    setComments({ ...comments, [e.target.name]: e.target.value });
    console.log(comments);
  };

  const isLoggedIn = localStorage.getItem("login") === "true";

  const submitComment = (e) => {
    e.preventDefault();

    if (
      (!isLoggedIn && comments.name !== "" && comments.content !== "") ||
      (isLoggedIn && comments.content !== "")
    ) {
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
          if (res.error === true) {
            console.log(res.result);
            setError(res.result);
          } else {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All fields are required");
    }
  };

  useEffect(() => {
    fetch("http://localhost/react-project/back-end/getComments.php")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        if (res.error === true) {
          console.log("there is an error");
        } else {
          setCommentsSection(res.result);
        }
      })
      .catch((err) => {
        setError(err);
        console.log("Error:", err);
      });
  }, []);

  return (
    <div>
      <div className="msg__div">
        {msg !== "" ? (
          <span className="comments__msg">{msg}</span>
        ) : (
          <span className="comments__error">{error}</span>
        )}
      </div>
      <div className="comments__content__div">
        <h1 className="leave__comment">Leave a Comment</h1>
        {isLoggedIn ? (
          <textarea
            className="comments__content"
            name="content"
            id="comments__content"
            cols="150"
            rows="10"
            onChange={handleText}
          ></textarea>
        ) : (
          <>
            <div className="comments__title__div">
              <label htmlFor="comments__title">
                <h3>Your Name </h3>
              </label>
              <textarea
                className="comments__title"
                name="name"
                id="comments__title"
                cols="30"
                rows="3"
                onChange={handleText}
              ></textarea>
            </div>
            <textarea
              className="comments__content"
              name="content"
              id="comments__content"
              cols="150"
              rows="10"
              onChange={handleText}
            ></textarea>
          </>
        )}
        <button onClick={submitComment} className="comment__button">
          Comment
        </button>
      </div>
      <div className="comment__section">
        {commentsSection.map((comment, index) => (
          <div className="user__comment__div" key={index}>
            <p>{comment.commentName ? comment.commentName : comment.name}</p>
            <p>{comment.content}</p>
            <Link to={`/editComment/${comment.id}`}>
              <button>Edit</button>
            </Link>
            <Link to={`/deleteComment/${comment.id}`}>
              <button>Delete</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="filler__div"></div>
    </div>
  );
};

export default Comments;
