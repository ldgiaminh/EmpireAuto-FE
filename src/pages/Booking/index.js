import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import toastr from "toastr"
import { isEmpty } from "lodash"
import "toastr/build/toastr.min.css"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import moment from "moment"
import "moment/locale/vi"

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
  Nav,
} from "reactstrap"

import {
  BookingCode,
  ModalCar,
  Name,
  Phone,
  Plate,
  Status,
} from "./BookingUserListCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import CheckinModal from "components/Common/CheckinModal"

import {
  getBookingLists as onGetBookings,
  checkinBooking as checkInBooking,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const BookingList = props => {
  //meta title
  document.title = "Đặt Lịch | Empire Admin"

  const today = moment().locale("vi")
  const monday = today.clone().startOf("isoWeek")
  const sunday = today.clone().endOf("isoWeek")

  const weekDays = []
  let currentDate = monday.clone()
  while (currentDate.isSameOrBefore(sunday, "day")) {
    const date = currentDate.format("DD/MM")
    const day =
      currentDate.format("dddd").charAt(0).toUpperCase() +
      currentDate.format("dddd").slice(1)
    weekDays.push({ day, date })
    currentDate.add(1, "day")
  }

  const [activeTab, setActiveTab] = useState(
    weekDays.findIndex(
      day =>
        day.day ===
        today.format("dddd").charAt(0).toUpperCase() +
          today.format("dddd").slice(1)
    )
  )
  const [subActiveTab, setSubActiveTab] = useState(0)

  const [bookingList, setBookingList] = useState([])
  const [booking, setBooking] = useState()

  const { history } = props

  //Change Tabs
  const toggleTab = index => {
    setActiveTab(index)
    setSubActiveTab(0)
  }

  const toggleSubTab = index => {
    setSubActiveTab(index)
  }

  const dispatch = useDispatch()
  const { bookings } = useSelector(state => ({
    bookings: state.bookings.bookings,
  }))

  useEffect(() => {
    if (bookings && !bookings.length) {
      dispatch(onGetBookings())
    }
  }, [dispatch, bookings])

  // useEffect(() => {
  //   setBookingList(bookings)
  // }, [bookings])

  // useEffect(() => {
  //   if (!isEmpty(bookings)) {
  //     setBookingList(bookings)
  //   }
  // }, [bookings])

  const pendingBooking = bookings.filter(booking => !booking.isArrived)
  const arrivedBooking = bookings.filter(booking => booking.isArrived)
  const cancelBooking = bookings.filter(booking => booking.status === 2)

  //Notification
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  }

  //Check-in Booking
  const [checkinModal, setCheckInModal] = useState(false)

  const onClickCheckin = booking => {
    setBooking(booking)
    setCheckInModal(true)
  }

  const handleCheckin = () => {
    if (booking.id) {
      dispatch(checkInBooking(booking.id))
      setCheckInModal(false)
      toastr.success("Check-in thành công", "Thành công")
      dispatch(onGetBookings())
      const updatedBookings = dispatch(onGetBookings())
      setBookingList(updatedBookings)
    }
  }

  const columnsNotYet = useMemo(
    () => [
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
        Header: "Thương hiệu",
        accessor: "car.carBrand",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Dòng xe",
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
        Header: "Date",
        accessor: "date",
        filterable: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "view",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              onClick={() =>
                history.push(`/booking-detail/${cellProps.row.original.id}`)
              }
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
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="success"
              // className="btn-sm btn-rounded"
              //onClick={() => checkinBooking(row.original.id)}
              onClick={() => {
                const checkIn = cellProps.row.original
                onClickCheckin(checkIn)
              }}
            >
              Check-in
            </Button>
          )
        },
      },
    ],
    []
  )

  const columnsArrived = useMemo(
    () => [
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
        Header: "Thương hiệu",
        accessor: "car.carBrand",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Dòng xe",
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
    ],
    []
  )

  const columnsCancel = useMemo(
    () => [
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
        Header: "Thương hiệu",
        accessor: "car.carBrand",
        filterable: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Dòng xe",
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
    ],
    []
  )

  return (
    <React.Fragment>
      <CheckinModal
        show={checkinModal}
        onCheckinClick={handleCheckin}
        onCloseClick={() => setCheckInModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Đặt Lịch" breadcrumbItem="Danh sách đặt lịch" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Nav
                    pills
                    className="nav bg-light rounded nav-justified"
                    role="tablist"
                  >
                    {weekDays.map((day, index) => (
                      <NavItem key={index}>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === index,
                          })}
                          onClick={() => {
                            toggleTab(index)
                          }}
                        >
                          {day.day} ({day.date})
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>

                  <div className="mt-4">
                    {weekDays.map((day, index) => (
                      <div key={index}>
                        {activeTab === index && (
                          <>
                            <ul
                              className="nav nav-tabs nav-tabs-custom"
                              role="tablist"
                            >
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: subActiveTab === 0,
                                  })}
                                  onClick={() => {
                                    toggleSubTab(0)
                                  }}
                                >
                                  Chưa đến
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: subActiveTab === 1,
                                  })}
                                  onClick={() => {
                                    toggleSubTab(1)
                                  }}
                                >
                                  Đã đến
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: subActiveTab === 2,
                                  })}
                                  onClick={() => {
                                    toggleSubTab(2)
                                  }}
                                >
                                  Hủy
                                </NavLink>
                              </NavItem>
                            </ul>
                            <TabContent className="p-3 mt-4">
                              {subActiveTab === 0 && (
                                <TabPane id="not-yet">
                                  <TableContainer
                                    columns={columnsNotYet}
                                    data={pendingBooking}
                                    isGlobalFilter={true}
                                    isAddBookingOptions={false}
                                    //handleUserClick={handleUserClicks}
                                    customPageSize={10}
                                    className="custom-header-css"
                                  />
                                </TabPane>
                              )}
                              {subActiveTab === 1 && (
                                <TabPane id="not-yet">
                                  <TableContainer
                                    columns={columnsArrived}
                                    data={arrivedBooking}
                                    isGlobalFilter={true}
                                    isAddBookingOptions={false}
                                    //handleUserClick={handleUserClicks}
                                    customPageSize={10}
                                    className="custom-header-css"
                                  />
                                </TabPane>
                              )}
                              {subActiveTab === 2 && (
                                <TabPane id="not-yet">
                                  <TableContainer
                                    columns={columnsCancel}
                                    data={cancelBooking}
                                    isGlobalFilter={true}
                                    isAddBookingOptions={false}
                                    //handleUserClick={handleUserClicks}
                                    customPageSize={10}
                                    className="custom-header-css"
                                  />
                                </TabPane>
                              )}
                            </TabContent>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
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
