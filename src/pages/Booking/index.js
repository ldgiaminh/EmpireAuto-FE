import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

import { BookingCode, ModalCar, Name, Phone, Plate } from "./BookingUserListCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getBookingLists as onGetBookings,
  getBookingDetails as onGetBookingDetails,
} from "store/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const BookingList = props => {
  //meta title
  document.title = "Đặt Lịch | Empire Admin"

  const { history } = props

  const dispatch = useDispatch()
  const [booking, setBooking] = useState()
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

  const { bookings } = useSelector(state => ({
    bookings: state.bookings.bookings,
  }))

  const [bookingList, setBookingList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (bookings && !bookings.length) {
      dispatch(onGetBookings())
      setIsEdit(false)
    }
  }, [dispatch, bookings])

  useEffect(() => {
    setBooking(bookings)
    setIsEdit(false)
  }, [bookings])

  useEffect(() => {
    if (!isEmpty(bookings) && !!isEdit) {
      setBooking(bookings)
      setIsEdit(false)
    }
  }, [bookings])

  const toggle = () => {
    setModal(!modal)
  }
  const columns = useMemo(
    () => [
      // {
      //   Header: "#",
      //   Cell: () => {
      //     return <input type="checkbox" />
      //   },
      // },
      {
        Header: "Mã đặt lịch",
        accessor: "code",
        filterable: true,
        Cell: cellProps => {
          return <BookingCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "user.fullname",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Số điện thoại",
        accessor: "user.phone",
        filterable: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Modal xe",
        accessor: "car.carModel",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car.carLisenceNo",
        filterable: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "view",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              //onClick={toggleViewModal}
              onClick={() => history.push(`/booking-detail/${row.original.id}`)}
            >
              Xem chi tiết
            </Button>
          )
        },
      },
      {
        Header: "Check-in",
        accessor: "action",
        disableFilters: true,
        Cell: () => {
          return (
            <Button
              type="button"
              color="success"
              className="btn-sm btn-rounded"
              //onClick={toggleViewModal}
            >
              Check-in
            </Button>
          )
        },
      },
    ],
    []
  )

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

  // //delete customer
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

  const keyField = "id"

  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Đặt Lịch" breadcrumbItem="Danh sách đặt lịch" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={bookings}
                    isGlobalFilter={true}
                    isAddBookingOptions={true}
                    //handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  {/* <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Designation</Label>
                              <Input
                                name="designation"
                                label="Designation"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.designation || ""}
                                invalid={
                                  validation.touched.designation &&
                                  validation.errors.designation
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.designation &&
                              validation.errors.designation ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.designation}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Option</Label>
                              <Input
                                type="select"
                                name="tags"
                                className="form-select"
                                multiple={true}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tags || []}
                                invalid={
                                  validation.touched.tags &&
                                  validation.errors.tags
                                    ? true
                                    : false
                                }
                              >
                                <option>Photoshop</option>
                                <option>illustrator</option>
                                <option>Html</option>
                                <option>Php</option>
                                <option>Java</option>
                                <option>Python</option>
                                <option>UI/UX Designer</option>
                                <option>Ruby</option>
                                <option>Css</option>
                              </Input>
                              {validation.touched.tags &&
                              validation.errors.tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tags}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Projects</Label>
                              <Input
                                name="projects"
                                label="Projects"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.projects || ""}
                                invalid={
                                  validation.touched.projects &&
                                  validation.errors.projects
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.projects &&
                              validation.errors.projects ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.projects}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(BookingList)
