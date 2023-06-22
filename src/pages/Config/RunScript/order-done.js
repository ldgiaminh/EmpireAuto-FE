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

import { runScriptDone as onRunScriptDone } from "store/actions"

const OrderDone = () => {
  const dispatch = useDispatch()

  const { scriptDone, isLoadScript } = useSelector(state => ({
    scriptDone: state.scripts.scriptDone,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [orders, setOrders] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [idList, setIdList] = useState([])

  const [countSuccess, setCountSuccess] = useState(0)
  const [countFail, setCountFail] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("scriptConfirmPaid")) {
      const obj = JSON.parse(localStorage.getItem("scriptConfirmPaid"))
      setIdList(obj)
    }
  }, [localStorage.getItem("scriptConfirmPaid")])

  useEffect(() => {
    setOrders(scriptDone)

    // Count the number of successes and failures
    const successCount = scriptDone.filter(o => o.statusCode === 200).length
    const failCount = scriptDone.filter(o => o.statusCode === 500).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptDone])

  const handleDone = () => {
    const data = idList.map(il => il.orderServiceId)
    dispatch(onRunScriptDone(data))
    setIsSubmitting(true)
  }

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">HOÀN TẤT DỊCH VỤ</CardTitle>

        <div className="row gy-2 gx-3 align-items-center mt-3">
          <div className="col-sm-5">
            <button
              disabled={isSubmitting}
              type="button"
              className="btn btn-primary btn-label"
              onClick={handleDone}
            >
              <i className="bx bx-badge-check font-size-18 label-icon"></i> Hoàn
              tất
            </button>
          </div>
        </div>

        <hr className="my-4" />
        {isLoadScript && (
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <h5 className="text-primary">
                  <i className="bx bx-hourglass bx-spin me-2" />
                  Đang hoàn tất các dịch vụ
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
                          Hoàn tất thành công {o.information.car.carLisenceNo} |{" "}
                          {o.information.car.carBrand}
                        </td>
                      ) : (
                        <td className="font-size-14">{o.result.message}</td>
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

export default OrderDone
