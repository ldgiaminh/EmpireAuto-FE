import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

import { BookingCode, ModalCar, Name, Phone, Plate } from "./BookingUserListCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getBookingLists as onGetBookings } from "store/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const BookingList = props => {
  //meta title
  document.title = "Đặt Lịch | Empire Admin"

  const { history } = props

  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("1")
  const [booking, setBooking] = useState()

  const { bookings } = useSelector(state => ({
    bookings: state.bookings.bookings,
  }))

  // const [bookingList, setBookingList] = useState([])
  //c] = useState(false)

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  useEffect(() => {
    if (bookings && !bookings.length) {
      dispatch(onGetBookings())
    }
  }, [dispatch, bookings])

  useEffect(() => {
    setBooking(bookings)
  }, [bookings])

  useEffect(() => {
    if (!isEmpty(bookings)) {
      setBooking(bookings)
    }
  }, [bookings])

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
              // className="btn-sm btn-rounded"
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Đặt Lịch" breadcrumbItem="Danh sách đặt lịch" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1")
                        }}
                      >
                        Chưa đến
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggleTab("2")
                        }}
                      >
                        Đã đến
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggleTab("3")
                        }}
                      >
                        Đã hủy
                      </NavLink>
                    </NavItem>
                  </ul>
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="not-yet">
                      <TableContainer
                        columns={columns}
                        data={bookings}
                        isGlobalFilter={true}
                        isAddBookingOptions={false}
                        //handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="2" id="arrived">
                      <TableContainer
                        columns={columns}
                        data={bookings}
                        isGlobalFilter={true}
                        isAddBookingOptions={false}
                        //handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="3" id="cancel">
                      <TableContainer
                        columns={columns}
                        data={bookings}
                        isGlobalFilter={true}
                        isAddBookingOptions={false}
                        //handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                  </TabContent>
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
