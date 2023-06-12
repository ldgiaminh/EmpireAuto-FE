import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { isEmpty } from "lodash"

import "toastr/build/toastr.min.css"

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"
import Select, { components } from "react-select"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  getExperts as onGetExpert,
  putAssignExperts as assignExpert,
  checkOutService as checkOutService,
  getStatusLog as onGetStatusLog,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import Cart from "./cart"
import CarRecord from "./health-car-record"
import PreloadDetail from "components/Loader/PreloadDetail"
import Stepper from "./stepper"
import ConfirmReassign from "../confirm-reassign"

const OrderServiceDetail = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Garage"

  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { orderServicesDetail, users, isLoading, orderServiceLogs, isShow } =
    useSelector(state => ({
      orderServicesDetail: state.orderServices.orderServicesDetail,
      users: state.userLists.users,
      isLoading: state.orderServices.isLoading,
      orderServiceLogs: state.orderServices.orderServiceLogs,
      isShow: state.Layout.isShow,
    }))

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetOrderServiceDetail(params.id, props.history))
    }
  }, [params, dispatch])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetOrderServiceDetail(params.id, props.history))
      dispatch(onGetStatusLog(params.id))
    }
  }, [isShow])

  useEffect(() => {
    dispatch(onGetExpert())
  }, [dispatch])

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetStatusLog(params.id))
    }
  }, [isShow, dispatch])

  /*
  ==================================================
  FORMAT PHONE NUMBER
  ==================================================
  */

  function formatPhoneNumber(phone) {
    return `(+${phone.slice(1, 3)}) ${phone.slice(3)}`
  }

  /*
  ==================================================
  FORMAT DATE & TIME
  ==================================================
  */

  const formattedDateTime = date => {
    const createDate = new Date(date)
    const formattedDate = createDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const formattedTime = createDate.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const formatted = `${formattedDate} - ${formattedTime}`
    return formatted
  }

  /*
  ==================================================
  RE-ASSIGN TO EXPERTS
  ==================================================
  */

  const [selectedGroup, setSelectedGroup] = useState(null)

  const [isAssign, setIsAssign] = useState(false)

  const [isOpenEx, setIsOpenEx] = useState(false)

  const toggleEx = () => {
    setIsOpenEx(!isOpenEx)
    setIsAssign(false)
  }

  const handleReAssign = () => {
    setIsAssign(!isAssign)
    setSelectedGroup(null)
  }

  function handleSelectGroup(selected) {
    setSelectedGroup(selected)
  }

  const optionGroup = [
    {
      label: "Còn trống",
      options: [],
    },
    {
      label: "Đã đầy",
      options: [],
    },
  ]

  optionGroup[0].options = users
    .filter(ex => !ex.isMaxWorkloadPerDay)
    .sort((a, b) => a.workloadTotal - b.workloadTotal)
    .map(ex => ({
      label: ex.fullname,
      value: ex.id,
      name: ex.fullname,
      workLoad: ex.workloadTotal,
      isMax: ex.isMaxWorkloadPerDay,
    }))

  optionGroup[1].options = users
    .filter(ex => ex.isMaxWorkloadPerDay)
    .map(ex => ({
      label: ex.fullname,
      value: ex.id,
      name: ex.fullname,
      workLoad: ex.workloadTotal,
      isMax: ex.isMaxWorkloadPerDay,
    }))

  // Check if orderServicesDetail.expert.fullname exists in optionGroup
  const expertFullName = orderServicesDetail.expert
    ? orderServicesDetail.expert.fullname
    : ""
  const isExpertInOptions = optionGroup.some(group => {
    return group.options.some(option => option.label.includes(expertFullName))
  })

  // Remove expertFullName from optionGroup if it exists
  if (isExpertInOptions) {
    optionGroup.forEach(group => {
      group.options = group.options.filter(
        option => !option.label.includes(expertFullName)
      )
    })
  }

  const SingleValue = props => {
    const { name, workLoad, isMax } = props.getValue()[0]

    return (
      <components.SingleValue {...props}>
        <span>{name}</span>{" "}
        {isMax == true ? (
          <span style={{ color: "darkgray" }}>MAX</span>
        ) : (
          <span style={{ color: "darkgray" }}>{workLoad}</span>
        )}
      </components.SingleValue>
    )
  }

  const Option = props => {
    const { name, workLoad, isMax } = props.data
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{name}</span>{" "}
          {isMax == true ? (
            <span style={{ color: "darkgray" }}>MAX</span>
          ) : (
            <span style={{ color: "darkgray" }}>{workLoad}</span>
          )}
        </div>
      </components.Option>
    )
  }

  // const handleAssignExpert = () => {
  //   const id = params.id
  //   const exId = selectedGroup.value
  //   if ((id, exId)) {
  //     dispatch(assignExpert(id, exId))
  //     setIsAssign(false)
  //     setSelectedGroup(null)
  //   }
  // }

  /*
  ==================================================
  SCAN QR-CODE TO CHECK-OUT
  ==================================================
  */

  const handleCheckOut = () => {
    const id = params.id
    if (id) {
      dispatch(
        checkOutService(id, orderServicesDetail.car.carLisenceNo, props.history)
      )
    }
  }

  /* ========================================== RENDER ==============================================*/
  return (
    <>
      {isLoading && <PreloadDetail />}
      <div className="page-content">
        <Container fluid={true}>
          {!isLoading && !isEmpty(orderServicesDetail) && (
            <React.Fragment>
              <ConfirmReassign
                isOpen={isOpenEx}
                toggle={toggleEx}
                expert={selectedGroup}
                order={orderServicesDetail}
              />
              <Breadcrumbs
                title="Dịch vụ"
                breadcrumbItem={
                  "Theo dõi tiến trình" +
                  " - " +
                  ("#" + orderServicesDetail.code)
                }
              />
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Stepper logs={orderServiceLogs} />

                      <div className="mt-5 d-flex justify-content-between">
                        <div>
                          <CardTitle>THÔNG TIN TỔNG</CardTitle>
                          <CardSubtitle className="mb-3">
                            Chi tiết về đơn hàng và thông tin khách hàng
                          </CardSubtitle>
                        </div>

                        {/* {orderServicesDetail.status === 4 ? (
                          <div className="ml-auto">
                            <Button
                              type="button"
                              color="primary"
                              onClick={handleCheckOutQr}
                            >
                              <i className="mdi mdi-qrcode-scan me-1" />
                              Quét mã nhận xe
                            </Button>
                          </div>
                        ) : (
                          " "
                        )} */}
                      </div>
                      <Row>
                        <Col xl="6">
                          <Table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Tên khách:
                                </th>
                                <td>
                                  {orderServicesDetail.order.user.fullname}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Số điện thoại :
                                </th>
                                <td>
                                  {orderServicesDetail.order.user.phone === null
                                    ? ""
                                    : formatPhoneNumber(
                                        orderServicesDetail.order.user.phone
                                      )}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  E-mail :
                                </th>
                                <td>{orderServicesDetail.order.user.email}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Biển số xe:
                                </th>
                                <td>{orderServicesDetail.car.carLisenceNo}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Thương hiệu xe:
                                </th>
                                <td>{orderServicesDetail.car.carBrand}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Dòng xe:
                                </th>
                                <td>{orderServicesDetail.car.carModel}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col xl="6">
                          <div>
                            <Table className="table table-borderless mb-5">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Hóa đơn tạo lúc :
                                  </th>
                                  <td>
                                    {formattedDateTime(
                                      orderServicesDetail.order.createdAt
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Số tiền từ đặt lịch :
                                  </th>
                                  <td>
                                    {orderServicesDetail.prepaidFromBooking.toLocaleString()}
                                    ₫
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tình trạng khách mô tả :
                                  </th>
                                  <td>{orderServicesDetail.receivingStatus}</td>
                                </tr>
                                {orderServicesDetail.considerProblems.length ===
                                0 ? (
                                  ""
                                ) : (
                                  <tr>
                                    <th
                                      scope="row"
                                      style={{ width: "300px" }}
                                      className={"text-capitalize"}
                                    >
                                      Vấn đề tái sửa chữa :
                                    </th>
                                    <td>
                                      {orderServicesDetail.considerProblems
                                        .map(consider => consider.name)
                                        .join(", ")}
                                    </td>
                                  </tr>
                                )}
                                <tr>
                                  <th
                                    scope="row"
                                    style={{
                                      width: "300px",
                                      verticalAlign: "middle",
                                    }}
                                    className={"text-capitalize"}
                                  >
                                    Kỹ thuật viên chính :
                                  </th>
                                  <td>
                                    {orderServicesDetail.expert !== null ? (
                                      orderServicesDetail.status === 1 ? (
                                        isAssign ? (
                                          <>
                                            <Select
                                              value={selectedGroup}
                                              onChange={handleSelectGroup}
                                              options={optionGroup}
                                              classNamePrefix="select2-selection"
                                              placeholder="Chọn kỹ thuật viên"
                                              required={true}
                                              onClick={e => e.preventDefault()}
                                              components={{
                                                SingleValue,
                                                Option,
                                              }}
                                              // menuPlacement="top"
                                            />
                                            <Button
                                              onClick={toggleEx}
                                              type="button"
                                              color="primary"
                                              className="w-md mt-2 me-2"
                                              disabled={!selectedGroup}
                                            >
                                              Chỉ định
                                            </Button>
                                            <Button
                                              onClick={handleReAssign}
                                              type="button"
                                              color="light"
                                              className="w-md mt-2"
                                            >
                                              Hủy
                                            </Button>
                                          </>
                                        ) : (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "baseline",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {
                                              orderServicesDetail.expert
                                                .fullname
                                            }

                                            <button
                                              type="button"
                                              className="btn btn-light btn-label"
                                              onClick={handleReAssign}
                                            >
                                              <i className="mdi mdi-pencil label-icon "></i>{" "}
                                              Chỉ định
                                            </button>
                                          </div>
                                        )
                                      ) : (
                                        <>
                                          {orderServicesDetail.expert.fullname}
                                        </>
                                      )
                                    ) : (
                                      <>
                                        <Select
                                          value={selectedGroup}
                                          onChange={handleSelectGroup}
                                          options={optionGroup}
                                          classNamePrefix="select2-selection"
                                          placeholder="Chọn kỹ thuật viên"
                                          required={true}
                                          //onClick={e => e.preventDefault()}
                                        />
                                        <Button
                                          onClick={handleAssignExpert}
                                          type="button"
                                          color="primary"
                                          className="w-md mt-2"
                                          disabled={!selectedGroup}
                                        >
                                          Phân công
                                        </Button>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>

                    {orderServicesDetail.healthCarRecord != null ? (
                      <CarRecord record={orderServicesDetail.healthCarRecord} />
                    ) : (
                      ""
                    )}
                  </Card>
                </Col>
              </Row>

              {orderServicesDetail.orderServiceDetails.length > 0 ? (
                <Cart
                  services={orderServicesDetail.orderServiceDetails}
                  details={orderServicesDetail}
                />
              ) : (
                ""
              )}
              <Row className="mt-2 mb-5">
                <Col sm="6">
                  <Link
                    to="/order-services"
                    className="btn text-muted d-none d-sm-inline-block btn-link"
                  >
                    <i className="mdi mdi-arrow-left me-1" /> Trở về trang danh
                    sách{" "}
                  </Link>
                </Col>
                {orderServicesDetail.status === 4 ? (
                  <Col sm="6">
                    <div className="text-sm-end">
                      <Button
                        type="button"
                        color="success"
                        className="btn btn-label w-md"
                        onClick={handleCheckOut}
                      >
                        <i className="bx bx-check-double label-icon"></i>
                        Check-Out
                      </Button>
                    </div>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </React.Fragment>
          )}
        </Container>
      </div>
    </>
  )
}

OrderServiceDetail.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(OrderServiceDetail)
