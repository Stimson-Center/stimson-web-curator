/*!

=========================================================
* Now UI Dashboard PRO React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// https://demos.creative-tim.com/now-ui-dashboard-pro/examples/components/icons.html
// https://fontawesome.com/v4.7.0/icons/

import Cleanse from "./views/Cleanse/Cleanse";
import Curate from "./views/Curate/Curate";
import UserProfile from "./views/UserProfilePage.jsx";
import LoginPage from "./views/LoginPage.jsx";
import RegisterPage from "./views/RegisterPage.jsx";
// import Dashboard from "./examples/Dashboard/Dashboard.jsx";
// import Buttons from "./examples/Components/Buttons.jsx";
// import GridSystem from "./examples/Components/GridSystem.jsx";
// import Panels from "./examples/Components/Panels.jsx";
// import SweetAlert from "./examples/Components/SweetAlertPage.jsx";
// import Notifications from "./examples/Components/Notifications.jsx";
// import Icons from "./examples/Components/Icons.jsx";
// import Typography from "./examples/Components/Typography.jsx";
// import RegularForms from "./examples/Forms/RegularForms.jsx";
// import ExtendedForms from "./examples/Forms/ExtendedForms.jsx";
// import ValidationForms from "./examples/Forms/ValidationForms.jsx";
// import Wizard from "./examples/Forms/Wizard/Wizard.jsx";
// import RegularTables from "./examples/Tables/RegularTables.jsx";
// import ExtendedTables from "./examples/Tables/ExtendedTables.jsx";
// import ReactTable from "./examples/Tables/ReactTables.jsx";
// import GoogleMaps from "./examples/Maps/GoogleMaps.jsx";
// import FullScreenMap from "./examples/Maps/FullScreenMap.jsx";
// import VectorMap from "examples/Maps/VectorMap.jsx";
// import Charts from "examples/Charts/Charts.jsx";
// import BigCalendar from "examples/Calendar/BigCalendar.jsx";
// import Widgets from "examples/Widgets/Widgets.jsx";
// import TimelinePage from "examples/Pages/TimelinePage.jsx";
// import RTL from "examples/Pages/RTL.jsx";
// import PricingPage from "examples/Pages/PricingPage.jsx";
// import UserPage from "./examples/Pages/UserPage.jsx";
// import LockScreenPage from "./examples/Pages/LockScreenPage.jsx";


let routes = [
  {
    path: "/curate",
    name: "Curate",
    icon: "fa fa-binoculars",
    component: Curate,
    layout: "/admin"
  },
  {
    path: "/cleanse",
    name: "Cleanse",
    icon: "fa fa-bullseye",
    component: Cleanse,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    mini: "UP",
    component: UserProfile,
    layout: "/admin",
    invisible: true
  },
  {
    collapse: true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "now-ui-icons design_image",
    invisible: true,
    views: [
      {
        path: "/register-page",
        name: "Register Page",
        short: "Register",
        mini: "RP",
        component: RegisterPage,
        layout: "/auth"
      },
      {
        path: "/login-page",
        name: "Login Page",
        short: "Login",
        mini: "LP",
        component: LoginPage,
        layout: "/auth"
      }
    ]
  },
];

export default routes;
