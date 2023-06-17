import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Booking
import Booking from "../pages/Booking/index"
import BookingDetails from "../pages/Booking/Details/BookingDetails"
import QrScanner from "pages/Booking/QrScanner"

//Order Service
import OrderService from "../pages/OrderServices/index"
import OrderServiceDetail from "pages/OrderServices/Details/OrderServiceDetail"

//Transaction
import Transaction from "../pages/Transaction/index"

//User
import UserLists from "../pages/User/index"

//Car brand
import CarBrand from "../pages/CarBrand/index"

//Car model
import CarModel from "../pages/Model/index"

//Car problem
import CarProblem from "../pages/Problem/index"

//Car item
import CarItem from "../pages/Item/index"

//Symptom
import SymptomLists from "../pages/Symptom/index"

//Group Service
import GroupService from "../pages/GroupService/index"
import QrCheckOut from "pages/OrderServices/QrCheckOut"

//Error Page
import Pages404 from "pages/Authentication/pages-404"
import Pages500 from "pages/Authentication/pages-500"
import Pages403 from "pages/Authentication/pages-403"

//Manager
import AddNewItems from "pages/Item/AddNewItems"
import CreateNew from "pages/Action/Create"

//Config
import ConfigGarage from "pages/Config/ConfigGarage"

//History
import OrderServiceHistory from "pages/History/OrderServices"
import BookingHistory from "pages/History/Booking"

//Config Garage

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //booking
  { path: "/bookings", component: Booking },
  { path: "/bookings/:id", component: BookingDetails },

  //order service
  { path: "/order-services", component: OrderService },
  { path: "/order-services/:id", component: OrderServiceDetail },

  //transaction
  { path: "/transactions", component: Transaction },

  //symptom
  { path: "/symptoms", component: SymptomLists },

  //group-service
  //{ path: "/service-list", component: GroupService },

  //user
  { path: "/users", component: UserLists },

  //Vehicle
  { path: "/brands", component: CarBrand },
  { path: "/brands/:id/:slug", component: CarModel },
  {
    path: "/brands/:id/:slug/models/:id/:slug/problems",
    component: CarProblem,
  },
  {
    path: "/brands/:id/:slug/models/:id/:slug/problems/:id/:slug/items",
    component: CarItem,
  },

  //Items
  { path: "/add-new-items", component: AddNewItems },

  // //profile
  { path: "/profile", component: UserProfile },

  //Create
  { path: "/create-new", component: CreateNew },

  //History
  { path: "/history/bookings", component: BookingHistory },
  { path: "/history/order-services", component: OrderServiceHistory },

  //Config
  { path: "/config", component: ConfigGarage },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "*", component: () => <Redirect to="/pages-404" /> },
]

// const recepProtectedRoutes = []

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-403", component: Pages403 },
  { path: "/pages-500", component: Pages500 },
  { path: "/scanner", component: QrScanner },
  { path: "/scanner-checkout", component: QrCheckOut },
]

export { publicRoutes, authProtectedRoutes }
