import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Table = () => {
  return (
    <div>
      <section class="table__header">
        <h1>Customer's Orders</h1>
        <div class="input-group">
          <input type="search" placeholder="Search Data..." />
          <img src="images/search.png" alt="" />
        </div>
        <div class="export__file">
          <label
            for="export-file"
            class="export__file-btn"
            title="Export File"
          ></label>
          <input type="checkbox" id="export-file" />
          <div class="export__file-options">
            <label>Export As &nbsp; &#10140;</label>
            <label for="export-file" id="toPDF">
              PDF <img src="images/pdf.png" alt="" />
            </label>
            <label for="export-file" id="toJSON">
              JSON <img src="images/json.png" alt="" />
            </label>
            <label for="export-file" id="toCSV">
              CSV <img src="images/csv.png" alt="" />
            </label>
            <label for="export-file" id="toEXCEL">
              EXCEL <img src="images/excel.png" alt="" />
            </label>
          </div>
        </div>
      </section>
      <section class="table__body">
        <table>
          <thead>
            <tr>
              <th>
                {" "}
                Id <span class="icon-arrow">&UpArrow;</span>
              </th>
              <th>
                {" "}
                Customer <span class="icon-arrow">&UpArrow;</span>
              </th>
              <th>
                {" "}
                Location <span class="icon-arrow">&UpArrow;</span>
              </th>
              <th>
                {" "}
                Order Date <span class="icon-arrow">&UpArrow;</span>
              </th>
              <th>
                {" "}
                Status <span class="icon-arrow">&UpArrow;</span>
              </th>
              <th>
                {" "}
                Amount <span class="icon-arrow">&UpArrow;</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 1 </td>
              <td>
                {" "}
                <img src="images/Zinzu Chan Lee.jpg" alt="" />
                Zinzu Chan Lee
              </td>
              <td> Seoul </td>
              <td> 17 Dec, 2022 </td>
              <td>
                <p class="status delivered">Delivered</p>
              </td>
              <td>
                {" "}
                <strong> $128.90 </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Table;
