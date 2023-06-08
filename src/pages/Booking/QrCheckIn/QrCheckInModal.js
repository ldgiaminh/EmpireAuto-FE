import React, { useEffect, useState } from "react"
import { Modal } from "reactstrap"
import PropTypes from "prop-types"
import QrReader from "react-qr-reader"
import { toast } from "react-toastify"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import { checkinBooking as checkInBooking } from "store/actions"

const QrCheckInModal = props => {
  const { isOpen, toggle, history } = props

  const obj = JSON.parse(localStorage.getItem("authUser"))

  const dispatch = useDispatch()

  const { isAssign } = useSelector(state => ({
    isAssign: state.Layout.isAssign,
  }))

  const handleError = err => {
    console.error(err)
  }

  const handleScan = data => {
    if (data) {
      toggle(false)

      fetch(
        `https://empire-api.azurewebsites.net/api/v1/booking-qrcode/close-generation?qrcode=${encodeURIComponent(
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
            toggle(false)
            toast.error("Không tìm thấy đặt lịch !!")
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(data => {
          goToCheckIn(data.id)
        })
        .catch(error => {
          toggle(false)
          console.log("Error: " + error)
        })
    }
  }

  const goToCheckIn = id => {
    dispatch(checkInBooking(id, isAssign, history))
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Quét mã Check-in</h5>
          <button
            type="button"
            onClick={toggle}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {toggle && (
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

QrCheckInModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  history: PropTypes.any,
}

export default QrCheckInModal
