import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import { isEmpty, map } from "lodash"

import { Name, Img } from "./CarBrandlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsBrand as onGetCarsBrand } from "store/actions"
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter } from "react-router-dom"

const CarBrand = props => {
  //meta title
  document.title = "Các hãng xe | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  const [brands, setBrands] = useState([])

  const { carsBrand } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
  }))

  useEffect(() => {
    dispatch(onGetCarsBrand())
  }, [dispatch])

  useEffect(() => {
    setBrands(carsBrand)
  }, [carsBrand])

  useEffect(() => {
    if (!isEmpty(carsBrand)) {
      setBrands(carsBrand)
    }
  }, [carsBrand])

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />
        },
      },
      {
        Header: "Img",
        //accessor: "photo",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.photo ? (
              <div className="avatar-sm">
                <span className="avatar-title rounded">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded avatar-md"
                  src={cellProps.photo}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Các dòng xe",
        accessor: "view",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(
                  `/car-brands/${cellProps.row.original.id}/${cellProps.row.original.name}/models`
                )
              }
            >
              Xem các dòng xe
            </Button>
          )
        },
      },

      {
        Header: "",
        accessor: "action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Quản lý" breadcrumbItem="Danh sách các hãng xe" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={brands}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    // handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col lg="12">
              <div>
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap align-middle table-borderless">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{ width: "200px" }}
                          className="ms-5"
                        >
                          #
                        </th>
                        <th scope="col">Tên hãng</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {map(brands, brand => (
                        <tr key={brand.id}>
                          <td>
                            <img
                              src={brand.photo}
                              alt=""
                              className="avatar-md ms-5"
                            />
                          </td>
                          <td>
                            <h5 className="text-truncate font-size-14">
                              <Link
                                to={`/projects-overview/${brand.id}`}
                                className="text-dark"
                              >
                                {brand.name}
                              </Link>
                            </h5>
                             <p className="text-muted mb-0">
                              {project.description}
                            </p>
                          </td>

                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                href="#"
                                className="card-drop"
                                tag="i"
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem
                                  href="#"
                                  onClick={() => handleProjectClick(project)}
                                >
                                  <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  href="#"
                                  onClick={() => onClickDelete(project)}
                                >
                                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                                  Delete
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>  */}
        </Container>
      </div>
    </React.Fragment>
  )
}

CarBrand.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(CarBrand)
