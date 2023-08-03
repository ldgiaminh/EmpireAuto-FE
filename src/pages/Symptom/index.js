import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

import { Name, IntendedMinute } from "./symptomlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getSymptomsLists as onGetSymptoms,
  deleteSymptoms as onDeleteSymptom,
} from "store/symptoms/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import DeleteModal from "components/Common/DeleteModal"

const SymptomLists = props => {
  //meta title
  document.title = "Danh sách triệu chứng | Empire Garage"

  const dispatch = useDispatch()

  const { symptoms } = useSelector(state => ({
    symptoms: state.symptomsLists.symptoms,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [symptom, setSymptom] = useState({
    id: "",
    name: "",
  })

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetSymptoms())
  }, [dispatch])

  /*
  ==================================================
  COLUMN
  ==================================================
  */
  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   Cell: () => {
      //     return <input type="checkbox" />
      //   },
      // },
      {
        Header: "Triệu chứng",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Thời gian kết thúc dự kiến",
        accessor: "intendedMinutes",
        filterable: true,
        Cell: cellProps => {
          return <IntendedMinute {...cellProps} />
        },
      },

      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/edit-symptom/${cellProps.row.original.id}`}
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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = (id, name) => {
    setSymptom({
      ...symptom,
      id: id,
      name: name,
    })
    console.log(symptom)
    setDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(onDeleteSymptom(symptom))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleAddNew = () => {
    props.history.push("/create-new-symptom")
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

  // const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Quản lý"
            breadcrumbItem="Danh sách các triệu chứng"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={symptoms}
                    isGlobalFilter={true}
                    isAddNew={true}
                    handleAddNewClick={handleAddNew}
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

export default withRouter(SymptomLists)
