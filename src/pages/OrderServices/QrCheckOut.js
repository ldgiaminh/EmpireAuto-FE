import React, { useState } from "react"
import QrReader from "react-qr-reader"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useDispatch } from "react-redux"
import uuid from "uuid"

import { postCheckOut as checkOutOrder } from "store/actions"
import { ref, set } from "firebase/database"
import { db } from "helpers/firebase"

const QrCheckOut = props => {
  const { history } = props
  const dispatch = useDispatch()
  const [qrData, setQRData] = useState("")
  const [showScanner, setShowScanner] = useState(true)
  const [errorStatus, setErrorStatus] = useState(null)
  const obj = JSON.parse(localStorage.getItem("authUser"))

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
          checkOutOrderServices(
            data.car.id,
            data.order.user.id,
            data.car.carLisenceNo,
            data.car.carBrand,
            data.car.carModel,
            code,
            data.id
          )
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

  const checkOutOrderServices = ({
    carId,
    userId,
    plate,
    brand,
    model,
    code,
    orderServiceId,
  }) => {
    const checkOut = {
      inGarage: false,
    }
    console.log(carId, checkOut)
    dispatch(checkOutOrder(carId, checkOut))
    const notificationId = uuid.v4()
    set(ref(db, `users/${userId}/notifications/${notificationId}`), {
      isRead: "false",
      message: "Đã nhận lại phương tiện " + plate + "," + brand + " - " + model,
      time: isoDateTime,
      title: "Hoàn tất sử dụng dịch vụ tại Empire Garage",
      orderServiceId: orderServiceId,
    })
    toastr.success("Check-out thành công hóa đơn " + code, "Thành công")
    history.push(`/order-services/${orderServiceId}`)
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
