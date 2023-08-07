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
import { Link, withRouter, useLocation } from "react-router-dom"

import { Name, Img, Warranty, Price, IsCell, Category } from "./CarItemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsItem as onGetCarsItem } from "store/actions"

const CarItems = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  PARAMS
  ==================================================
  */

  const location = useLocation()
  const problemName = location.state && location.state.problemName

  //meta title

  document.title = `Tất cả dịch vụ xe | Empire Garage`

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsItem } = useSelector(state => ({
    carsItem: state.items.carsItem,
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
    dispatch(onGetCarsItem())
  }, [dispatch])

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
        Header: "Nhóm",
        accessor: "category.name",
        filterable: true,
        Cell: cellProps => {
          return <Category {...cellProps} />
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
        Header: "Đang hoạt động",
        accessor: "isActived",
        filterable: true,
        Cell: cellProps => {
          return <IsCell {...cellProps} />
        },
      },
      {
        Header: "Mặc định",
        accessor: "isDefault",
        filterable: true,
        Cell: cellProps => {
          return <IsCell {...cellProps} />
        },
      },

      {
        Header: "",
        accessor: "action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/edit-item/${cellProps.row.original.id}`}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Cập nhật
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
                  Xóa
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
          <Breadcrumbs title="Quản lý" breadcrumbItem="Tất cả dịch vụ xe" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={carsItem}
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

CarItems.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarItems)
