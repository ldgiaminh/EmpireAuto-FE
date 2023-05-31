import React, { useState } from "react"
import logo from "../../assets/images/Empire-Logo.png"
import BeatLoader from "react-spinners/BeatLoader"

export default function Loader() {
  return (
    <>
      <div id="preloader">
        {/* <CardImg className="img-fluid" src={logo} alt="Empire" /> */}
        <div className="logo-login">
          <img src={logo} alt="" className="mx-auto d-block logo-load" />
        </div>

        <div id="status">
          <BeatLoader color="#2c53d2" size={10} />
        </div>
      </div>
    </>
  )
}
