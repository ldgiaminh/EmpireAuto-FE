import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
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
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Table,
} from "reactstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import { getOrderServicesDetails as onGetOrderServiceDetail } from "store/order-services/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const OrderServiceDetail = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Admin"

  const [step1, setStep1] = useState(true)
  const [selectedMulti3, setselectedMulti3] = useState(null)
  const animatedComponents = makeAnimated()

  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3)
  }

  const { history } = props
  const dispatch = useDispatch()

  const { orderServicesDetails } = useSelector(state => ({
    orderServicesDetails: state.orderServices.orderServicesDetails,
  }))

  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetOrderServiceDetail(params.id))
    }
  }, [params, onGetOrderServiceDetail])

  const optionGroup2 = [
    {
      label: "Vệ sinh xe",
      options: [
        { label: "Vệ Sinh Nội Thất", value: "Vệ Sinh Nội Thất" },
        { label: "Vệ Sinh Khoang Máy", value: "Vệ Sinh Khoang Máy" },
        { label: "Rửa Xe Sạch, An Toàn", value: "Rửa Xe Sạch, An Toàn" },
      ],
    },
    {
      label: "Chăm sóc, làm đẹp",
      options: [
        { label: "Phủ nano", value: "Phủ nano" },
        { label: "Phủ Ceramic", value: "Phủ Ceramic" },
        { label: "Thông xúc kim phun", value: "Thông xúc kim phun" },
      ],
    },
  ]

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dịch vụ" breadcrumbItem="Theo dõi tiến trình" />
          {/* <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="hori-timeline">
                    <div
                      className="owl-carousel owl-theme  navs-carousel events"
                      id="timeline-carousel"
                    >
                      {step1 ? (
                        <>
                          <div
                            className="item event-list active"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                  12 September
                                </div>
                                <h5 className="mb-4">First event</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon" />
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  Đang tiến hành kiểm tra và chuẩn đoán
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="item event-list"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                  06 October
                                </div>
                                <h5 className="mb-4">Second event</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon" />
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  Đang chờ khách hàng xác nhận và thanh toán
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="item event-list"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                  25 October
                                </div>
                                <h5 className="mb-4">Third event</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon" />
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  Đã sửa chữa xong và đang chờ khách đến lấy
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="item event-list"
                            style={{ display: "inline-table" }}
                          >
                            <div>
                              <div className="event-date">
                                <div className="text-primary mb-1">
                                  25 October
                                </div>
                                <h5 className="mb-4">Third event</h5>
                              </div>
                              <div className="event-down-icon">
                                <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon" />
                              </div>

                              <div className="mt-3 px-3">
                                <p className="text-muted">
                                  Phương tiện đã được khách lấy khỏi ga-ra
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title">Thông tin khách hàng</h4>
                  <p className="card-title-desc">Những thông tin chi tiết</p>

                  {!isEmpty(orderServicesDetails) && (
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
                                  Họ và Tên :
                                </th>
                                <td>
                                  {orderServicesDetails.order.user.fullname}
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
                                <td>{orderServicesDetails.order.user.phone}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  E-mail :
                                </th>
                                <td>{orderServicesDetails.order.user.email}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Ngày tạo :
                                </th>
                                <td>
                                  {new Date(
                                    orderServicesDetails.order.createdAt
                                  ).toLocaleString()}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Cập nhật mới nhất :
                                </th>
                                <td>
                                  {new Date(
                                    orderServicesDetails.order.updatedAt
                                  ).toLocaleString()}
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
                                  Biển số xe:
                                </th>
                                <td>{orderServicesDetails.car.carLisenceNo}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Hiệu xe :
                                </th>
                                <td>{orderServicesDetails.car.carBrand}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Dòng xe :
                                </th>
                                <td>{orderServicesDetails.car.carModel}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                  )}
                  <h4 className="card-title mt-5">Gợi ý dịch vụ</h4>
                  <p className="card-title-desc">
                    Vui lòng chọn những dịch vụ phù hợp sau khi kiểm tra xe
                  </p>
                  <form>
                    <Row>
                      <Col lg="12">
                        <div className="mb-3 templating-select select2-container">
                          <label className="control-label">Dịch vụ</label>
                          <Select
                            value={selectedMulti3}
                            isMulti={true}
                            onChange={() => {
                              handleMulti3()
                            }}
                            options={optionGroup2}
                            classNamePrefix="select2-selection"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="control-label">
                            Hồ sơ sức khỏe
                          </label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="Ghi chú tình trạng xe"
                          />
                        </div>
                      </Col>
                    </Row>
                  </form>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary w-md"
                      onClick={() => history.push(`/order-service-detail`)}
                    >
                      Gữi gợi ý
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

OrderServiceDetail.propTypes = {
  history: PropTypes.object,
}

export default withRouter(OrderServiceDetail)
