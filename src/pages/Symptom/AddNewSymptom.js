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
  Label,
  Row,
} from "reactstrap"

import { Link, withRouter } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { addNewSymptoms as onAddSymptoms } from "store/actions"
import Loader from "components/Loader/Loader"

const AddNewSymptom = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { isLoading } = useSelector(state => ({
    isLoading: state.symptomsLists.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [symptom, setSymptom] = useState({
    name: "",
    intendedMinutes: "",
  })

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  const handleChange = e => {
    const value = e.target.value
    setSymptom({ ...symptom, [e.target.name]: value })
    setIsFormValid(false)
  }

  /*
  ==================================================
  SUBMIT
  ==================================================
  */

  const saveSymptom = e => {
    e.preventDefault()

    // Check if model is empty
    if (!symptom.intendedMinutes || !symptom.name) {
      setIsFormValid(true)
      return
    }

    if (symptom) {
      dispatch(onAddSymptoms(symptom, props.history))
      setIsSubmitting(true)
      setIsFormValid(false)
    }
  }

  /*
  ==================================================
  Reset Form
  ==================================================
  */

  const resetForm = () => {
    setSymptom({
      name: "",
      intendedMinutes: "",
    })
  }

  const handleReset = () => {
    resetForm()
    setIsFormValid(false)
  }

  return (
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Triệu chứng" />

        <Row style={{ justifyContent: "center", height: "490px" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Triệu chứng</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để tạo mới triệu chứng
                </CardSubtitle>
                {isFormValid ? (
                  <Alert color="danger">Vui lòng điền đầy đủ dữ liệu</Alert>
                ) : null}
                <Form onSubmit={saveSymptom}>
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="4" className="col-form-label">
                      Tên triệu chứng*
                    </Label>
                    <Col md="8">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập tên triệu chứng"
                        name="name"
                        onChange={e => handleChange(e)}
                        value={symptom.name}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="mb-4" row>
                    <Label md="4" className="col-form-label">
                      Thời gian dự kiến (phút)*
                    </Label>
                    <Col md="8">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Nhập thời gian kết thúc"
                        name="intendedMinutes"
                        onChange={e => handleChange(e)}
                        value={symptom.intendedMinutes}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(AddNewSymptom)
