import React, { useState } from "react"
import QrReader from "react-qr-reader"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useDispatch } from "react-redux"
import uuid from "uuid"

import { checkinBooking as checkInBooking } from "store/actions"
import { ref, set } from "firebase/database"
import { db } from "helpers/firebase"
import { useSelector } from "react-redux"

const QrScanner = props => {
  const { history } = props
  const dispatch = useDispatch()
  const [qrData, setQRData] = useState("")
  const [showScanner, setShowScanner] = useState(true)
  const [errorStatus, setErrorStatus] = useState(null)
  const obj = JSON.parse(localStorage.getItem("authUser"))

  const { isAssign } = useSelector(state => ({
    isAssign: state.Layout.isAssign,
  }))

  const handleScan = data => {
    if (data) {
      setShowScanner(false)
      setQRData(data)

      fetch(
        `https://dev-empire-api.azurewebsites.net/api/v1/booking-qrcode/close-generation?qrcode=${encodeURIComponent(
          data
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obj.accessToken,
          },
        }
      )
        .then(response => {
          if (!response.ok) {
            setErrorStatus(response.status)
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(data => {
          goToCheckin(data.id, data.code, data.user.id)
        })
        .catch(error => {
          console.error("Error:", error)
        })
    }
  }
  const handleError = err => {
    console.error(err)
  }

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  }

  const now = new Date()
  const timeZoneOffset = 7 // Vietnam is GMT+7

  const vietnamDate = new Date(now.getTime() + timeZoneOffset * 60 * 60 * 1000)
  const isoDateTime = vietnamDate.toISOString()

  const goToCheckin = (id, code, userId) => {
    dispatch(checkInBooking(id, isAssign))
    // const notificationId = uuid.v4()
    // set(ref(db, `users/${userId}/notifications/${notificationId}`), {
    //   isRead: "false",
    //   message: "Bạn đã check-in thành công #" + code,
    //   time: isoDateTime,
    //   title: "Check-in thành công",
    //   bookingId: id,
    // })
    //toastr.success("Check-in thành công", "Thành công")
    history.push(`/bookings/${id}`)
  }

  return (
    <div>
      <h1>Scanner page</h1>
      {showScanner && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {qrData && <p>{qrData}</p>}
      {errorStatus && <p>{errorStatus}</p>}
    </div>
  )
}

export default QrScanner
