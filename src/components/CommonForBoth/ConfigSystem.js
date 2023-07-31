import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Alert, Form, Input, Label, Modal } from "reactstrap"

import Select, { components } from "react-select"

import { useDispatch, useSelector } from "react-redux"

import { withRouter } from "react-router-dom"

import {
  getBookingSlot as onGetBookingSlot,
  getCarInGarage as onGetCarInGarage,
  putConfigSystem as onConfigSystem,
} from "store/actions"
import Loader from "components/Loader/Loader"

const ConfigSystem = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE REDUX
  ==================================================
  */

  const { bookingSlot, carInGarage, isLoad } = useSelector(state => ({
    bookingSlot: state.systems.bookingSlot,
    carInGarage: state.systems.carInGarage,
    isLoad: state.systems.isLoad,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */
  const [modal_standard, setmodal_standard] = useState(false)

  const [selectedGroup, setSelectedGroup] = useState(null)

  const [number, setNumber] = useState("")

  const [isFormValid, setIsFormValid] = useState(false)

  /*
  ==================================================
  MODAL
  ==================================================
  */

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  function tog_standard() {
    setmodal_standard(!modal_standard)
    removeBodyCss()
  }

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetBookingSlot())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetCarInGarage())
  }, [dispatch])

  /*
  ==================================================
  SELECTED
  ==================================================
  */

  /* options */

  const garageOptions = [
    { label: "Số lượng bãi đậu", value: "GARAGE_SLOT", current: 0 },
    {
      label: "Xe tại garage",
      value: "CURRENT_CAR_COUNT_IN_GARAGE",
      current: carInGarage && carInGarage.value,
    },
  ]

  const bookingOptions = [
    {
      label: "Số lượng đặt lịch trong tuần",
      value: "BOOKING_SLOT_PER_WEEK",
      current: bookingSlot && bookingSlot.bookingSlot,
    },
    {
      label: "Số đặt lịch hiện tại",
      value: "BOOKING_COUNT_IN_CURRENT_WEEK",
      current: bookingSlot && bookingSlot.currentBooking,
    },
  ]

  const workLoadOptions = [
    {
      label: "Công việc tối đa mỗi ngày",
      value: "MAX_WORKLOAD_PER_DAY",
      current: 0,
    },
    {
      label: "Thời gian cho mỗi công việc (Phút)",
      value: "MINUTES_PER_WORKLOAD",
      current: 0,
    },
  ]

  const optionGroup = [
    {
      label: "Garage",
      options: garageOptions,
    },
    {
      label: "Đặt lịch",
      options: bookingOptions,
    },
    {
      label: "Khối lượng công việc",
      options: workLoadOptions,
    },
  ]

  const Option = props => {
    const { label, current } = props.data
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{label}</span>
          {current !== undefined && (
            <span style={{ color: "gray" }}>Hiện Tại: {current}</span>
          )}
        </div>
      </components.Option>
    )
  }

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  function handleSelectGroup(selected) {
    setSelectedGroup(selected)
    setIsFormValid(false)
  }

  const handleChange = e => {
    const value = e.target.value
    setNumber(value)
    setIsFormValid(false)
  }

  /*
  ==================================================
  SUBMIT
  ==================================================
  */

  const saveConfig = e => {
    e.preventDefault()
    // Check if number is empty
    if (!number || !selectedGroup || !selectedGroup.value) {
      setIsFormValid(true)
      return
    }

    const config = {
      key: selectedGroup.value,
      value: number,
    }
    if (config) {
      dispatch(onConfigSystem(config, props.history))
      setIsFormValid(false)
      tog_standard()
      handleReset()
    }
  }

  /*
  ==================================================
  Reset Form
  ==================================================
  */

  const resetForm = () => {
    setNumber("")
    setSelectedGroup(null)
  }

  const handleReset = () => {
    resetForm()
    setIsFormValid(false)
    tog_standard()
  }

  return (
    <React.Fragment>
      {isLoad && <Loader />}
      <div className="dropdown d-inline-block">
        <button
          onClick={() => {
            tog_standard()
          }}
          type="button"
          className="btn header-item noti-icon right-bar-toggle "
          data-toggle="modal"
          data-target="#myModal"
        >
          <i className="bx bx-cog bx-spin" />
        </button>
      </div>
      <div>
        <Modal
          isOpen={modal_standard}
          toggle={() => {
            tog_standard()
          }}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Cấu hình hệ thống
            </h5>
            <button
              type="button"
              onClick={() => {
                setmodal_standard(false)
              }}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {isFormValid ? (
              <Alert color="danger">Vui lòng điền đầy đủ dữ liệu</Alert>
            ) : null}
            <Form>
              <div className="mb-3">
                <Label htmlFor="formrow-firstname-Input">Loại cấu hình</Label>
                <Select
                  value={selectedGroup}
                  onChange={handleSelectGroup}
                  options={optionGroup}
                  classNamePrefix="select2-selection"
                  placeholder="Chọn cấu hình"
                  required={true}
                  onClick={e => e.preventDefault()}
                  components={{
                    // SingleValue,
                    Option,
                  }}
                  menuPlacement="auto"
                />
              </div>
              <div className="mb-3">
                <Label htmlFor="formrow-firstname-Input">Thông số</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                  placeholder="Nhập số thay đổi"
                  onChange={e => handleChange(e)}
                  value={number}
                />
              </div>
            </Form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveConfig}
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Hủy
            </button>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

ConfigSystem.propTypes = {
  t: PropTypes.any,
  bookingSlot: PropTypes.any,
  carInGarage: PropTypes.any,
}

export default withRouter(ConfigSystem)
