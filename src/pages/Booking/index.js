import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import toastr from "toastr"
import { isEmpty } from "lodash"
import "toastr/build/toastr.min.css"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import QrScanner from './QrScanner';
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

  const { history } = props

  const [activeTab, setActiveTab] = useState("1")
  const [bookingList, setBookingList] = useState([])
  const [booking, setBooking] = useState()

  const dispatch = useDispatch()
  const { bookings } = useSelector(state => ({
    bookings: state.bookings.bookings,
  }))

  useEffect(() => {
    if (bookings && !bookings.length) {
      dispatch(onGetBookings())
    }
  }, [dispatch, bookings])

  useEffect(() => {
    setBookingList(bookings)
  }, [bookings])

  useEffect(() => {
    if (!isEmpty(bookings)) {
      setBookingList(bookings)
    }
  }, [bookings])

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

  //Change Tabs
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      dispatch(onGetBookings())
    }
  }

  const pendingBooking = bookings.filter(booking => booking.status === 0)
  const arrivedBooking = bookings.filter(booking => booking.status === 1)
  const cancelBooking = bookings.filter(booking => booking.status === 2)

  //Check-in Booking
  const [checkinModal, setCheckInModal] = useState(false)

  const onClickCheckin = booking => {
    setBooking(booking)
    setCheckInModal(true)
  }

  const handleCheckin = () => {
    if (booking.id) {
      dispatch(checkInBooking(booking.id))
      //window.location.reload()
      setCheckInModal(false)
      toastr.success("Check-in thành công", "Thành công")
      setBookingList(bookings)
      dispatch(onGetBookings())
    }
  }

  const columnsNotYet = useMemo(
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

  const handleButtonClick = () => {
    history.push('/scanner');
  }

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
                    <NavItem>
                      <button onClick={handleButtonClick}>Go to scanner</button>
                    </NavItem>
                  </ul>
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="not-yet">
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
                    <TabPane tabId="2" id="arrived">
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
                    <TabPane tabId="3" id="cancel">
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
