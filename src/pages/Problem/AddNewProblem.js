import React, { useEffect, useState } from "react"
import Select from "react-select"

import {
  Button,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"

import {
  getCarsModelByBrand as onGetCarModelByBrand,
  getCarsBrand as onGetCarBrand,
  addNewCarsProblem as onAddNewCarProblem,
} from "store/actions"

const AddNewCarProblem = () => {
  const dispatch = useDispatch()

  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)

  const [problem, setProblem] = useState({
    name: "",
    modelId: "",
  })

  const { carsBrand, carsModel } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
    carsModel: state.models.carsModel,
  }))

  function handleSelectBrand(selected) {
    setSelectedBrand(selected)
    if (selected) {
      dispatch(onGetCarModelByBrand(selected.value))
      setSelectedModel(null)
    }
  }

  function handleSelectModel(selected) {
    setSelectedModel(selected)
    setProblem({
      ...problem,
      modelId: selected.value,
    })
  }

  const optionBrand = carsBrand.map(c => ({
    label: c.name,
    value: c.id,
  }))

  const handleChange = e => {
    const value = e.target.value
    setProblem({ ...problem, [e.target.name]: value })
  }

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch])

  const optionModel = carsModel.map(c => ({
    label: c.name,
    value: c.id,
  }))

  const saveProblem = e => {
    e.preventDefault()
    console.log(problem)
    dispatch(onAddNewCarProblem(problem))
    setSelectedBrand(null)
    setSelectedModel(null)
    setProblem({
      name: "",
    })
  }
  return (
    <>
      <CardTitle>Vấn đề của phương tiện</CardTitle>
      <CardSubtitle className="mb-4">Fill all information below</CardSubtitle>
      <Form onSubmit={saveProblem}>
        <FormGroup className="select2-container mb-4" row>
          <Label md="2" className="col-form-label">
            Hãng xe
          </Label>
          <Col md="10">
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
          <Label md="2" className="col-form-label">
            Chọn dòng xe
          </Label>
          <Col md="10">
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
          <Label htmlFor="billing-name" md="2" className="col-form-label">
            Tên vấn đề
          </Label>
          <Col md="10">
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
        <FormGroup row>
          <Col md="10">
            <Button color="success" className="btn btn-success mt-3">
              Xác nhận
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </>
  )
}

export default AddNewCarProblem
