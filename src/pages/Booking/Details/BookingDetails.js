import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import uuid from "uuid"
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

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getBookingDetails as onGetBookingDetail,
  checkinBooking as checkInBooking,
} from "store/bookings/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { ref, set } from "firebase/database"
import { db } from "helpers/firebase"
import Loading from "components/Loader/Loading"

const BookingDetails = props => {
  //meta title
  document.title = "Chi Tiết Đặt Lịch | Empire Admin"

  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { bookingDetail, isAssign, isLoading } = useSelector(state => ({
    bookingDetail: state.bookings.bookingDetail,
    isLoading: state.bookings.isLoading,
    isAssign: state.Layout.isAssign,
  }))

  /*
  ==================================================
  PRAMS (ID) & useEffect
  ==================================================
  */
  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetBookingDetail(params.id))
    }
  }, [params, onGetBookingDetail])

  /*
  ==================================================
  CHECK-IN FUNCTION
  ==================================================
  */

  /* ALERT */
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

  const sendNotification = userId => {
    const notificationId = uuid.v4()
    set(ref(db, `users/${userId}/notifications/${notificationId}`), {
      isRead: "false",
      message: "Check-in thành công #" + bookingDetail.code,
      time: isoDateTime,
      title: "Bạn đã check-in thành công",
    })
  }

  /* HANDLE CHECK IN */
  const handleCheckIn = id => {
    if (id) {
      dispatch(checkInBooking(id, isAssign))
      toastr.success("Check-in thành công", "Thành công")
      dispatch(onGetBookingDetail(id))
      sendNotification(id)
    }
  }

  /*
  ==================================================
  FORMAT DATE TIME from API
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

  /* ========================================== RENDER ==============================================*/
  return (
    <React.Fragment>
      <div className="page-content">
        {isLoading && <Loading />}
        <Container fluid>
          {!isLoading && !isEmpty(bookingDetail) && (
            <>
              <Breadcrumbs
                title="Đặt lịch"
                breadcrumbItem={"#" + bookingDetail.code}
              />

              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle>Thông tin tổng</CardTitle>
                      <CardSubtitle className="mb-3">
                        Chi tiết về đặt lịch và thông tin khách hàng
                      </CardSubtitle>

                      <Row>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tên khách:
                                  </th>
                                  <td>{bookingDetail.user.fullname}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Số điện thoại :
                                  </th>
                                  <td>{`(+${bookingDetail.user.phone.slice(
                                    1,
                                    3
                                  )}) ${bookingDetail.user.phone.slice(
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
                                  <td>{bookingDetail.user.email}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Trạng thái :
                                  </th>
                                  <td>
                                    {bookingDetail.isActived
                                      ? bookingDetail.isArrived
                                        ? "Đã đến"
                                        : "Chưa đến"
                                      : "Hủy"}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thời gian check-in :
                                  </th>
                                  <td>
                                    {bookingDetail.arrivedDateTime != null
                                      ? formattedDateTime(
                                          bookingDetail.arrivedDateTime
                                        )
                                      : "Xe chưa đến ga-ra"}
                                  </td>
                                </tr>
                                {bookingDetail.transaction.total > 0 ? (
                                  <tr>
                                    <th
                                      scope="row"
                                      style={{ width: "300px" }}
                                      className={"text-capitalize"}
                                    >
                                      Số tiền :
                                    </th>
                                    <td>
                                      {bookingDetail.transaction.total.toLocaleString()}{" "}
                                      ₫
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Phương thức thanh toán :
                                  </th>
                                  <td>
                                    {
                                      bookingDetail.transaction.paymentMethod
                                        .name
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thanh toán lúc :
                                  </th>
                                  <td>
                                    {formattedDateTime(
                                      bookingDetail.transaction.transactionDate
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardBody>
                      <CardTitle>Phương tiện</CardTitle>
                      <CardSubtitle className="mb-3">
                        Thông về phương tiện và tình trạng
                      </CardSubtitle>
                      <Row>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Biển số xe :
                                  </th>
                                  <td>{bookingDetail.car.carLisenceNo}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Dòng xe :
                                  </th>
                                  <td>
                                    {bookingDetail.car.carBrand +
                                      " - " +
                                      bookingDetail.car.carModel}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tình trạng khách mô tả :
                                  </th>
                                  <td>
                                    {bookingDetail.symptoms
                                      .map(symptom => symptom.name)
                                      .join(", ")}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Row className="mt-4 mb-5">
                    <Col sm="6">
                      <Link
                        to="/booking"
                        className="btn text-muted d-none d-sm-inline-block btn-link"
                      >
                        <i className="mdi mdi-arrow-left me-1" /> Trở về trang
                        danh sách đặt lịch{" "}
                      </Link>
                    </Col>
                    {!bookingDetail.isArrived && bookingDetail.isActived ? (
                      <Col sm="6">
                        <div className="text-sm-end">
                          <Button
                            type="button"
                            color="success"
                            className="btn btn-lg"
                            onClick={() => handleCheckIn(bookingDetail.id)}
                          >
                            Check-in
                          </Button>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

BookingDetails.propTypes = {
  match: PropTypes.object,
  isLoading: PropTypes.bool,
  isAssign: PropTypes.bool,
}

export default withRouter(BookingDetails)
