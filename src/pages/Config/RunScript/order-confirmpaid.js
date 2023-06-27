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

import { runScriptConfirmPaid as onRunScriptConfirmPaid } from "store/actions"

const OrderConfirmPaid = () => {
  const dispatch = useDispatch()

  const { scriptConfirmPaid, isLoadScript } = useSelector(state => ({
    scriptConfirmPaid: state.scripts.scriptConfirmPaid,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [orders, setOrders] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [idList, setIdList] = useState([])
  const [confirmAll, setConfirmAll] = useState(false)

  const [countSuccess, setCountSuccess] = useState(0)
  const [countFail, setCountFail] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("scriptDiagnose")) {
      const obj = JSON.parse(localStorage.getItem("scriptDiagnose"))
      setIdList(obj)
    }
  }, [localStorage.getItem("scriptDiagnose")])

  useEffect(() => {
    setOrders(scriptConfirmPaid)

    // Count the number of successes and failures
    const successCount = scriptConfirmPaid.filter(
      o => o.statusCode === 200
    ).length
    const failCount = scriptConfirmPaid.filter(o => o.statusCode === 500).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptConfirmPaid])

  const handleConfirmPaid = () => {
    const idOr = idList.map(il => il.result.id)
    const data = {
      listOrderServices: idOr,
      confirmAll: confirmAll,
    }
    dispatch(onRunScriptConfirmPaid(data))
    setIsSubmitting(true)
  }

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">XÁC NHẬN & THANH TOÁN</CardTitle>

        <div className="row gy-2 gx-3 mt-3">
          <div className="col-sm-2">
            <Input
              type="checkbox"
              className="form-check-Input me-2"
              id="horizontal-customCheck"
              onChange={() => setConfirmAll(!confirmAll)}
              value={confirmAll}
            />
            <Label
              className="form-check-label"
              htmlFor="horizontal-customCheck"
            >
              Tất cả
            </Label>
          </div>
          <div className="col-sm-5">
            <button
              disabled={isSubmitting}
              type="button"
              className="btn btn-primary btn-label"
              onClick={handleConfirmPaid}
            >
              <i className="fa fa-money-bill-wave font-size-12 label-icon"></i>{" "}
              Xác nhận - Thanh Toán
            </button>
          </div>
        </div>

        <hr className="my-4" />
        {isLoadScript && (
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <h5 className="text-primary">
                  <i className="bx bx-loader bx-spin me-2" />
                  Đang xác nhận & thanh toán các hóa đơn
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
                          Xác nhận & Thánh toán thành công #{o.result.code}
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

export default OrderConfirmPaid
