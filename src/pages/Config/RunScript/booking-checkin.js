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

import { runScriptCheckIn as onRunScriptCheckIn } from "store/actions"

const BookingCheckInScript = () => {
  const dispatch = useDispatch()

  const { scriptCheckIn, isLoadScript } = useSelector(state => ({
    scriptCheckIn: state.scripts.scriptCheckIn,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [bookings, setBookings] = useState([])

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
      dispatch(onRunScriptCheckIn(values.number))
      setIsSubmitting(false)
    },
  })

  useEffect(() => {
    setBookings(scriptCheckIn)

    const successCount = scriptCheckIn.filter(o => o.statusCode === 200).length
    const failCount = scriptCheckIn.filter(o => o.statusCode === 500).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptCheckIn])

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">CHECK-IN ĐẶT LỊCH</CardTitle>

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
              <div className="input-group-text">Số đặt lịch</div>
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
              <i className="bx bx-log-in-circle label-icon"></i> Check-In
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
                  Đang check-in {validationType.values.number} đặt lịch
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoadScript && (
          <>
            {bookings.length > 0 && (
              <strong>
                Có {countSuccess} thành công và {countFail} thất bại
              </strong>
            )}
            <div className="table-responsive">
              <Table className="table-nowrap table-borderless">
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td className="font-size-14 text-center">{index + 1}</td>
                      {booking.statusCode === 200 ? (
                        <td className="font-size-14">
                          Check-in thành công với mã #{booking.result.code}
                        </td>
                      ) : (
                        <td className="font-size-14">
                          {booking.result.error.message}
                        </td>
                      )}
                      <td className="text-end">
                        {booking.statusCode === 200 ? (
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

export default BookingCheckInScript
