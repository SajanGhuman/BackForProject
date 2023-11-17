import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Content = (/* props */) => {
  const navget = useNavigate();
  const [data, setData] = useState([]);
  const [type, setType] = useState({
    type: "",
  });
  const [algID, setID] = useState({
    algID: null,
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [sort, setSort] = useState({
    name: "",
    date: "",
    modified: "",
  });

  const handleOptionsChange = (e) => {
    console.log(e.target.value);
    setType({ ...type, type: e.target.value });
  };

  // useEffect(() => {
  //   props.handleShow(algID);
  // }, [algID]);

  const handleClick = (kid) => {
    setID({ ...algID, algID: kid });
  };

  const handleSort = (e) => {
    setSort({ ...sort, [e.target.name]: e.target.value });
    console.log(sort);
  };

  useEffect(() => {
    fetch("http://localhost/react-project/back-end/sort.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sort),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.row);
        console.log(data.row);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [sort]);

  useEffect(() => {
    fetch("http://localhost/react-project/back-end/algorithms.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(type),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error === true) {
          setError("Fetch Error - Please Try Again");
        } else {
          setData(data.row);
          console.log(data.row);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [type]);

  return (
    <div>
      {localStorage.getItem("login") === "true" && (
        <div>
          <select
            value={type.type}
            onChange={handleOptionsChange}
            className="type__options"
          >
            <option value="">All</option>
            <option value="f2l">F2L</option>
            <option value="oll">OLL</option>
            <option value="pll">PLL</option>
          </select>

          <div className="sort__div">
            <select
              name="name"
              id="sort"
              value={sort.name}
              onChange={handleSort}
            >
              <option value="">Sort By Name</option>
              <option value="a-z">A-Z(By Name)</option>
              <option value="z-a">Z-A(By Name)</option>
            </select>

            <select
              value={sort.date}
              name="date"
              id="sort"
              onChange={handleSort}
            >
              <option value="">Sort By Date</option>
              <option value="newest">Newest(By Date)</option>
              <option value="oldest">Oldest(By Date)</option>
            </select>

            <select
              value={sort.modified}
              name="modified"
              id="sort"
              onChange={handleSort}
            >
              <option value="">Sort By Date Modified</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <button className="sort__remove__button">Clear Filters</button>
          </div>
        </div>
      )}
      <div className="content__div">
        {localStorage.getItem("login") === "true" ? (
          <div>
            <table
              className={
                type.type === "oll"
                  ? "oll__table"
                  : type.type === "pll"
                  ? "pll__table"
                  : type.type === "f2l"
                  ? "f2l__table"
                  : "alg__table"
              }
            >
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
                      <td>
                        <Link to={`/edit/${item.algID}`}>
                          <button
                            onClick={() => {
                              handleClick(item.algID);
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/delete/${item.algID}`}>
                          <button>Delete</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table
            className={
              type.type === "oll"
                ? "oll__table"
                : type.type === "pll"
                ? "pll__table"
                : type.type === "f2l"
                ? "f2l__table"
                : "alg__table"
            }
          >
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
        )}
      </div>
    </div>
  );
};

export default Content;
