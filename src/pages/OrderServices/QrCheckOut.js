import React, { useState } from "react"
import QrReader from "react-qr-reader"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useDispatch } from "react-redux"
import uuid from "uuid"

import { postCheckOut as checkOutOrder } from "store/actions"
import { ref, set } from "firebase/database"
import { db } from "helpers/firebase"
import { useSelector } from "react-redux"

const QrCheckOut = props => {
  const { history } = props
  const dispatch = useDispatch()
  const [qrData, setQRData] = useState("")
  const [showScanner, setShowScanner] = useState(true)
  const [bookingId, setBookingId] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)
  const obj = JSON.parse(localStorage.getItem("authUser"))

  const { isAssign } = useSelector(state => ({
    //  isPreloader: state.Layout.isPreloader,
    isAssign: state.Layout.isAssign,
  }))

  const handleScan = data => {
    if (data) {
      setShowScanner(false)
      setQRData(data)
      fetch(
        `https://dev-empire-api.azurewebsites.net/api/v1/order-services/close-checkout-qrcode-generation?qrCode=${encodeURIComponent(
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
          //   console.log(data)
          checkOutOrderServices(data.orderServiceId)
        })
        .catch(error => {
          console.error("Error:", error)
        })
      //   console.log(data)
    }
  }
  const handleError = err => {
    console.error(err)
  }
  const toggleScanner = () => {
    setShowScanner(!showScanner)
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

  const checkOutOrderServices = id => {
    const checkOut = {
      orderServiceId: id,
      orderServiceStatusId: 5,
    }
    dispatch(checkOutOrder(checkOut))
    // const notificationId = uuid.v4()
    // set(ref(db, `users/${userId}/notifications/${notificationId}`), {
    //   isRead: "false",
    //   message: "Đã nhận phương tiện " + code,
    //   time: isoDateTime,
    //   title: "Hoàn tất dịch vụ tại Empire Garage",
    // })
    toastr.success("Check-in thành công", "Thành công")
    history.push(`/order-service-detail/${id}`)
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

export default QrCheckOut
