import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { isEmpty, map } from "lodash"
import toastr from "toastr"
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
import Select from "react-select"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  getExperts as onGetExpert,
  putAssignExperts as assignExpert,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import Cart from "./cart"
import CarRecord from "./health-car-record"
import Loading from "components/Loader/Loading"
import PreloadDetail from "components/Loader/PreloadDetail"

const OrderServiceDetail = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  const [isAssign, setIsAssign] = useState(false)

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { orderServicesDetail, users, isLoading } = useSelector(state => ({
    orderServicesDetail: state.orderServices.orderServicesDetail,
    users: state.userLists.users,
    isLoading: state.orderServices.isLoading,
    orderServiceLog: state.orderServices.orderServiceLog,
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
      dispatch(onGetOrderServiceDetail(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    dispatch(onGetExpert())
  }, [dispatch])

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
  ASSIGN TO EXPERTS
  ==================================================
  */

  const [selectedGroup, setSelectedGroup] = useState(null)

  const handleReAssign = () => {
    setIsAssign(!isAssign)
    setSelectedGroup(null)
  }

  function handleSelectGroup(selected) {
    setSelectedGroup(selected)
  }

  const optionGroup = users.map(ex => ({
    label: ex.fullname,
    value: ex.id,
  }))

  // toastr.options = {
  //   closeButton: false,
  //   debug: false,
  //   newestOnTop: true,
  //   progressBar: false,
  //   positionClass: "toast-top-right",
  //   preventDuplicates: false,
  //   onclick: null,
  //   showDuration: "300",
  //   hideDuration: "1000",
  //   timeOut: "5000",
  //   extendedTimeOut: "1000",
  //   showEasing: "swing",
  //   hideEasing: "linear",
  //   showMethod: "fadeIn",
  //   hideMethod: "fadeOut",
  // }

  const handleUpdateState = id => {
    dispatch(onGetOrderServiceDetail(id))
  }

  const handleAssignExpert = () => {
    const id = params.id
    const exId = selectedGroup.value
    if ((id, exId)) {
      dispatch(assignExpert(id, exId))
      handleUpdateState(id)
      setIsAssign(false)
      setSelectedGroup(null)
    }
    dispatch(onGetOrderServiceDetail(id))
  }

  /*
  ==================================================
  SCAN QR-CODE TO CHECK-OUT
  ==================================================
  */

  const handleCheckOutClick = () => {
    history.push("/scanner-checkout")
  }

  /* ========================================== RENDER ==============================================*/
  return (
    <>
      {isLoading && <PreloadDetail />}
      <div className="page-content">
        <Container fluid={true}>
          {!isLoading && !isEmpty(orderServicesDetail) && (
            <React.Fragment>
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
                      <div className="d-flex justify-content-between">
                        <div>
                          <CardTitle>THÔNG TIN TỔNG</CardTitle>
                          <CardSubtitle className="mb-3">
                            Chi tiết về đơn hàng và thông tin khách hàng
                          </CardSubtitle>
                        </div>

                        {orderServicesDetail.status == 4 ? (
                          <div className="ml-auto">
                            <Button
                              type="button"
                              color="primary"
                              onClick={handleCheckOutClick}
                            >
                              <i className="mdi mdi-qrcode-scan me-1" />
                              Quét mã nhận xe
                            </Button>
                          </div>
                        ) : orderServicesDetail.status == 5 ? (
                          <div className="ml-auto">
                            <span className="badge bg-success font-size-14">
                              Hoàn Thành
                            </span>
                          </div>
                        ) : (
                          " "
                        )}
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
                                <td>{`(+${orderServicesDetail.order.user.phone.slice(
                                  1,
                                  3
                                )}) ${orderServicesDetail.order.user.phone.slice(
                                  3
                                )}`}</td>
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
                                              // menuPlacement="top"
                                            />
                                            <Button
                                              onClick={handleAssignExpert}
                                              type="button"
                                              color="primary"
                                              className="w-md mt-2 me-2"
                                              disabled={!selectedGroup}
                                            >
                                              Phân công
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
                                              Phân công lại
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
