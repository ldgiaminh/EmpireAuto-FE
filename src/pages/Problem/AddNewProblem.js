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
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { Link, withRouter } from "react-router-dom"

import * as Yup from "yup"
import { useFormik } from "formik"

import {
  getCarsModelByBrand as onGetCarModelByBrand,
  getCarsBrand as onGetCarBrand,
  getSymptomsLists as onGetCarSymptoms,
  addNewCarsProblem as onAddNewCarProblem,
  resetCarsModel as onResetCarsModel,
} from "store/actions"
import Loader from "components/Loader/Loader"

const AddNewCarProblem = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsBrand, carsModel, symptoms, isLoading } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
    carsModel: state.models.carsModel,
    symptoms: state.symptomsLists.symptoms,
    isLoading: state.problems.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedSymptom, setSelectedSymptom] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [problem, setProblem] = useState({
    name: "",
    modelId: "",
    symptomId: "",
    intendedMinutes: "",
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
    dispatch(onGetCarSymptoms())
  }, [dispatch])

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  function handleSelectBrand(selected) {
    setSelectedBrand(selected)
    if (selected) {
      dispatch(onGetCarModelByBrand(selected.value))
      setSelectedModel(null)
    }
    setIsFormValid(false)
  }

  function handleSelectModel(selected) {
    setSelectedModel(selected)
    if (selected) {
      setProblem({
        ...problem,
        modelId: selected.value,
      })
    } else {
      setSelectedModel(null)
    }
    setIsFormValid(false)
  }

  function handleSelectSymptom(selected) {
    setSelectedSymptom(selected)
    if (selected) {
      setProblem({
        ...problem,
        symptomId: selected.value,
      })
    } else {
      setSelectedSymptom(null)
    }
    setIsFormValid(false)
  }

  const handleChange = e => {
    const value = e.target.value
    setProblem({ ...problem, [e.target.name]: value })
    setIsFormValid(false)
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

  const optionSymptom = symptoms.map(c => ({
    label: c.name,
    value: c.id,
  }))

  /*
  ==================================================
  FORMIK
  ==================================================
  */

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      problem: "",
      lastname: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
      city: Yup.string().required("Please Enter Your City"),
      state: Yup.string().required("Please Enter Your State"),
      zip: Yup.string().required("Please Enter Your Zip"),
    }),
    onSubmit: values => {
      console.log("values", values)
    },
  })

  /*
  ==================================================
  SUBMIT
  ==================================================
  */

  const saveProblem = e => {
    e.preventDefault()

    // Check if problem is empty
    if (
      !problem.name ||
      !problem.modelId ||
      !problem.symptomId ||
      !problem.intendedMinutes
    ) {
      setIsFormValid(true)
      return
    }

    if (problem) {
      dispatch(
        onAddNewCarProblem(
          problem,
          props.history,
          selectedBrand.value,
          selectedBrand.label,
          selectedModel.value,
          selectedModel.label
        )
      )
      setSelectedBrand(null)
      setSelectedModel(null)
      // setIsSubmitting(true)
      setIsFormValid(false)
    }
  }

  /*
  ==================================================
  Reset Form
  ==================================================
  */

  const resetForm = () => {
    setProblem({
      name: "",
      modelId: "",
      symptomId: "",
      intendedMinutes: "",
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
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Vấn đề phương tiện" />

        <Row style={{ justifyContent: "center", height: "500px" }}>
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
                <Form onSubmit={saveProblem}>
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

                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Tên vấn đề*
                    </Label>
                    <Col md="9">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập tên vấn đề"
                        name="name"
                        onChange={e => handleChange(e)}
                        value={problem.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="3" className="col-form-label">
                      Triệu chứng*
                    </Label>
                    <Col md="9">
                      <Select
                        value={selectedSymptom}
                        onChange={s => {
                          handleSelectSymptom(s)
                        }}
                        options={optionSymptom}
                        placeholder="Chọn triệu chứng xe"
                        classNamePrefix="select2-selection"
                        menuPlacement="top"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label
                      htmlFor="billing-name"
                      md="3"
                      className="col-form-label"
                    >
                      Thời gian dự kiến (phút)*
                    </Label>
                    <Col md="9">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập thời gian dự kiến"
                        name="intendedMinutes"
                        onChange={e => handleChange(e)}
                        value={problem.intendedMinutes}
                      />
                    </Col>
                  </FormGroup>

                  <div className="d-flex flex-grap gap-2 justify-content-end text-center mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
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
                {/* <Form
                  className="needs-validation"
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom01">First name</Label>
                        <Input
                          name="firstname"
                          placeholder="First name"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstname || ""}
                          invalid={
                            validation.touched.firstname &&
                            validation.errors.firstname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.firstname &&
                        validation.errors.firstname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.firstname}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Last name</Label>
                        <Input
                          name="lastname"
                          placeholder="Last name"
                          type="text"
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastname || ""}
                          invalid={
                            validation.touched.lastname &&
                            validation.errors.lastname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.lastname &&
                        validation.errors.lastname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.lastname}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom01">First name</Label>
                        <Input
                          name="firstname"
                          placeholder="First name"
                          type="text"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstname || ""}
                          invalid={
                            validation.touched.firstname &&
                            validation.errors.firstname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.firstname &&
                        validation.errors.firstname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.firstname}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Last name</Label>
                        <Input
                          name="lastname"
                          placeholder="Last name"
                          type="text"
                          className="form-control"
                          id="validationCustom02"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastname || ""}
                          invalid={
                            validation.touched.lastname &&
                            validation.errors.lastname
                              ? true
                              : false
                          }
                        />
                        {validation.touched.lastname &&
                        validation.errors.lastname ? (
                          <FormFeedback type="invalid">
                            {validation.errors.lastname}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="d-flex flex-grap gap-2 justify-content-end text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
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
                </Form> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(AddNewCarProblem)
