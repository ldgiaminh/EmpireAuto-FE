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
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter, useParams } from "react-router-dom"

import { Name, Img } from "./CarItemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsItemByProblem as onGetCarsItemByProblem } from "store/actions"

const CarItem = props => {
  //meta title
  document.title = "Các dịch vụ | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  const [items, setItems] = useState([])

  const { carsItem } = useSelector(state => ({
    carsItem: state.items.carsItem,
  }))

  const {
    match: { params },
  } = props

  const { slug } = useParams()

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCarsItemByProblem(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    setItems(carsItem)
  }, [carsItem])

  useEffect(() => {
    if (!isEmpty(carsItem)) {
      setItems(carsItem)
    }
  }, [carsItem])

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
        Header: "Giá",
        accessor: "presentPrice",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      // {
      //   Header: "Các vấn đề",
      //   accessor: "view",
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return (
      //       <Button
      //         type="button"
      //         color="primary"
      //         className="btn-sm btn-rounded"
      //         onClick={() =>
      //           history.push(
      //             `/car-brands/${params.id}/${params.name}/models/${cellProps.row.original.id}/${cellProps.row.original.name}/problems`
      //           )
      //         }
      //       >
      //         Xem các dịch vụ
      //       </Button>
      //     )
      //   },
      // },

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
          <Breadcrumbs
            title="Quản lý"
            breadcrumbItem={`Danh sách các dịch vụ xe - ${slug}`}
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={items}
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
        </Container>
      </div>
    </React.Fragment>
  )
}

CarItem.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarItem)
