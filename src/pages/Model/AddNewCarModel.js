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
  getCarsBrand as onGetCarBrand,
  addNewCarsModel as onAddNewCarModel,
} from "store/actions"

const AddNewCarModel = () => {
  const dispatch = useDispatch()

  const [selectedGroup, setSelectedGroup] = useState(null)

  const [model, setModel] = useState({
    name: "",
    brandId: "",
  })

  function handleSelectGroup(selected) {
    setSelectedGroup(selected)
    setModel({
      ...model,
      brandId: selected.value,
    })
  }

  const { carsBrand } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
  }))

  const handleChange = e => {
    const value = e.target.value
    setModel({ ...model, [e.target.name]: value })
  }

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch])

  const optionGroup = carsBrand.map(c => ({
    label: c.name,
    value: c.id,
  }))

  const saveModel = e => {
    e.preventDefault()
    console.log(model)
    dispatch(onAddNewCarModel(model))
  }
  return (
    <div>
      <CardTitle>Dòng xe</CardTitle>
      <CardSubtitle className="mb-4">Fill all information below</CardSubtitle>
      <Form onSubmit={saveModel}>
        <FormGroup className="select2-container mb-4" row>
          <Label md="2" className="col-form-label">
            Hãng xe
          </Label>
          <Col md="10">
            <Select
              value={selectedGroup}
              onChange={s => {
                handleSelectGroup(s)
              }}
              options={optionGroup}
              placeholder="Select States"
              classNamePrefix="select2-selection"
            />
          </Col>
        </FormGroup>
        <FormGroup className="mb-4" row>
          <Label htmlFor="billing-name" md="2" className="col-form-label">
            Tên dòng xe
          </Label>
          <Col md="10">
            <input
              className="form-control"
              type="text"
              placeholder="Nhập tên hãng"
              name="name"
              onChange={e => handleChange(e)}
              value={model.name}
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
    </div>
  )
}

export default AddNewCarModel
