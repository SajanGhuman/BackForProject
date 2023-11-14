import "../App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Content = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState({
    type: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  {
    useEffect(() => {
      fetch("http://localhost/react-project/back-end/algorithmsSort.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(type),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data.row);
          if (data.error === true) {
            setError("Fetch Error - Please Try Again");
          } else {
            setData(data.row);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }, [type]);
  }

  return (
    <div>
      <div className="content__div">
        {localStorage.getItem("login") === "false" ? (
          <div>
            <table className="alg__table" >
              <thead>
                <tr>
                  <th>AlgID</th>
                  <th>Name</th>
                  <th>Notation</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item) => (
                    <tr key={item.algID}>
                      <td>{item.algID}</td>
                      <td>{item.name}</td>
                      <td>{item.notation}</td>
                      <td>{item.type}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>logged in</h1>
        )}
      </div>
    </div>
  );
};

export default Content;
