import React, { useEffect, useState } from "react"
import Select from "react-select"

import {
  Alert,
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
  Label,
  Row,
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Firebase
import { ref as sRef } from "firebase/storage"
import { storage } from "helpers/firebase"
import { getDownloadURL, uploadBytes } from "firebase/storage"

import {
  getGroupService as onGetGroupService,
  getCarsBrand as onGetCarBrand,
  getCarsModelByBrand as onGetCarModelByBrand,
  getCarsProblemByModel as onGetCarProblemByModel,
  addNewCarsItem as onAddNewCarItem,
} from "store/actions"
import Loader from "components/Loader/Loader"

const AddNewCarItem = () => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Tạo mới dịch vụ | Empire Garage"

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsBrand, carsModel, carsProblem, groupService, isLoading } =
    useSelector(state => ({
      carsBrand: state.brands.carsBrand,
      carsModel: state.models.carsModel,
      carsProblem: state.problems.carsProblem,
      groupService: state.groupServices.groupService,
      isLoading: state.items.isLoading,
    }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [selectedGroupService, setSelectedGroupService] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [isPrice, setIsPrice] = useState(false)
  const [isSer, setIsSer] = useState(false)
  const [isPop, setIsPop] = useState(false)
  const [isDe, setIsDe] = useState(false)

  const [image, setImage] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  const [item, setItem] = useState({
    name: "",
    isPriceHidden: "",
    isService: "",
    description: "",
    categoryId: "",
    photo: "",
    problemId: "",
    price: "",
    warranty: "",
    isPopular: "",
    isDefault: "",
  })

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetGroupService())
  }, [dispatch])

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleChange = e => {
    const value = e.target.value
    setItem({ ...item, [e.target.name]: value })
  }

  function handleSelectGroupService(selected) {
    setSelectedGroupService(selected)
    setItem({
      ...item,
      categoryId: selected.value,
    })
  }

  function handleSelectBrand(selected) {
    setSelectedBrand(selected)
    if (selected) {
      dispatch(onGetCarModelByBrand(selected.value))
      setSelectedModel(null)
      setSelectedProblem(null)
    }
  }

  function handleSelectModel(selected) {
    setSelectedModel(selected)
    if (selected) {
      dispatch(onGetCarProblemByModel(selected.value))
      setSelectedProblem(null)
      setSelectedModel(selected)
    }
  }

  function handleSelectProblem(selected) {
    setSelectedProblem(selected)
    setItem({
      ...item,
      problemId: selected.value,
    })
  }

  /*
  ==================================================
  OPTIONS
  ==================================================
  */

  const optionBrand = carsBrand.map(c => ({
    label: c.name,
    value: c.id,
  }))

  const optionModel = carsModel.map(c => ({
    label: c.name,
    value: c.id,
  }))

  const optionProblem = carsProblem.map(c => ({
    label: c.name,
    value: c.id,
  }))

  const optionGroupService = groupService.map(g => ({
    label: g.name,
    value: g.id,
  }))

  /*
  ==================================================
  SUBMIT
  ==================================================
  */

  const saveItem = e => {
    e.preventDefault()
    const imageRef = sRef(storage, `item/${image.name}`)
    uploadBytes(imageRef, image).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        const newItem = {
          ...item,
          photo: url,
          isPriceHidden: isPrice,
          isService: isSer,
        }
        dispatch(onAddNewCarItem(newItem))
      })
    })
  }

  /*
  ==================================================
  Reset Form
  ==================================================
  */

  const resetForm = () => {
    setItem({
      name: "",
      isPriceHidden: "",
      isService: "",
      description: "",
      categoryId: "",
      photo: "",
      problemId: "",
      price: "",
      warranty: "",
    })
    setSelectedBrand(null)
    setSelectedModel(null)
    setSelectedSymptom(null)
  }

  const handleReset = () => {
    dispatch(onResetCarsModel())
    resetForm()
    setIsFormValid(false)
  }

  return (
    // <>
    //   <CardTitle>Thêm dịch vụ mới</CardTitle>
    //   <CardSubtitle className="mb-4">Fill all information below</CardSubtitle>
    //   <Form onSubmit={saveItem}>
    //     <FormGroup className="mb-4" row>
    //       <Label htmlFor="billing-name" md="3" className="col-form-label">
    //         Tên dịch vụ
    //       </Label>
    //       <Col md="9">
    //         <input
    //           className="form-control"
    //           type="text"
    //           placeholder="Nhập tên dịch vụ"
    //           name="name"
    //           onChange={e => handleChange(e)}
    //           value={item.name}
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="mb-4" row>
    //       <Label htmlFor="billing-name" md="3" className="col-form-label">
    //         Giá tiền
    //       </Label>
    //       <Col md="9">
    //         <input
    //           className="form-control"
    //           type="text"
    //           placeholder="Nhập giá tiền"
    //           name="price"
    //           onChange={e => handleChange(e)}
    //           value={item.price}
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="mb-4" row>
    //       <Label htmlFor="billing-name" md="3" className="col-form-label">
    //         Thời gian bảo hành (tháng)
    //       </Label>
    //       <Col md="9">
    //         <input
    //           className="form-control"
    //           type="text"
    //           placeholder="Nhập thời gian"
    //           name="warranty"
    //           onChange={e => handleChange(e)}
    //           value={item.warranty}
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="select2-container mb-4" row>
    //       <Label md="3" className="col-form-label">
    //         Chọn nhóm dịch vụ
    //       </Label>
    //       <Col md="9">
    //         <Select
    //           value={selectedGroupService}
    //           onChange={s => {
    //             handleSelectGroupService(s)
    //           }}
    //           options={optionGroupService}
    //           placeholder="Chọn nhóm dịch vụ"
    //           classNamePrefix="select2-selection"
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="select2-container mb-4" row>
    //       <Label md="3" className="col-form-label">
    //         Hãng xe
    //       </Label>
    //       <Col md="9">
    //         <Select
    //           value={selectedBrand}
    //           onChange={s => {
    //             handleSelectBrand(s)
    //           }}
    //           options={optionBrand}
    //           placeholder="Chọn hãng xe"
    //           classNamePrefix="select2-selection"
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="select2-container mb-4" row>
    //       <Label md="3" className="col-form-label">
    //         Chọn dòng xe
    //       </Label>
    //       <Col md="9">
    //         <Select
    //           value={selectedModel}
    //           onChange={s => {
    //             handleSelectModel(s)
    //           }}
    //           options={optionModel}
    //           placeholder="Chọn dòng xe"
    //           classNamePrefix="select2-selection"
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="select2-container mb-4" row>
    //       <Label md="3" className="col-form-label">
    //         Chọn vấn đề
    //       </Label>
    //       <Col md="9">
    //         <Select
    //           value={selectedProblem}
    //           onChange={s => {
    //             handleSelectProblem(s)
    //           }}
    //           options={optionProblem}
    //           placeholder="Chọn vấn đề"
    //           classNamePrefix="select2-selection"
    //         />
    //       </Col>
    //     </FormGroup>

    //     <FormGroup className="mb-4" row>
    //       <Label htmlFor="billing-name" md="3" className="col-form-label">
    //         Cho phép hiện giá
    //       </Label>
    //       <Col md="9">
    //         <div className="square-switch">
    //           <input
    //             type="checkbox"
    //             id="square-switch1"
    //             switch="bool"
    //             checked={isPrice}
    //             onChange={() => {
    //               setIsPrice(!isPrice)
    //             }}
    //           />
    //           <label
    //             htmlFor="square-switch1"
    //             data-on-label="Yes"
    //             data-off-label="No"
    //           />
    //         </div>
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="mb-4" row>
    //       <Label htmlFor="billing-name" md="3" className="col-form-label">
    //         Dịch vụ
    //       </Label>
    //       <Col md="9">
    //         <div className="square-switch">
    //           <input
    //             type="checkbox"
    //             id="square-switch2"
    //             switch="bool"
    //             checked={isSer}
    //             onChange={() => {
    //               setIsSer(!isSer)
    //             }}
    //           />
    //           <label
    //             htmlFor="square-switch2"
    //             data-on-label="Yes"
    //             data-off-label="No"
    //           />
    //         </div>
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="mb-2" row>
    //       <Label
    //         htmlFor="billing-email-address"
    //         md="3"
    //         className="col-form-label"
    //       >
    //         Hình ảnh
    //       </Label>
    //       <Col md="9">
    //         <Input
    //           className="form-control"
    //           type="file"
    //           id="formFile"
    //           name="image"
    //           onChange={handleChangeImage}
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup className="mb-4" row>
    //       <Label htmlFor="billing-name" md="3" className="col-form-label">
    //         Mô tả
    //       </Label>
    //       <Col md="9">
    //         <Input
    //           className="form-control"
    //           type="textarea"
    //           placeholder="Nhập mô tả"
    //           name="description"
    //           onChange={e => handleChange(e)}
    //           value={item.description}
    //         />
    //       </Col>
    //     </FormGroup>
    //     <FormGroup row>
    //       <Col md="9">
    //         <Button color="success" className="btn btn-success mt-3">
    //           Xác nhận
    //         </Button>
    //       </Col>
    //     </FormGroup>
    //   </Form>
    // </>
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Vấn đề phương tiện" />

        <Row style={{ justifyContent: "center" }}>
          <Col xl={7} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Vấn đề</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để tạo mới vấn đề cho các phương
                  tiện
                </CardSubtitle>
                {isFormValid ? (
                  <Alert color="danger">Vui lòng điền đầy đủ dữ liệu</Alert>
                ) : null}
                <Form onSubmit={saveItem}>
                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Tên dịch vụ*
                    </Label>
                    <Col md="9">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập tên dịch vụ"
                        name="name"
                        onChange={e => handleChange(e)}
                        value={item.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label md="3" className="col-form-label">
                      Giá tiền*
                    </Label>
                    <Col md="9">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập giá tiền"
                        name="price"
                        onChange={e => handleChange(e)}
                        value={item.price}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label md="3" className="col-form-label">
                      Giá tiền*
                    </Label>
                    <Col md="9">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập giá tiền"
                        name="price"
                        onChange={e => handleChange(e)}
                        value={item.price}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="3" className="col-form-label">
                      Chọn nhóm dịch vụ
                    </Label>
                    <Col md="9">
                      <Select
                        value={selectedGroupService}
                        onChange={s => {
                          handleSelectGroupService(s)
                        }}
                        options={optionGroupService}
                        placeholder="Chọn nhóm dịch vụ"
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="3" className="col-form-label">
                      Hãng xe*
                    </Label>
                    <Col md="9">
                      <Select
                        value={selectedBrand}
                        onChange={s => {
                          handleSelectBrand(s)
                        }}
                        options={optionBrand}
                        placeholder="Chọn hãng xe"
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="3" className="col-form-label">
                      Dòng xe*
                    </Label>
                    <Col md="9">
                      <Select
                        value={selectedModel}
                        onChange={s => {
                          handleSelectModel(s)
                        }}
                        options={optionModel}
                        placeholder="Chọn dòng xe"
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="3" className="col-form-label">
                      Chọn dòng xe
                    </Label>
                    <Col md="9">
                      <Select
                        value={selectedModel}
                        onChange={s => {
                          handleSelectModel(s)
                        }}
                        options={optionModel}
                        placeholder="Chọn dòng xe"
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="3" className="col-form-label">
                      Chọn vấn đề
                    </Label>
                    <Col md="9">
                      <Select
                        value={selectedProblem}
                        onChange={s => {
                          handleSelectProblem(s)
                        }}
                        options={optionProblem}
                        placeholder="Chọn vấn đề"
                        classNamePrefix="select2-selection"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Cho phép hiện giá*
                    </Label>
                    <Col md="9">
                      <div className="square-switch">
                        <input
                          type="checkbox"
                          id="square-switch1"
                          switch="bool"
                          checked={isPrice}
                          onChange={() => {
                            setIsPrice(!isPrice)
                          }}
                        />
                        <label
                          htmlFor="square-switch1"
                          data-on-label="Yes"
                          data-off-label="No"
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Dịch vụ*
                    </Label>
                    <Col md="9">
                      <div className="square-switch">
                        <input
                          type="checkbox"
                          id="square-switch2"
                          switch="bool"
                          checked={isSer}
                          onChange={() => {
                            setIsSer(!isSer)
                          }}
                        />
                        <label
                          htmlFor="square-switch2"
                          data-on-label="Yes"
                          data-off-label="No"
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Dịch vụ phổ biến*
                    </Label>
                    <Col md="9">
                      <div className="square-switch">
                        <input
                          type="checkbox"
                          id="square-switch3"
                          switch="bool"
                          checked={isPop}
                          onChange={() => {
                            setIsPop(!isPop)
                          }}
                        />
                        <label
                          htmlFor="square-switch3"
                          data-on-label="Yes"
                          data-off-label="No"
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Mặc định*
                    </Label>
                    <Col md="9">
                      <div className="square-switch">
                        <input
                          type="checkbox"
                          id="square-switch4"
                          switch="bool"
                          checked={isDe}
                          onChange={() => {
                            setIsDe(!isDe)
                          }}
                        />
                        <label
                          htmlFor="square-switch4"
                          data-on-label="Yes"
                          data-off-label="No"
                        />
                      </div>
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Mô tả*
                    </Label>
                    <Col md="9">
                      <Input
                        className="form-control"
                        type="textarea"
                        placeholder="Nhập mô tả"
                        name="description"
                        onChange={e => handleChange(e)}
                        value={item.description}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-2" row>
                    <Label
                      htmlFor="billing-email-address"
                      md="3"
                      className="col-form-label"
                    >
                      Hình ảnh*
                    </Label>
                    <Col md="9">
                      <Input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="image"
                        onChange={handleChangeImage}
                      />
                    </Col>
                  </FormGroup>

                  <div className="d-flex flex-grap gap-2 justify-content-end text-center mt-4">
                    <button
                      type="submit"
                      // disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Tạo mới
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleReset}
                    >
                      Hủy
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddNewCarItem
