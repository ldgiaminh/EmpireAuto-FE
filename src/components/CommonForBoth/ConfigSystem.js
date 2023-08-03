import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Alert,
  Form,
  Input,
  Label,
  Modal,
  UncontrolledTooltip,
} from "reactstrap"

import Select, { components } from "react-select"

import { useDispatch, useSelector } from "react-redux"

import { withRouter } from "react-router-dom"

import {
  putConfigSystem as onConfigSystem,
  getConfigSystem as onGetConfigSystem,
} from "store/actions"
import Loader from "components/Loader/Loader"

const ConfigSystem = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE REDUX
  ==================================================
  */

  const { isLoad, configSystems, isShow } = useSelector(state => ({
    isLoad: state.systems.isLoad,
    isShow: state.Layout.isShow,
    configSystems: state.systems.configSystems,
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
    dispatch(onGetConfigSystem())
  }, [dispatch, isShow])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetConfigSystem())
    }
  }, [dispatch, isShow])

  useEffect(() => {
    if (isLoad) {
      dispatch(onGetConfigSystem())
    }
  }, [dispatch, isLoad])

  /*
  ==================================================
  Get Config Value
  ==================================================
  */

  const getConfigValue = (configSystems, key) => {
    const config = configSystems.find(config => config.key === key)
    return config ? config.value : "N/A"
  }

  /*
  ==================================================
  SELECTED
  ==================================================
  */

  /* options */

  const garageOptions = [
    {
      label: "Số lượng bãi đậu",
      value: "GARAGE_SLOT",
      current: getConfigValue(configSystems, "GARAGE_SLOT"),
    },
    {
      label: "Xe tại garage",
      value: "CURRENT_CAR_COUNT_IN_GARAGE",
      current: getConfigValue(configSystems, "CURRENT_CAR_COUNT_IN_GARAGE"),
    },
  ]

  const bookingOptions = [
    {
      label: "Số lượng đặt lịch trong tuần",
      value: "BOOKING_SLOT_PER_WEEK",
      current: getConfigValue(configSystems, "BOOKING_SLOT_PER_WEEK"),
    },
    {
      label: "Số đặt lịch hiện tại",
      value: "BOOKING_COUNT_IN_CURRENT_WEEK",
      current: getConfigValue(configSystems, "BOOKING_COUNT_IN_CURRENT_WEEK"),
    },
    {
      label: "Đặt lịch tối đa trong ngày",
      value: "BOOKING_SLOT_PER_DAY",
      current: getConfigValue(configSystems, "BOOKING_SLOT_PER_DAY"),
    },
  ]

  const workLoadOptions = [
    {
      label: "Công việc tối đa mỗi ngày",
      value: "MAX_WORKLOAD_PER_DAY",
      current: getConfigValue(configSystems, "MAX_WORKLOAD_PER_DAY"),
    },
    {
      label: "Thời gian cho mỗi công việc (Phút)",
      value: "MINUTES_PER_WORKLOAD",
      current: getConfigValue(configSystems, "MINUTES_PER_WORKLOAD"),
    },
  ]

  const optionGroup = [
    {
      label: "Garage",
      options: garageOptions,
      isFirstGroup: true,
    },
    {
      label: "Đặt lịch",
      options: bookingOptions,
      isFirstGroup: false,
    },
    {
      label: "Khối lượng công việc",
      options: workLoadOptions,
      isFirstGroup: false,
    },
  ]

  const Option = props => {
    const { label, current } = props.data
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{label}</span>
          {current !== undefined && (
            <span style={{ color: "gray" }}>{current}</span>
          )}
        </div>
      </components.Option>
    )
  }

  const GroupHeading = props => {
    const { label, title = "Hiện tại", isFirstGroup } = props.data

    if (!isFirstGroup) {
      // Return a simple div instead of the GroupHeading component
      return (
        <components.GroupHeading {...props}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{label}</span>
          </div>
        </components.GroupHeading>
      )
    }

    return (
      <components.GroupHeading {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{label}</span>
          <span>{title}</span>
        </div>
      </components.GroupHeading>
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
          data-target="config"
          id="config"
        >
          <i className="bx bx-cog bx-spin" />
          <UncontrolledTooltip placement="auto" target="config">
            Cấu hình
          </UncontrolledTooltip>
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
                    GroupHeading,
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
