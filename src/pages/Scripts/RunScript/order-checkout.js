import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import {
  Row,
  Col,
  CardTitle,
  CardBody,
  FormFeedback,
  Label,
  Input,
  Table,
  Form,
  InputGroup,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { runScriptCheckOut as onRunScriptCheckOut } from "store/actions"

const OrderCheckOut = () => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { scriptCheckOut, isLoadScript } = useSelector(state => ({
    scriptCheckOut: state.scripts.scriptCheckOut,
    isLoadScript: state.scripts.isLoadScript,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [orders, setOrders] = useState([])
  const [countSuccess, setCountSuccess] = useState(0)
  const [countFail, setCountFail] = useState(0)

  /*
  ==================================================
  COUNT SUCCESS & FAILURE
  ==================================================
  */

  useEffect(() => {
    setOrders(scriptCheckOut)

    // Count the number of successes and failures
    const successCount = scriptCheckOut.filter(o => o.statusCode === 200).length
    const failCount = scriptCheckOut.filter(o => o.statusCode === 500).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptCheckOut])

  /*
  ==================================================
  FORM
  ==================================================
  */

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      number: 0,
    },
    validationSchema: Yup.object().shape({
      number: Yup.number().required("Chỉ nhập số"),
    }),
    onSubmit: values => {
      dispatch(onRunScriptCheckOut(values.number))
    },
  })

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">CHECK-OUT PHƯƠNG TIỆN</CardTitle>

        <Form
          className="row gy-2 gx-3 mt-3"
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
              <div className="input-group-text">Check-Out</div>
              <Input
                type="text"
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
            <button type="submit" className="btn btn-primary btn-label">
              <i className="bx  bx-log-out-circle font-size-18 label-icon"></i>{" "}
              Check Out
            </button>
          </div>
        </Form>

        <hr className="my-4" />

        {isLoadScript && (
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <h5 className="text-primary">
                  <i className="bx bx-loader bx-spin me-2" />
                  Đang check-out {validationType.values.number} phương tiện
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

            <div className="table-responsive">
              <Table className="table-nowrap table-borderless">
                <tbody>
                  {orders.map((o, index) => (
                    <tr key={index}>
                      <td className="font-size-14 text-center">{index + 1}</td>
                      {o.statusCode === 200 ? (
                        <td className="font-size-14">
                          Check-out thành công{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carLisenceNo}{" "}
                          |{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carBrand}
                        </td>
                      ) : (
                        <td className="font-size-14">
                          Check-out thất bại{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carLisenceNo}{" "}
                          |{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carBrand}
                        </td>
                      )}
                      <td className="text-end">
                        {o.statusCode === 200 ? (
                          <strong className="badge badge-soft-success rounded-pill font-size-13">
                            Thành công
                          </strong>
                        ) : (
                          <strong className="badge badge-soft-danger rounded-pill font-size-13">
                            Thất bại
                          </strong>
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

export default OrderCheckOut
