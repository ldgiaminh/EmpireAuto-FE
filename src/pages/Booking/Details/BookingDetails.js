import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { isEmpty, map } from "lodash"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap"
import Select from "react-select"
import Dropzone from "react-dropzone"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getBookingDetails as onGetBookingDetail } from "store/bookings/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const BookingDetails = props => {
  //meta title
  document.title = "Chi Tiết Đặt Lịch | Empire Admin"

  const dispatch = useDispatch()

  const { bookingDetail } = useSelector(state => ({
    bookingDetail: state.bookings.bookingDetail,
  }))

  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetBookingDetail(params.id))
    }
  }, [params, onGetBookingDetail, dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Đặt lịch"
            breadcrumbItem={"#" + bookingDetail.code}
          />

          {!isEmpty(bookingDetail) && (
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>Thông tin</CardTitle>
                    <CardSubtitle className="mb-3">
                      Chi tiết về lịch và thông tin khách hàng
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
                                  Mã đặt lịch :
                                </th>
                                <td>{bookingDetail.code}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Ngày đặt :
                                </th>
                                <td>
                                  {new Date(
                                    bookingDetail.date
                                  ).toLocaleDateString()}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Ngày tạo lịch :
                                </th>
                                <td>
                                  {new Date(
                                    bookingDetail.createdAt
                                  ).toLocaleString()}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Cập nhật :
                                </th>
                                <td>
                                  {new Date(
                                    bookingDetail.arrivedDateTime
                                  ).toLocaleString()}
                                </td>
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
                                  {bookingDetail.isArrived
                                    ? "Đã đến"
                                    : "Chưa đến"}
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
                                <td>{bookingDetail.user.phone}</td>
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
                                  Địa chỉ :
                                </th>
                                <td>{bookingDetail.user.address}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardBody>
                    <CardTitle className="mt-3">Phương tiện</CardTitle>
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
                                  Tình trạng xe :
                                </th>
                                <td>
                                  {map(
                                    bookingDetail.symptoms,
                                    symptom => symptom.name
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

BookingDetails.propTypes = {
  match: PropTypes.object,
}

export default withRouter(BookingDetails)
