import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost/react-project/back-end/users.php")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.error === true) {
          setError(data.result);
        } else {
          setUsers(data.result);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  return (
    <div className="users__div">
      <table className="users__table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Access Level</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((item) => (
              <tr key={item.userID}>
                <td>{item.userID}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.access}</td>
                <td>
                  <Link to={`/editUsers/${item.userID}`}>
                    <button>Edit</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/deleteUsers/${item.userID}`}>
                    <button>Delete</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
