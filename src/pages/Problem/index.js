import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
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

import { Name, Symptoms, IntendedMinutes } from "./CarProblemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsProblemByModel as onGetCarsProblemByModel } from "store/actions"

const CarProblem = props => {
  //meta title
  document.title = "Các dòng xe | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  const [problems, setProblems] = useState([])

  const { carsProblem } = useSelector(state => ({
    carsProblem: state.problems.carsProblem,
  }))

  const {
    match: { params },
  } = props

  console.log(params)

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCarsProblemByModel(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    setProblems(carsProblem)
  }, [carsProblem])

  useEffect(() => {
    if (!isEmpty(carsProblem)) {
      setProblems(carsProblem)
    }
  }, [carsProblem])

  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   Cell: () => {
      //     return <input type="checkbox" />
      //   },
      // },

      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      // {
      //   Header: "Triệu chứng",
      //   accessor: "symptom.name",
      //   filterable: true,
      //   Cell: cellProps => {
      //     return <Symptoms {...cellProps} />
      //   },
      // },
      {
        Header: "Thời gian dự kiến (phút)",
        accessor: "intendedMinutes",
        filterable: true,
        Cell: cellProps => {
          return <IntendedMinutes {...cellProps} />
        },
      },
      {
        Header: "Các dịch vụ đi kèm",
        accessor: "view",
        disableFilters: true,
        Cell: cellProps => {
          const { id, name } = cellProps.row.original
          const formattedName = slugify(name, { lower: true })

          const paramss = {
            brandId: params.id,
            brandName: "brand_name_value",
            modelId: "model_id_value",
            modelName: "slug_value",
            problemId: id,
            formattedName: formattedName,
          }
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(
                  `/brands/${params.id}/${params.name}/models/${params.id}/${params.name}/problems/${id}/${formattedName}/items?brandId=${brandId}&brandName=${brandName}`
                )
              }
            >
              Xem các dịch vụ
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
          <Breadcrumbs
            title="Quản lý"
            breadcrumbItem={`Các vấn đề xe - ${params.name}`}
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={problems}
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

CarProblem.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarProblem)
