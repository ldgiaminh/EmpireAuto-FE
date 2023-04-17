import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import {
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

import { Name, Email, Phone, Gender } from "./userlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/users/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const UserLists = props => {
  //meta title
  document.title = "Danh sách các khách hàng | Empire Garage"

  const dispatch = useDispatch()
  const [user, setUser] = useState()

  const { users } = useSelector(state => ({
    users: state.userLists.users,
  }))

  const [userList, setUserList] = useState([])

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />
        },
      },
      {
        Header: "Avatar",
        accessor: "img",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.fullname}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.img}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Tên khách hàng",
        accessor: "fullname",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Số điện thoại",
        accessor: "phone",
        filterable: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Giới tính",
        accessor: "gender",
        filterable: true,
        Cell: cellProps => {
          return (
            <>
              {" "}
              <Gender {...cellProps} />{" "}
            </>
          )
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
    dispatch(onGetUsers())
  }, [dispatch])

  useEffect(() => {
    setUser(users)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users)) {
      setUser(users)
    }
  }, [users])

  const customers = users.filter(c => c.roleId === "US")

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Khách h"
            breadcrumbItem="Danh sách cách khách hàng"
          />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={customers}
                    isGlobalFilter={true}
                    isAddUserList={false}
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

export default withRouter(UserLists)
