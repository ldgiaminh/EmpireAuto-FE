import React from "react"
import { Button, CardBody, CardSubtitle, CardTitle, Col, Row } from "reactstrap"

const CarRecord = ({ record }) => {
  return (
    <React.Fragment>
      <CardBody className="mt-4">
        <CardTitle>CHUẨN ĐOÁN TỪ KỸ THUẬT VIÊN</CardTitle>
        <CardSubtitle className="text-muted">
          Thông tin chi tiết ghi nhận các tình trạng xe kèm chuẩn đoán của kỹ
          thuật viên dịch vụ
        </CardSubtitle>

        <Row>
          <h6 className="font-size-15 fw-medium mt-4">
            <i className="fa fa-caret-right font-size-15 align-middle text-primary me-2" />
            Kết quả chuẩn đoán :
          </h6>

          <p className="mb-3">{record.symptom}</p>

          <h6 className="font-size-15 mt-4 fw-medium  mb-4">
            <i className="fa fa-caret-right font-size-15 align-middle text-primary me-2" />
            Dịch vụ gợi ý :
          </h6>

          <Row className="mb-3">
            <Col md="12">
              {record.healthCarRecordProblems &&
                record.healthCarRecordProblems.map(problems => (
                  <div key={problems.problem.id} className="mb-4">
                    <h6 className="mb-3 font-size-13">
                      <i className="mdi mdi-chevron-right font-size-15 text-primary me-1" />
                      {problems.problem.name}
                    </h6>
                    {problems.problem.items &&
                      problems.problem.items.map(item => (
                        <ul key={item.id}>
                          <li className="py-1">
                            {item.name +
                              ":  " +
                              item.presentPrice.toLocaleString() +
                              "đ"}
                          </li>
                        </ul>
                      ))}
                  </div>
                ))}
            </Col>
          </Row>
        </Row>
      </CardBody>
    </React.Fragment>
  )
}

export default CarRecord
