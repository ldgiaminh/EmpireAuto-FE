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

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  putOrderServices as onRecommendService,
} from "store/order-services/actions"
import { getGroupService as onGetGroupService } from "store/actions"

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

  const handleSelectGroup = (selectedOption, index) => {
    // set the selected option
    setselectedGroup(selectedOption)

    // update the price field in the input
    const updatedFields = [...inputFields]
    updatedFields[index] = {
      itemId: selectedOption.itemId,
      price: selectedOption.price,
    }
    setinputFields(updatedFields)
  }

  const { history } = props
  const dispatch = useDispatch()

  const { orderServicesDetails } = useSelector(state => ({
    orderServicesDetails: state.orderServices.orderServicesDetails,
  }))

  const { groupService } = useSelector(state => ({
    groupService: state.groupServices.groupService,
  }))

  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetOrderServiceDetail(params.id))
    }
  }, [params, onGetOrderServiceDetail])

  useEffect(() => {
    dispatch(onGetGroupService())
  }, [onGetGroupService])

  // const optionGroup = groupService.map(group => ({
  //   label: group.name,
  //   options: group.items.map(option => ({
  //     label: option.name,
  //     //value: option.id,
  //     itemId: option.id,
  //     price: option.presentPrice.price,
  //   })),
  // }))

  const optionGroup = groupService.map(group => {
    const selectedOptionIds = inputFields.map(field => field.itemId) // get the ids of all selected options
    const options = group.items
      .filter(option => !selectedOptionIds.includes(option.id)) // filter out options that have already been selected
      .map(option => ({
        label: option.name,
        value: option.id,
        itemId: option.id,
        price: option.presentPrice.price,
      }))
    return {
      label: group.name,
      options: options,
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    const services = {
      healthCarRecord: {
        symptom,
      },
      orderServiceDetails: inputFields,
    }
    //dispatch(onRecommendService(params.id, services))
    console.log(services)
    console.log(params)
  }

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dịch vụ" breadcrumbItem="Theo dõi tiến trình" />

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
                  </form>
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
