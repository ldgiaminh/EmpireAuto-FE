import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const getUserName = () => {
  if (localStorage.getItem("authUser")) {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    return obj
  }
}

const Navbar = props => {
  const [role, setRole] = useState("")

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }

    var userData = getUserName()
    if (userData) {
      setRole(userData.role)
    }
  })

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              {role === "RE" ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/bookings">
                      <i className="bx bx-calendar me-2"></i>
                      {props.t("Đặt lịch")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/order-services">
                      <i className="bx bxs-detail me-2"></i>
                      {props.t("Theo dõi tiến trình")}
                    </Link>
                  </li>
                </ul>
              ) : role === "MA" ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/booking">
                      <i className="bx bx-calendar me-2"></i>
                      {props.t("Đặt lịch")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/order-service">
                      <i className="bx bxs-detail me-2"></i>
                      {props.t("Theo dõi tiến trình")}
                    </Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
