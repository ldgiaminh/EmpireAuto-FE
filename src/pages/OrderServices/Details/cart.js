import React, { useState } from "react"
import { Link } from "react-router-dom"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import classnames from "classnames"

import PropTypes from "prop-types"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Row,
  Table,
} from "reactstrap"

import { useDispatch } from "react-redux"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  putConfirmPaid as onConfirmPaidServices,
  postCheckOut as checkOutServices,
} from "store/order-services/actions"

const Cart = ({ details, services }) => {
  const dispatch = useDispatch()

  // const [inputFields, setInputFields] = useState(() => {
  //   return services.map(service => {
  //     return {
  //       id: service.id,
  //       isConfirmed: service.isConfirmed,
  //     }
  //   })
  // })

  const [inputFields, setInputFields] = useState([])

  const initialConfirmed = inputFields.every(field => !field.isConfirmed)

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

  // const handleInputChange = event => {
  //   const { id, checked } = event.target
  //   const index = inputFields.findIndex(input => input.id === id)
  //   const newInputFields = [...inputFields]
  //   if (index !== -1 && newInputFields[index].isConfirmed !== checked) {
  //     newInputFields[index].isConfirmed = checked
  //   } else if (index === -1) {
  //     newInputFields.push({ id: id, isConfirmed: checked })
  //   }

  //   const hasConfirmed = newInputFields.some(field => field.isConfirmed)

  //   setInputFields(hasConfirmed ? newInputFields : initialConfirmed)
  // }

  const total = services.reduce((acc, service) => acc + service.price, 0)

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

  // const handleConfirm = () => {
  //   const services = {
  //     orderServiceDetails: inputFields,
  //     paymentMethod: 1,
  //   }
  //   dispatch(onConfirmPaidServices(id, services))
  //   console.log(services)
  //   toastr.success("Xác nhận thành công dịch vụ của đơn", "#" + details.code)
  //   dispatch(onGetOrderServiceDetail(details.id))
  // }

  const handleCheckOut = () => {
    const statusLogId = {
      orderServiceId: details.id,
      orderServiceStatusId: 5,
    }
    dispatch(checkOutServices(statusLogId))
    toastr.success("Khách đã nhận lại xe", "#" + details.code)
    dispatch(onGetOrderServiceDetail(details.id))
  }

  return (
    <React.Fragment>
      <Row className="mt-3">
        <Col xl="8">
          <Card>
            <CardBody>
              <div className="table-responsive">
                <CardTitle className="mb-3">
                  Những dịch vụ đã được xác nhận và thanh toán
                </CardTitle>
                {/* <div className="mb-5">
                  <h5 className="font-size-15 mt-4">Ghi chú :</h5>
                  <p className="text-muted">{healthCarRecord.symptom}</p>
                </div> */}
                <Table className="table align-middle mb-0 table-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Dịch vụ</th>
                      <th>Giá tiền</th>
                      {services.some(service => service.note !== null) && (
                        <th>Ghi chú</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(service => (
                      <tr key={service.id}>
                        {service.images.map(img => (
                          <td key={img.id}>
                            <img
                              src={img.img}
                              alt="product-img"
                              title="product-img"
                              className="avatar-md"
                            />
                          </td>
                        ))}
                        <td>
                          <h5 className="font-size-14 text-truncate">
                            <Link to="#" className="text-dark">
                              {service.item.name}
                            </Link>
                          </h5>
                          <p className="mb-0">{service.item.problem.name}</p>
                        </td>
                        <td>{service.price.toLocaleString()}đ</td>
                        {service.note !== null ? (
                          <td style={{ whiteSpace: "pre-wrap" }}>
                            {service.note}
                          </td>
                        ) : null}
                        {/* <td>
                          <Link
                            to="#"
                            onClick={() => removeCartItem(product.id)}
                            className="action-icon text-danger"
                          >
                            {" "}
                            <i className="mdi mdi-trash-can font-size-18" />
                          </Link>
                        </td> */}
                      </tr>
                    ))}
                    {/* {healthCarRecord.healthCarRecordProblems.map(
                        (problem, problemIndex) =>
                        
                          problem.items.map((item, itemIndex) => (
                         
                            <tr key={`${problemIndex}-${itemIndex}`}>
                              <td>
                                <h5 className="font-size-14 text-truncate">
                                  <Link to={"#"} className="text-dark">
                                    {item.name}
                                  </Link>
                                </h5>
                              </td>
                              <td>{item.presentPrice}₫</td>
                            
                              /* <td>
        <input
          type="checkbox"
          className="form-check-input"
          id={`${problemIndex}-${itemIndex}`}
          defaultChecked={item.isConfirmed}
          onChange={handleInputChange}
        />
      </td>
                            </tr>
                          ))
                      )} */}
                  </tbody>
                </Table>
              </div>
            </CardBody>
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
                        <td>{service.price.toLocaleString()}đ</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Phí kiểm tra :</td>
                      <td>{details.prepaidFromBooking.toLocaleString()}đ</td>
                    </tr>
                    <tr>
                      <th>Tạm tính :</th>
                      <th>{total.toLocaleString()}đ</th>
                    </tr>
                    <tr>
                      <td className="text-danger">Phí đặt lịch :</td>
                      <td className="text-danger">
                        - {details.prepaidFromBooking.toLocaleString()}đ
                      </td>
                    </tr>

                    <tr>
                      <th>Tổng cộng :</th>
                      <th>{total.toLocaleString()}đ</th>
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
