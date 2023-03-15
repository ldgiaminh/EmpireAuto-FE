import React, { useState } from "react"
import { Link } from "react-router-dom"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import PropTypes from "prop-types"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Input,
  Row,
  Table,
} from "reactstrap"

import { useDispatch } from "react-redux"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  putConfirmServices as confirmService,
} from "store/order-services/actions"

const Cart = ({ id, services, healthCarRecord, order }) => {
  const inpRow = [{ id: "", isConfirmed: false }]
  const [inputFields, setInputFields] = useState([])

  const dispatch = useDispatch()

  const handleInputChange = event => {
    const { id, checked } = event.target
    const index = inputFields.findIndex(input => input.id === id)
    const newInputFields = [...inputFields]
    if (index !== -1 && newInputFields[index].isConfirmed !== checked) {
      newInputFields[index].isConfirmed = checked
    } else if (index === -1) {
      newInputFields.push({ id: id, isConfirmed: checked })
    }
    setInputFields(newInputFields)
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

  const handleConfirm = () => {
    const services = {
      orderServiceDetails: inputFields,
    }
    dispatch(confirmService(id, services))
    toastr.success("Xác nhận thành công dịch vụ của đơn" + id, "Thành công")
    dispatch(onGetOrderServiceDetail(id))
  }

  const confirmedServices = services.filter(
    service => service.isConfirmed === true
  )
  const unconfirmedServices = services.filter(
    service => service.isConfirmed === false
  )

  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col xl="8">
          <Card>
            {order.status === 3 || order.status === 4 || order.status === 5 ? (
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-15">
                      Những dịch vụ khách đã xác nhận và thanh toán
                    </h5>
                    <p className="text-muted">
                      Thông tin chi tiết sau khi khách xác nhận và thanh toán
                      các dịch vụ
                    </p>
                  </div>
                </div>

                <h5 className="font-size-15 mt-4">Kết quả chuẩn đoán :</h5>

                <p className="text-muted">{healthCarRecord.symptom}</p>

                <div className="text-muted mt-4">
                  {confirmedServices.map((service, index) => (
                    <p key={index}>
                      <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                      {service.item.name}
                    </p>
                  ))}
                </div>

                {/* <Row className="task-dates mb-4">
                  <Col sm="4" xs="6">
                    <div className="mt-4">
                      <h5 className="font-size-14">
                        <i className="bx bx-calendar me-1 text-primary" /> Start
                        Date
                      </h5>
                      <p className="text-muted mb-0">15/03/2023</p>
                    </div>
                  </Col>

                  <Col sm="4" xs="6">
                    <div className="mt-4">
                      <h5 className="font-size-14">
                        <i className="bx bx-calendar-check me-1 text-primary" />{" "}
                        Due Date
                      </h5>
                      <p className="text-muted mb-0">15/03/2023</p>
                    </div>
                  </Col>
                </Row> */}

                {unconfirmedServices.length > 0 && (
                  <>
                    <h5>Dịch vụ không xác nhận</h5>
                    {unconfirmedServices.map((service, index) => (
                      <p key={index}>
                        <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                        {service.item.name}
                      </p>
                    ))}
                  </>
                )}
                {order.status === 4 ? (
                  <Row className="mt-4">
                    <Col sm="12">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <Button
                          onClick={handleConfirm}
                          className="btn btn-success"
                        >
                          {/* <i className="mdi mdi-cart-arrow-right me-1" /> */}
                          Khách đã nhận lại xe{" "}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </CardBody>
            ) : (
              <CardBody>
                <div className="table-responsive">
                  <CardTitle className="mb-3">
                    Những dịch vụ được kỹ thuật viên gợi ý
                  </CardTitle>
                  <div className="mb-5">
                    <h5 className="font-size-15 mt-4">Ghi chú :</h5>
                    <p className="text-muted">{healthCarRecord.symptom}</p>
                  </div>
                  <Table className="table align-middle mb-0 table-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Dịch vụ</th>
                        <th colSpan="2">Giá tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr key={index}>
                          <td>
                            <h5 className="font-size-14 text-truncate">
                              <Link to={"#"} className="text-dark">
                                {service.item.name}
                              </Link>
                            </h5>
                          </td>
                          <td>$ {service.price}</td>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={service.id}
                              defaultChecked={service.isConfirmed}
                              onChange={handleInputChange}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <Row className="mt-4">
                  <Col sm="12">
                    <div className="text-sm-end mt-2 mt-sm-0">
                      <Button
                        onClick={handleConfirm}
                        className="btn btn-success"
                      >
                        <i className="mdi mdi-cart-arrow-right me-1" /> Xác nhận{" "}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            )}
          </Card>
        </Col>
        <Col xl="4">
          <Card>
            <CardBody>
              <CardTitle className="mb-3">Tổng hóa đơn</CardTitle>

              <div className="table-responsive">
                <Table className="table mb-0">
                  <tbody>
                    {services.map((service, index) => (
                      <tr key={index}>
                        <td>{service.item.name} :</td>
                        <td>{service.price}</td>
                      </tr>
                    ))}
                    <tr>
                      <th>Total :</th>
                      <th>$ 1744.22</th>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Cart
