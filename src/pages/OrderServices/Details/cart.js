import React, { useState } from "react"
import { Link } from "react-router-dom"
import "toastr/build/toastr.min.css"

import { Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap"

import noImg from "../../../assets/images/no-image.png"

//Lightbox
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

const Cart = ({ details, services }) => {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpenImg, setIsOpenImg] = useState(false)

  const provisional =
    services.reduce((acc, service) => acc + service.price, 0) +
    details.prepaidFromBooking

  const total = services.reduce((acc, service) => acc + service.price, 0)

  return (
    <React.Fragment>
      {isOpenImg ? (
        services && services[0].images.length > 1 ? (
          <Lightbox
            mainSrc={services[0].images[photoIndex].img}
            nextSrc={
              services[0].images[(photoIndex + 1) % services[0].images.length]
                .img
            }
            prevSrc={
              services[0].images[
                (photoIndex + services[0].images.length - 1) %
                  services[0].images.length
              ].img
            }
            onCloseRequest={() => {
              setIsOpenImg(false)
            }}
            onMovePrevRequest={() => {
              setPhotoIndex(
                (photoIndex + services[0].images.length - 1) %
                  services[0].images.length
              )
            }}
            onMoveNextRequest={() => {
              setPhotoIndex((photoIndex + 1) % services[0].images.length)
            }}
            imageCaption={"Hình " + parseFloat(photoIndex + 1)}
          />
        ) : (
          <Lightbox
            mainSrc={services && services[0].images[photoIndex].img}
            enableZoom={true}
            onCloseRequest={() => {
              setIsOpenImg(false)
            }}
          />
        )
      ) : null}
      <Row>
        <Col xl="4">
          <Card>
            <CardBody>
              <CardTitle className="mb-3">Tổng hóa đơn</CardTitle>

              <div className="table-responsive">
                <Table className="table mb-0">
                  <tbody>
                    {services &&
                      services.map((service, index) => (
                        <tr key={index}>
                          <td>
                            {service.item.name !== null
                              ? service.item.name
                              : ""}
                            :
                          </td>
                          <td className="text-end">
                            {service.price.toLocaleString()}đ
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td>Phí kiểm tra :</td>
                      <td className="text-end">
                        {details.prepaidFromBooking.toLocaleString()}đ
                      </td>
                    </tr>
                    {/* <tr>
                      <th>Tạm tính :</th>
                      <th style={{ textAlign: "right" }}>
                        {provisional.toLocaleString()}đ
                      </th>
                    </tr>
                    <tr>
                      <td className="text-danger">Phí đặt lịch :</td>
                      <td
                        className="text-danger"
                        style={{ textAlign: "right" }}
                      >
                        - {details.prepaidFromBooking.toLocaleString()}đ
                      </td>
                    </tr> */}
                    <tr>
                      <th>Tổng cộng :</th>
                      <th style={{ textAlign: "right" }}>
                        {provisional.toLocaleString()}đ
                      </th>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
        {details.status >= 4 ? (
          <Col xl="8">
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <CardTitle className="mb-3">
                    Ghi chú từ kỹ thuật viên
                  </CardTitle>
                  <Table className="table align-middle mb-0 table-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Hình ảnh</th>
                        <th>Dịch vụ</th>
                        <th>Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map(service => (
                        <tr key={service.id}>
                          {service.images.length > 0 ? (
                            <td>
                              <img
                                src={service.images[0].img}
                                alt="expert-img"
                                title="expert-img"
                                className="avatar-md"
                                onClick={() => {
                                  setIsOpenImg(true)
                                  setPhotoIndex(0)
                                }}
                              />
                            </td>
                          ) : (
                            <td>
                              <img
                                src={noImg}
                                alt="no-img"
                                title="no-img"
                                className="avatar-md"
                              />
                            </td>
                          )}
                          <td>
                            <h5 className="font-size-14 text-truncate">
                              <Link to="#" className="text-dark">
                                {service.item.name}
                              </Link>
                            </h5>
                            <p className="mb-0">{service.item.problem.name}</p>
                          </td>
                          {/* <td>{service.price.toLocaleString()}đ</td> */}
                          {service.note !== null ? (
                            <td
                              style={{
                                whiteSpace: "normal",
                              }}
                            >
                              {service.note}
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </React.Fragment>
  )
}

export default Cart
