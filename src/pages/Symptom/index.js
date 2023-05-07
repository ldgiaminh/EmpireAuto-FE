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

import { getSymptomsLists as onGetSymptoms } from "store/symptoms/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const SymptomLists = props => {
  //meta title
  document.title = "Danh sách triệu chứng | Empire Garage"

  const dispatch = useDispatch()
  const [symptom, setSymptom] = useState()
  // validation
  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     name: (contact && contact.name) || "",
  //     designation: (contact && contact.designation) || "",
  //     tags: (contact && contact.tags) || "",
  //     email: (contact && contact.email) || "",
  //     projects: (contact && contact.projects) || "",
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Please Enter Your Name"),
  //     designation: Yup.string().required("Please Enter Your Designation"),
  //     tags: Yup.array().required("Please Enter Tag"),
  //     email: Yup.string().required("Please Enter Your Email"),
  //     projects: Yup.number().required("Please Enter Your Project"),
  //   }),
  //   onSubmit: values => {
  //     if (isEdit) {
  //       const updateUser = {
  //         id: contact.id,
  //         name: values.name,
  //         designation: values.designation,
  //         tags: values.tags,
  //         email: values.email,
  //         projects: values.projects,
  //       }

  //       // update user
  //       dispatch(onUpdateUser(updateUser))
  //       validation.resetForm()
  //       setIsEdit(false)
  //     } else {
  //       const newUser = {
  //         id: Math.floor(Math.random() * (30 - 20)) + 20,
  //         name: values["name"],
  //         designation: values["designation"],
  //         email: values["email"],
  //         tags: values["tags"],
  //         projects: values["projects"],
  //       }
  //       // save new user
  //       dispatch(onAddNewUser(newUser))
  //       validation.resetForm()
  //     }
  //     toggle()
  //   },
  // })

  const { symptoms } = useSelector(state => ({
    symptoms: state.symptomsLists.symptoms,
  }))

  const [isEdit, setIsEdit] = useState(false)

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
                to="#"
                className="text-success"
                // onClick={() => {
                //   const userData = cellProps.row.original
                //   handleUserClick(userData)
                // }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                // onClick={() => {
                //   const userData = cellProps.row.original
                //   onClickDelete(userData)
                // }}
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

  useEffect(() => {
    dispatch(onGetSymptoms())
  }, [dispatch])

  useEffect(() => {
    setSymptom(symptoms)
  }, [symptoms])

  useEffect(() => {
    if (!isEmpty(symptoms)) {
      setSymptom(symptoms)
    }
  }, [symptoms])

  // const toggle = () => {
  //   setModal(!modal)
  // }

  // const handleUserClick = arg => {
  //   const user = arg

  //   setContact({
  //     id: user.id,
  //     name: user.name,
  //     designation: user.designation,
  //     email: user.email,
  //     tags: user.tags,
  //     projects: user.projects,
  //   })
  //   setIsEdit(true)

  //   toggle()
  // }

  // var node = useRef()
  // const onPaginationPageChange = page => {
  //   if (
  //     node &&
  //     node.current &&
  //     node.current.props &&
  //     node.current.props.pagination &&
  //     node.current.props.pagination.options
  //   ) {
  //     node.current.props.pagination.options.onPageChange(page)
  //   }
  // }

  //delete customer
  // const [deleteModal, setDeleteModal] = useState(false)

  // const onClickDelete = users => {
  //   setContact(users)
  //   setDeleteModal(true)
  // }

  // const handleDeleteUser = () => {
  //   dispatch(onDeleteUser(contact))
  //   onPaginationPageChange(1)
  //   setDeleteModal(false)
  // }

  // const handleUserClicks = () => {
  //   setUserList("")
  //   setIsEdit(false)
  //   toggle()
  // }

  // const keyField = "id"

  return (
    <React.Fragment>
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

export default withRouter(SymptomLists)
