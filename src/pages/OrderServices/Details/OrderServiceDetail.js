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
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Table,
  Progress,
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

const OrderServiceDetail = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Admin"

  const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)

  const [symptom, setSymptom] = useState("")
  const [selectedGroup, setselectedGroup] = useState(null)

  const inpRow = [{ itemId: "", price: "" }]
  const [inputFields, setinputFields] = useState(inpRow)

  const {
    match: { params },
  } = props

  const { history } = props
  const dispatch = useDispatch()

  const {
    orderServicesDetails,
    groupService,
    users,
    orderServiceLog,
    isLoading,
  } = useSelector(state => ({
    orderServicesDetails: state.orderServices.orderServicesDetails,
    groupService: state.groupServices.groupService,
    users: state.userLists.users,
    isLoading: state.orderServices.isLoading,
    orderServiceLog: state.orderServices.orderServiceLog,
  }))

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetOrderServiceDetail(params.id))
    }
  }, [params, onGetOrderServiceDetail])

  useEffect(() => {
    dispatch(onGetExpert())
  }, [onGetExpert])

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

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }

  const optionGroup = users.map(ex => ({
    label: ex.fullname,
    value: ex.id,
  }))

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

  const handleAssignExpert = id => {
    const exId = selectedGroup.value
    if (id) {
      dispatch(assignExpert(id, exId))
      toastr.success("Đã phân công cho " + selectedGroup.label, "Thành công")
      dispatch(onGetOrderServiceDetail(id))
    }
  }

  const handleCheckOutClick = () => {
    history.push("/scanner-checkout")
  }

  return (
    <>
      <div className="page-content">
        {isLoading && <Loading />}
        <Container fluid={true}>
          {!isLoading && !isEmpty(orderServicesDetails) && (
            <React.Fragment>
              <Breadcrumbs
                title="Dịch vụ"
                breadcrumbItem={
                  "Theo dõi tiến trình" +
                  " - " +
                  ("#" + orderServicesDetails.code)
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

                        {orderServicesDetails.status == 4 ? (
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
                        ) : orderServicesDetails.status == 5 ? (
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
                        <Col lg="6">
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
                                  <td>{`(+${orderServicesDetails.order.user.phone.slice(
                                    1,
                                    3
                                  )}) ${orderServicesDetails.order.user.phone.slice(
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
                                  <td>
                                    {orderServicesDetails.order.user.email}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Biển số xe:
                                  </th>
                                  <td>
                                    {orderServicesDetails.car.carLisenceNo}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thương hiệu xe:
                                  </th>
                                  <td>
                                    {orderServicesDetails.car.carBrand +
                                      " - " +
                                      orderServicesDetails.car.carModel}
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
                                    Hóa đơn tạo lúc :
                                  </th>
                                  <td>
                                    {formattedDateTime(
                                      orderServicesDetails.order.createdAt
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
                                    {orderServicesDetails.prepaidFromBooking.toLocaleString()}
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
                                  <td>
                                    {orderServicesDetails.receivingStatus}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    // style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Kỹ thuật viên chính :
                                  </th>
                                  {orderServicesDetails.expert != null ? (
                                    <td>
                                      {orderServicesDetails.expert.fullname}
                                    </td>
                                  ) : (
                                    <td style={{ wordBreak: "break-word" }}>
                                      <div className="form-group">
                                        <Select
                                          value={selectedGroup}
                                          onChange={handleSelectGroup}
                                          options={optionGroup}
                                          classNamePrefix="select2-selection"
                                          placeholder="Chọn kỹ thuật viên"
                                          required={true}
                                        />
                                        <Button
                                          onClick={() =>
                                            handleAssignExpert(params.id)
                                          }
                                          type="button"
                                          color="primary"
                                          className="w-md mt-2"
                                          disabled={!selectedGroup}
                                        >
                                          Phân công
                                        </Button>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    {orderServicesDetails.healthCarRecord != null ? (
                      <CarRecord
                        record={orderServicesDetails.healthCarRecord}
                      />
                    ) : (
                      ""
                    )}
                  </Card>
                </Col>
              </Row>

              {orderServicesDetails.orderServiceDetails.length > 0 ? (
                <Cart services={orderServicesDetails.orderServiceDetails} />
              ) : (
                ""
              )}
            </React.Fragment>
          )}
        </Container>
      </div>
    </>
  )
}

OrderServiceDetail.propTypes = {
  history: PropTypes.object,
  isLoading: PropTypes.bool,
}

export default withRouter(OrderServiceDetail)
