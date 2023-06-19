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

import { runScriptBooking as onRunScriptBooking } from "store/actions"

const BookingScript = () => {
  const dispatch = useDispatch()

  const { scriptBooking, isLoadScript } = useSelector(state => ({
    scriptBooking: state.scripts.scriptBooking,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [bookings, setBookings] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

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
      dispatch(onRunScriptBooking(values.number))
      setIsSubmitting(false)
    },
  })

  useEffect(() => {
    setBookings(scriptBooking)
  }, [scriptBooking])

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">TẠO ĐẶT LỊCH</CardTitle>

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
              className="btn btn-primary w-md"
            >
              Chạy script
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
                  Đang khởi tạo {validationType.values.number} đặt lịch
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoadScript && (
          <div className="table-responsive">
            <Table className="table-nowrap table-borderless">
              {/* <thead>
              <tr>
                <th style={{ width: "70px" }}>Số</th>
                <th>Nội dung</th>
                <th className="text-end">Trạng thái</th>
              </tr>
            </thead> */}
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="font-size-14 text-center">{index + 1}</td>
                    {booking.statusCode === 201 ? (
                      <td className="font-size-14">
                        Đặt lịch thành công với mã #{booking.result.code}
                      </td>
                    ) : (
                      <td className="font-size-14">
                        Đặt lịch thất bại vì xe{" "}
                        {booking.result.relativeObject?.carLisenceNo} |{" "}
                        {booking.result.relativeObject?.carBrand} |{" "}
                        {booking.result.relativeObject?.carModel} đang ở garage
                      </td>
                    )}
                    <td className="text-end">
                      {booking.statusCode === 201 ? (
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
        )}
      </CardBody>
    </React.Fragment>
  )
}

export default BookingScript
