/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Notifications from "views/Notifications";
import Doctorl from "views/Doctorl";
import Tables from "views/Tables";
import Map from "views/Map";
import User from "views/User";
import Icons from "views/Icons";
import Login from "views/Login";
import Timeslot from "views/timeslot";
import Timeslotl from "views/Time";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/doctor" element={<Notifications />} />
      <Route path="/xyz" element={<Doctorl />} />
      <Route path="/abc" element={<Tables/>} />
      <Route path="/test" element={<Map />} />
      <Route path="/package-list" element={<User />} />
      <Route path="/packages" element={<Icons />} />
      <Route path="/login" element={<Login />} />
      <Route path="/timeslot" element={<Timeslot/>}/>
      <Route path="/timeslot-list" element={<Timeslotl/>}/>
      {/* <Route path="/" element={<Navigate to="/admin/dashboard" replace />} /> */}
    </Routes>
  </BrowserRouter>
);
