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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
import Tables from "views/Tables.js";
import UserPage from "views/User.js";
import DoctorList from "./views/Doctorl";
import Booking from "./views/Booking";
import Report from "./views/Report";
import Feedback from "./views/Feedback";
import Login from "views/Login";
import Timeslot from "views/timeslot";
import Timeslotl from "views/Time";
// import UpgradeToPro from "views/Upgrade.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  // {
  //   path: "/packages",
  //   name: "Add Packages",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/test",
  //   name: "Add Test",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Map />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/doctor",
  //   name: "Add Doctor",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/package-list",
    name: "Packages",
    // icon: "nc-icon nc-single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/abc",
    name: "Tests",
    // icon: "nc-icon nc-tile-56",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/xyz",
    name: "Doctors",
    // icon: "nc-icon nc-caps-small",
    component: <DoctorList />,
    layout: "/admin",
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
  {
    path: "/bookings",
    name: "Bookings",
    // icon: "nc-icon nc-caps-small",
    component: <Booking />,
    layout: "/admin",
  },
  // {
  //   path: "/report",
  //   name: "Test Report",
  //   // icon: "nc-icon nc-caps-small",
  //   component: <Report />,
  //   layout: "/admin",
  // },
  {
    path: "/feedback",
    name: "Feedbacks",
    // icon: "nc-icon nc-caps-small",
    component: <Feedback />,
    layout: "/admin",
  },
  {
    path: "/timeslot-list",
    name: "Timeslot",
    // icon: "nc-icon nc-caps-small",
    component: <Timeslotl />,
    layout: "/admin",
  },
];

export const newPageRoute = {
  path: "/doctor", // Specify the path for the new page
  component: <Notifications />, 
  layout: "/admin",// Specify the component for the new page
};
export const newPageRoutes = {
  path: "/packages", // Specify the path for the new page
  component: <Icons />, 
  layout: "/admin",// Specify the component for the new page
};
export const newPageRoutess = {
  path: "/login", // Specify the path for the new page
  component: <Login />, 
  layout: "/admin",// Specify the component for the new page
};
export const newPageRoutesss = {
  path: "/timeslot", // Specify the path for the new page
  component: <Timeslot />, 
  layout: "/admin",// Specify the component for the new page
};
export const newPageRoutessss = {
  path: "/report", // Specify the path for the new page
  component: <Report />, 
  layout: "/admin",// Specify the component for the new page
};



export default routes;
