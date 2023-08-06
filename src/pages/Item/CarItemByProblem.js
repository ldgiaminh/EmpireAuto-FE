import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import { isEmpty, map } from "lodash"
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter } from "react-router-dom"

import {
  Name,
  Img,
  Warranty,
  Price,
  isDefault,
  IsDefaultProblem,
} from "./CarItemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsItemByProblem as onGetCarsItemByProblem } from "store/actions"

const CarItemByProblem = props => {
  const dispatch = useDispatch()

  const {
    match: { params },
  } = props

  //meta title
  useEffect(() => {
    if (params) {
      document.title = `Dịch vụ ${
        params.pName.charAt(0).toUpperCase() + params.pName.slice(1)
      } | Empire Garage`
    } else {
      document.title = "Empire Garage"
    }
  })

  /*
  ==================================================
  REVERT SLUGIFY
  ==================================================
  */

  // const revertSlug = slug => {
  //   return slug
  //     .toLowerCase()
  //     .split("-")
  //     .map(i => i[0].toUpperCase() + i.substr(1))
  //     .join(" ")
  // }

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsItemByProblem } = useSelector(state => ({
    carsItemByProblem: state.items.carsItemByProblem,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [items, setItems] = useState({
    id: "",
    name: "",
  })

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    if (params && params.pId) {
      dispatch(onGetCarsItemByProblem(params.pId))
    }
  }, [params, dispatch])

  console.log(carsItemByProblem)

  /*
  ==================================================
  COLUMN
  ==================================================
  */
  const columns = useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row }) => {
          return <span className="text-align-center">{row.index + 1}</span>
        },
      },
      {
        Header: "Hình ảnh",
        accessor: "photo",
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
        Header: "Tên dịch vụ",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Giá tiền",
        accessor: "presentPrice",
        filterable: true,
        Cell: cellProps => {
          return <Price {...cellProps} />
        },
      },
      {
        Header: "Bảo hành",
        accessor: "warranty",
        filterable: true,
        Cell: cellProps => {
          return <Warranty {...cellProps} />
        },
      },
      {
        Header: "Mặc định",
        accessor: "isDefault",
        filterable: true,
        Cell: cellProps => {
          return <IsDefaultProblem {...cellProps} />
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

  /*
  ==================================================
  ADD NEW
  ==================================================
  */

  const handleAddNew = () => {
    props.history.push("/create-new-item")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Quản lý"
            breadcrumbItem={`Dịch vụ vấn đề - ${params.pName}`}
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={carsItemByProblem}
                    isGlobalFilter={true}
                    isAddNew={true}
                    isAddFileExcel={true}
                    handleAddNewClick={handleAddNew}
                    handleAddFileExcelClick={handleAddNew}
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

CarItemByProblem.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarItemByProblem)
