import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
} from "reactstrap"

import classnames from "classnames"

//Simple bar
import SimpleBar from "simplebar-react"

//redux
import { useSelector, useDispatch } from "react-redux"

import { onSearchAll } from "store/actions"

const Search = props => {
  const { searchResults } = useSelector(state => ({
    searchResults: state.Dashboard.searchResults,
  }))

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("1")

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  /*
  ==================================================
  PRAMS (ID) & useEffect
  ==================================================
  */
  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.string) {
      dispatch(onSearchAll(params.string))
    }
  }, [params, onSearchAll])

  //meta title
  useEffect(() => {
    if (params && params.string) {
      document.title = `Tìm kiếm "${params.string}" | Empire Garage`
    }
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">
                    Kết quả cho tìm kiếm " {params.string} "
                  </h4>

                  <div className="mt-4">
                    <Table className="table table-nowrap align-middle table-hover mb-0">
                      {searchResults &&
                        searchResults.map(r => (
                          <tbody key={r.type}>
                            {r.results.map((result, i) => (
                              <tr key={i}>
                                {r.type === 0 && (
                                  <>
                                    <td style={{ width: "400px" }}>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        <Link to="#" className="text-dark">
                                          #{result.code} -{" "}
                                          {result.car.carLisenceNo}
                                        </Link>
                                      </h5>
                                      <p className="text-muted mb-0">
                                        {result.car.carBrand} |{" "}
                                        {result.car.carModel}
                                      </p>
                                    </td>
                                    <td style={{ width: "400px" }}>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        <Link to="#" className="text-dark">
                                          {result.order.user.fullname}
                                        </Link>
                                      </h5>
                                      <p className="text-muted mb-0">
                                        {result.order.user.phone}
                                      </p>
                                    </td>
                                    <td>
                                      {/* <h5 className="text-truncate font-size-14 mb-1">
                                            <Link to="#" className="text-dark">
                                              {result.order.user.fullname}
                                            </Link>
                                          </h5> */}
                                      <p className="text-muted mb-0">
                                        Đang chẩn đoán
                                      </p>
                                    </td>
                                    <td style={{ width: "90px" }}>
                                      <div>
                                        <ul className="list-inline mb-0 font-size-16">
                                          <li className="list-inline-item">
                                            <Link
                                              to={`/order-services/${result.id}`}
                                              className="text-primary p-1"
                                            >
                                              <i className="mdi mdi-eye" />
                                            </Link>
                                          </li>
                                          {/* <li className="list-inline-item">
                                                <Link
                                                  to="#"
                                                  className="text-danger p-1"
                                                >
                                                  <i className="bx bxs-trash" />
                                                </Link>
                                              </li> */}
                                        </ul>
                                      </div>
                                    </td>
                                  </>
                                )}
                                {r.type === 1 && (
                                  <>
                                    <td style={{ width: "400px" }}>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        <Link to="#" className="text-dark">
                                          #{result.code} -{" "}
                                          {result.car.carLisenceNo}
                                        </Link>
                                      </h5>
                                      <p className="text-muted mb-0">
                                        {result.car.carBrand} |{" "}
                                        {result.car.carModel}
                                      </p>
                                    </td>
                                    <td style={{ width: "400px" }}>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        <Link to="#" className="text-dark">
                                          {result.user.fullname}
                                        </Link>
                                      </h5>
                                      <p className="text-muted mb-0">
                                        {result.user.phone}
                                      </p>
                                    </td>
                                    <td>
                                      {/* <h5 className="text-truncate font-size-14 mb-1">
                                            <Link to="#" className="text-dark">
                                              {result.order.user.fullname}
                                            </Link>
                                          </h5> */}
                                      <p className="text-muted mb-0">
                                        Còn 4 ngày
                                      </p>
                                    </td>
                                    <td style={{ width: "90px" }}>
                                      <div>
                                        <ul className="list-inline mb-0 font-size-16">
                                          <li className="list-inline-item">
                                            <Link
                                              to={`/bookings/${result.id}`}
                                              className="text-primary p-1"
                                            >
                                              <i className="mdi mdi-eye" />
                                            </Link>
                                          </li>
                                          {/* <li className="list-inline-item">
                                                <Link
                                                  to="#"
                                                  className="text-danger p-1"
                                                >
                                                  <i className="bx bxs-trash" />
                                                </Link>
                                              </li> */}
                                        </ul>
                                      </div>
                                    </td>
                                  </>
                                )}
                                {r.type === 2 && (
                                  <>
                                    <td>
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        <Link to="#" className="text-dark">
                                          {result.fullname}
                                        </Link>
                                      </h5>
                                      <p className="text-muted mb-0">
                                        {result.phone}
                                      </p>
                                    </td>
                                    <td style={{ width: "90px" }}>
                                      <div>
                                        <ul className="list-inline mb-0 font-size-16">
                                          <li className="list-inline-item">
                                            <Link
                                              to="#"
                                              className="text-primary p-1"
                                            >
                                              <i className="mdi mdi-eye" />
                                            </Link>
                                          </li>
                                          {/* <li className="list-inline-item">
                                                <Link
                                                  to="#"
                                                  className="text-danger p-1"
                                                >
                                                  <i className="bx bxs-trash" />
                                                </Link>
                                              </li> */}
                                        </ul>
                                      </div>
                                    </td>
                                  </>
                                )}
                                {/* Add more conditions for other types if needed */}
                              </tr>
                            ))}
                          </tbody>
                        ))}
                    </Table>
                  </div>
                </CardBody>

                {/* <div className="card-footer bg-transparent border-top">
                  <div className="text-center">
                    <Link to="#" className="btn btn-primary ">
                      {" "}
                      Add new Task
                    </Link>
                  </div>
                </div> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Col xl="12"></Col>
    </React.Fragment>
  )
}

export default Search
