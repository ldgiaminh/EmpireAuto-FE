import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import {
  Row,
  Col,
  Form,
  InputGroup,
  CardTitle,
  CardBody,
  FormFeedback,
  Label,
  Input,
  Table,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { runScriptDiagnose as onRunScriptDiagnose } from "store/actions"

const OrderDiagnose = () => {
  const dispatch = useDispatch()

  const { scriptDiagnose, isLoadScript } = useSelector(state => ({
    scriptDiagnose: state.scripts.scriptDiagnose,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [orders, setOrders] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [countSuccess, setCountSuccess] = useState(0)
  const [countFail, setCountFail] = useState(0)

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      number: "",
    },
    validationSchema: Yup.object().shape({
      number: Yup.number().required("Chỉ nhập số"),
    }),
    onSubmit: values => {
      dispatch(onRunScriptDiagnose(values.number))
      setIsSubmitting(false)
    },
  })

  useEffect(() => {
    setOrders(scriptDiagnose)

    // Count the number of successes and failures
    const successCount = scriptDiagnose.filter(o => o.statusCode === 200).length
    const failCount = scriptDiagnose.filter(o => o.statusCode === 500).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptDiagnose])

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">CHẨN ĐOÁN</CardTitle>

        <Form
          className="row gy-2 gx-3 align-items-center mt-3"
          onSubmit={e => {
            e.preventDefault()
            validationType.handleSubmit()
            return false
          }}
        >
          <div className="col-sm-5">
            <Label
              className="visually-hidden"
              htmlFor="autoSizingInputGroup"
            ></Label>
            <InputGroup>
              <div className="input-group-text">Số phương tiện</div>
              <Input
                type="number"
                className="form-control"
                id="autoSizingInputGroup"
                name="number"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.number || ""}
                invalid={
                  validationType.touched.number && validationType.errors.number
                    ? true
                    : false
                }
              />
              {validationType.touched.number && validationType.errors.number ? (
                <FormFeedback type="invalid">
                  {validationType.errors.number}
                </FormFeedback>
              ) : null}
            </InputGroup>
          </div>
          <div className="col-sm-5">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-label"
            >
              <i className="bx bx bx-pencil label-icon"></i> Chẩn đoán
            </button>
          </div>
        </Form>

        <hr className="my-4" />
        {isLoadScript && (
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <h5 className="text-primary">
                  <i className="bx bx-hourglass bx-spin me-2" />
                  Đang chẩn đoán {validationType.values.number} phương tiện
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoadScript && (
          <>
            {orders.length > 0 && (
              <strong>
                Có {countSuccess} thành công và {countFail} thất bại
              </strong>
            )}
            <div className="table-responsive mt-3">
              <Table className="table-nowrap table-borderless">
                <tbody>
                  {orders.map((o, index) => (
                    <tr key={index}>
                      <td className="font-size-14 text-center">{index + 1}</td>
                      {o.statusCode === 200 ? (
                        <td className="font-size-14">
                          Chẩn đoán thành công {o.result.car.carLisenceNo}
                        </td>
                      ) : (
                        <td className="font-size-14">
                          Chẩn đoán thất bại {o.result.car.carLisenceNo}
                        </td>
                      )}
                      <td className="text-end">
                        {o.statusCode === 200 ? (
                          <span className="badge badge-soft-success rounded-pill font-size-13">
                            Thành công
                          </span>
                        ) : (
                          <span className="badge badge-soft-danger rounded-pill font-size-13">
                            Thất bại
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </CardBody>
    </React.Fragment>
  )
}

export default OrderDiagnose
