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
  Progress,
} from "reactstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"

import img1 from "../../../assets/images/product/img-1.png"
import img2 from "../../../assets/images/product/img-2.png"
import img3 from "../../../assets/images/product/img-3.png"
import img4 from "../../../assets/images/product/img-4.png"
import img5 from "../../../assets/images/product/img-5.png"
import img6 from "../../../assets/images/product/img-6.png"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  putOrderServices as onRecommendService,
  putAssignExperts as assignExpert,
  getStatusLog as onGetStatusLog,
} from "store/order-services/actions"

import {
  getGroupService as onGetGroupService,
  getExperts as onGetExpert,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const OrderServiceDetail = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Admin"

  const [step1, setStep1] = useState(true)

  const [symptom, setSymptom] = useState("")
  const [selectedGroup, setselectedGroup] = useState(null)

  const inpRow = [{ itemId: "", price: "" }]
  const [inputFields, setinputFields] = useState(inpRow)

  const {
    match: { params },
  } = props

  const { history } = props
  const dispatch = useDispatch()

  const { orderServicesDetails, groupService, users, orderServiceLog } =
    useSelector(state => ({
      orderServicesDetails: state.orderServices.orderServicesDetails,
      groupService: state.groupServices.groupService,
      users: state.userLists.users,
      orderServiceLog: state.orderServices.orderServiceLog,
    }))

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetOrderServiceDetail(params.id))
    }
  }, [params, onGetOrderServiceDetail])

  useEffect(() => {
    dispatch(onGetGroupService())
  }, [onGetGroupService])

  useEffect(() => {
    dispatch(onGetExpert())
  }, [onGetExpert])

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetStatusLog(params.id))
    }
  }, [params, onGetStatusLog])

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { itemId: "", price: "" }
    setinputFields([...inputFields, item1])
    setselectedGroup(null)
  }

  // Function for Remove Input Fields
  function handleRemoveFields(index) {
    const updatedFields = [...inputFields]
    updatedFields.splice(index, 1)
    setinputFields(updatedFields)
  }

  // const handleSelectGroup = (selectedOption, index) => {
  //   // set the selected option
  //   setselectedGroup(selectedOption)

  //   // update the price field in the input
  //   const updatedFields = [...inputFields]
  //   updatedFields[index] = {
  //     itemId: selectedOption.itemId,
  //     price: selectedOption.price,
  //   }
  //   setinputFields(updatedFields)
  // }

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }

  const optionGroup = users.map(ex => ({
    label: ex.fullname,
    value: ex.id,
  }))

  // const optionGroup1 = groupService.map(group => {
  //   const selectedOptionIds = inputFields.map(field => field.itemId) // get the ids of all selected options
  //   const options = group.items
  //     .filter(option => !selectedOptionIds.includes(option.id)) // filter out options that have already been selected
  //     .map(option => ({
  //       label: option.name,
  //       value: option.id,
  //       itemId: option.id,
  //       price: option.presentPrice.price,
  //     }))
  //   return {
  //     label: group.name,
  //     options: options,
  //   }
  // })

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const services = {
  //     healthCarRecord: {
  //       symptom,
  //     },
  //     orderServiceDetails: inputFields,
  //   }
  //   //dispatch(onRecommendService(params.id, services))
  //   console.log(services)
  //   console.log(params)
  // }

  // const productListvar = [
  //   {
  //     id: 1,
  //     img: img1,
  //     name: "Half sleeve T-shirt",
  //     color: "Green",
  //     price: "450",
  //     data_attr: 2,
  //     total: 900,
  //   },
  //   {
  //     id: 2,
  //     img: img2,
  //     name: "Black color T-shirt",
  //     color: "Black",
  //     price: "225",
  //     data_attr: 6,
  //     total: 225,
  //   },
  //   {
  //     id: 3,
  //     img: img3,
  //     name: "Printed T-shirt",
  //     color: "Black",
  //     price: "152",
  //     data_attr: 2,
  //     total: 304,
  //   },
  //   {
  //     id: 4,
  //     img: img4,
  //     name: "Smiley Plain T-shirt",
  //     color: "Blue",
  //     price: "145",
  //     data_attr: 2,
  //     total: 290,
  //   },
  //   {
  //     id: 5,
  //     img: img5,
  //     name: "Full sleeve T-Shirt",
  //     color: "Light orange",
  //     price: "138",
  //     data_attr: 8,
  //     total: 138,
  //   },
  //   {
  //     id: 6,
  //     img: img6,
  //     name: "Sky blue color T-shirt",
  //     color: "Green",
  //     price: "152",
  //     data_attr: 2,
  //     total: 304,
  //   },
  // ]

  const handleAssignExpert = () => {
    const exId = selectedGroup.value
    if (params.id) {
      dispatch(assignExpert(params.id, exId))
    }
    console.log(dispatch(assignExpert(params.id, exId)))
  }

  const createAtDate = orderServiceLog[0].logDateTime
  const createDate = new Date(createAtDate)
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
  const formattedDateTime = ` ${formattedTime} ${formattedDate}`

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Dịch vụ"
            breadcrumbItem={
              "Theo dõi tiến trình" + " - " + ("#" + orderServicesDetails.code)
            }
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  {map(orderServiceLog, statusLog => (
                    <div className="m-5">
                      <div className="position-relative m-4" key={statusLog.id}>
                        <Progress
                          value={50}
                          color="primary"
                          style={{ height: "6px" }}
                        />
                        <div className="position-absolute top-0 start-0 translate-middle">
                          <button
                            className="btn btn-sm btn-primary rounded-pill fw-med"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              fontSize: "1.1rem",
                            }}
                          >
                            1
                          </button>
                          <div
                            className="position-absolute mt-4 start-50 translate-middle"
                            style={{ transform: "translate(-50%, 50%)" }}
                          >
                            <span>{formattedDateTime}</span>
                          </div>
                        </div>
                        <div
                          className="position-absolute top-0 translate-middle"
                          style={{ left: "25%" }}
                        >
                          <button
                            className="btn btn-sm btn-primary rounded-pill"
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          >
                            2
                          </button>
                          <div
                            className="position-absolute mt-4 start-50 translate-middle"
                            style={{ transform: "translate(-50%, 50%)" }}
                          >
                            Button 2 Title
                          </div>
                        </div>
                        <div
                          className="position-absolute top-0 translate-middle"
                          style={{ left: "50%" }}
                        >
                          <button
                            className="btn btn-sm btn-secondary rounded-pill"
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          >
                            3
                          </button>
                          <div
                            className="position-absolute mt-4 start-50 translate-middle"
                            style={{ transform: "translate(-50%, 50%)" }}
                          >
                            Button 3 Title
                          </div>
                        </div>
                        <div
                          className="position-absolute top-0 translate-middle"
                          style={{ left: "75%" }}
                        >
                          <button
                            className="btn btn-sm btn-secondary rounded-pill"
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          >
                            4
                          </button>
                          <div
                            className="position-absolute mt-4 start-50 translate-middle"
                            style={{ transform: "translate(-50%, 50%)" }}
                          >
                            Button 4 Title
                          </div>
                        </div>
                        <div className="position-absolute top-0 start-100 translate-middle">
                          <button
                            className="btn btn-sm btn-secondary rounded-pill"
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          >
                            5
                          </button>
                          <div
                            className="position-absolute mt-4 start-50 translate-middle"
                            style={{ transform: "translate(-50%, 50%)" }}
                          >
                            Button 5 Title
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardBody>
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
                  {/* <h4 className="card-title mt-5">Gợi ý dịch vụ</h4>
                  <p className="card-title-desc">
                    Vui lòng chọn những dịch vụ phù hợp sau khi kiểm tra xe
                  </p>
                  <form onSubmit={handleSubmit}>
                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        Hồ sơ ghi chú
                      </Label>
                      <Col lg="10">
                        <div className="mb-3">
                          <Input
                            type="textarea"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="Ghi chú tình trạng xe"
                            value={symptom}
                            onChange={e => setSymptom(e.target.value)}
                          />
                        </div>
                      </Col>
                    </FormGroup>
                    <div className="inner-repeater mb-4">
                      <div className="inner form-group mb-0 row">
                        <Label className="col-form-label col-lg-2">
                          Gợi ý dịch vụ
                        </Label>
                        <div
                          className="inner col-lg-10 ml-md-auto"
                          id="repeater"
                        >
                          {inputFields.map((field, key) => (
                            <div
                              key={key}
                              id={"nested" + key}
                              className="mb-3 row align-items-center"
                            >
                              <Col md="6">
                                <Select
                                  defaultValue={selectedGroup}
                                  onChange={selectedOption => {
                                    handleSelectGroup(selectedOption, key)
                                  }}
                                  options={optionGroup}
                                  classNamePrefix="select2-selection"
                                  placeholder="Chọn dịch vụ"
                                />
                              </Col>
                              <Col md="4">
                                <input
                                  type="text"
                                  className="inner form-control text-right"
                                  defaultValue={field.price}
                                  placeholder="Giá"
                                  disabled
                                />
                              </Col>
                              <Col md="2">
                                <div className="mt-2 mt-md-0 d-grid">
                                  <Button
                                    color="primary"
                                    className="inner"
                                    onClick={() => {
                                      handleRemoveFields(key)
                                    }}
                                    block
                                  >
                                    Xóa
                                  </Button>
                                </div>
                              </Col>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Row className="justify-content-end">
                        <Col lg="10">
                          <Button
                            color="success"
                            className="inner"
                            onClick={() => {
                              handleAddFields()
                            }}
                          >
                            Thêm dịch vụ
                          </Button>
                        </Col>
                      </Row>
                    </div>
                    <button type="submit" className="btn btn-primary w-md mt-5">
                      Gữi gợi ý
                    </button>
                  </form> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col lx="8">
              <Card>
                <CardBody>
                  <h3 className="card-title">
                    Những dịch vụ được gợi ý từ kỹ thuật viên
                  </h3>
                  <p className="card-title-desc">Những dịch vụ chi tiết</p>
                  <div className="table-responsive mt-5">
                    <Table className="table align-middle mb-0 table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Tên dịch vụ</th>
                          <th>Giá</th>
                          <th>Quantity</th>
                          <th colSpan="2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {map(
                          orderServicesDetails.orderServiceDetails,
                          service => (
                            <tr key={service.id}>
                              <td>
                                <img
                                  src={product.img}
                                  alt="product-img"
                                  title="product-img"
                                  className="avatar-md"
                                />
                              </td>
                              <td>
                                <h5 className="font-size-14 text-truncate">
                                  <Link
                                    to={
                                      "/ecommerce-product-detail/" + service.id
                                    }
                                    className="text-dark"
                                  >
                                    {service.item.name}
                                  </Link>
                                </h5>
                                <p className="mb-0">
                                  Color :{" "}
                                  <span className="fw-medium">
                                    {product.color}
                                  </span>
                                </p>
                              </td>
                              <td>$ {service.price}</td>
                              <td>
                                <div style={{ width: "120px" }}>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        // onClick={() => {
                                        //   countUP(service.id, product.data_attr)
                                        // }}
                                      >
                                        +
                                      </button>
                                    </div>
                                    <Input
                                      type="text"
                                      value={product.data_attr}
                                      name="demo_vertical"
                                      readOnly
                                    />
                                    <div className="input-group-append">
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                          countDown(
                                            product.id,
                                            product.data_attr
                                          )
                                        }}
                                      >
                                        -
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>$ {service.price}</td>
                              <td>
                                <Link
                                  to="#"
                                  onClick={() => removeCartItem(service.id)}
                                  className="action-icon text-danger"
                                >
                                  {" "}
                                  <i className="mdi mdi-trash-can font-size-18" />
                                </Link>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </div>
                  <Row className="mt-4">
                    <Col sm="6">
                      <Link
                        to="/ecommerce-products"
                        className="btn btn-secondary"
                      >
                        <i className="mdi mdi-arrow-left me-1" /> Continue
                        Shopping{" "}
                      </Link>
                    </Col>
                    <Col sm="12">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <Link
                          to="/ecommerce-checkout"
                          className="btn btn-success"
                        >
                          <i className="mdi mdi-cart-arrow-right me-1" /> Xác
                          nhận{" "}
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card Details</CardTitle>

                  <div className="card bg-primary text-white visa-card mb-0">
                    <CardBody>
                      <div>
                        <i className="bx bxl-visa visa-pattern" />

                        <div className="float-end">
                          <i className="bx bxl-visa visa-logo display-3" />
                        </div>

                        <div>
                          <i className="bx bx-chip h1 text-warning" />
                        </div>
                      </div>

                      <Row className="mt-5">
                        <Col xs="4">
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col xs="4">
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col xs="4">
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                      </Row>

                      <div className="mt-5">
                        <h5 className="text-white float-end mb-0">12/22</h5>
                        <h5 className="text-white mb-0">Fredrick Taylor</h5>
                      </div>
                    </CardBody>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Tổng đơn hàng</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>Grand Total :</td>
                          <td>$ 1,857</td>
                        </tr>
                        <tr>
                          <td>Discount : </td>
                          <td>- $ 157</td>
                        </tr>
                        <tr>
                          <td>Shipping Charge :</td>
                          <td>$ 25</td>
                        </tr>
                        <tr>
                          <td>Estimated Tax : </td>
                          <td>$ 19.22</td>
                        </tr>
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
          </Row> */}
          <Row>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label>Phân công nhiệm vụ cho kỹ thuật viên</Label>
                    <Select
                      value={selectedGroup}
                      onChange={handleSelectGroup}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
                    />
                  </div>
                  <button onClick={handleAssignExpert}>Phân công</button>
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
