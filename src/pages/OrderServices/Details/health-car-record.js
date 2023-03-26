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

        <h6 className="font-size-15 fw-medium mt-4 mb-3">
          Kết quả chuẩn đoán :
        </h6>

        <p className="mb-4">{record.symptom}</p>

        <h6 className="font-size-15 fw-medium mt-4 mb-4"> Dịch vụ gợi ý :</h6>

        <Row className="mb-3">
          <Col md="12">
            {record.healthCarRecordProblems &&
              record.healthCarRecordProblems.map(problems => (
                <div key={problems.problem.id} className="mb-4">
                  <h6 className="mb-3">
                    <i className="fa fa-caret-right font-size-15 align-middle text-primary me-2" />
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
      </CardBody>
    </React.Fragment>
  )
}

export default CarRecord
