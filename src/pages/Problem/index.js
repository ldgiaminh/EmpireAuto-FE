import React, { useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap"
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter } from "react-router-dom"

import { Name, Symptoms, IntendedMinutes } from "./CarProblemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  getCarsProblem as onGetCarsProblem,
  deleteCarsProblem as onDeleteProblem,
} from "store/actions"
import DeleteModal from "components/Common/DeleteModal"

const CarProblems = props => {
  //meta title
  document.title = "Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsProblem } = useSelector(state => ({
    carsProblem: state.problems.carsProblem,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [problem, setProblem] = useState({
    id: "",
    name: "",
  })

  //delete
  const [deleteModal, setDeleteModal] = useState(false)

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetCarsProblem())
  }, [, dispatch])

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
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Triệu chứng",
        accessor: "symptom.name",
        filterable: true,
        Cell: cellProps => {
          return <Symptoms {...cellProps} />
        },
      },
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

          //   const paramss = {
          //     brandId: params.id,
          //     brandName: "brand_name_value",
          //     modelId: "model_id_value",
          //     modelName: "slug_value",
          //     problemId: id,
          //     formattedName: formattedName,
          //   }
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              //   onClick={() =>
              //     history.push(
              //       `/brands/${params.id}/${params.name}/models/${params.id}/${params.name}/problems/${id}/${formattedName}/items?brandId=${brandId}&brandName=${brandName}`
              //     )
              //   }
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
                to={`/edit-problem/${cellProps.row.original.id}`}
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
                  const id = cellProps.row.original.id
                  const name = cellProps.row.original.name
                  onClickDelete(id, name)
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
  DELETE
  ==================================================
  */

  const onClickDelete = (id, name) => {
    setProblem({
      ...problem,
      id: id,
      name: name,
    })
    setDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(onDeleteProblem(problem))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  /*
  ==================================================
  ADD NEW
  ==================================================
  */

  const handleAddNew = () => {
    props.history.push("/create-new-problem")
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Quản lý"
            breadcrumbItem="Tất cả vấn đề của các xe"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={carsProblem}
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

CarProblems.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarProblems)
