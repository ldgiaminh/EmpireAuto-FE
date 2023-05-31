import React, { useEffect, useState, useMemo } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import toastr from "toastr"
import { isEmpty } from "lodash"
import "toastr/build/toastr.min.css"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import moment from "moment"
import "moment/locale/vi"
import {
  Button,
  Col,
  Card,
  CardBody,
  Row,
  Container,
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

import img1 from "../../assets/images/small/no-data.png"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getBookingListsByDate as onGetBookingByDate } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import CheckInModal from "./CheckInModal"
import Loading from "components/Loader/Loading"

const BookingList = props => {
  //meta title
  document.title = "Đặt Lịch | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  /*
  ==================================================
  Render Day,Date in Father Tabs
  ==================================================
  */
  const today = moment().locale("vi")
  const monday = today.clone().startOf("isoWeek")
  const sunday = today.clone().endOf("isoWeek")

  const weekDays = []
  let currentDate = monday.clone()
  while (currentDate.isSameOrBefore(sunday, "day")) {
    const date = currentDate.clone().format("YYYY-MM-DD")
    const dateFormat = currentDate.clone().format("DD/MM")
    const dayArray = currentDate.format("dddd").split(" ")
    dayArray[0] = dayArray[0].charAt(0).toUpperCase() + dayArray[0].slice(1)
    dayArray[1] = dayArray[1].charAt(0).toUpperCase() + dayArray[1].slice(1)
    const day = dayArray.join(" ")
    weekDays.push({ day, date, dateFormat })
    currentDate.add(1, "day")
  }

  /*
  ==================================================
  useState
  ==================================================
  */
  const [activeTab, setActiveTab] = useState(
    weekDays.findIndex(day => day.dateFormat === today.format("DD/MM"))
  )
  const [subActiveTab, setSubActiveTab] = useState(0)

  const [booking, setBooking] = useState([])
  const [bookingList, setBookingList] = useState([])

  const [isChecking, setIsChecking] = useState(false)

  /*
  ==================================================
  Call api and useEffect
  ==================================================
  */

  //Get State from Redux
  const { bookings, isLoading } = useSelector(state => ({
    bookings: state.bookings.bookings,
    isLoading: state.bookings.isLoading,
  }))

  const activeDate = weekDays[activeTab].date

  useEffect(() => {
    dispatch(onGetBookingByDate(activeDate))
  }, [dispatch, activeDate])

  useEffect(() => {
    setBooking(bookings)
  }, [bookings])

  useEffect(() => {
    if (!isEmpty(bookings)) {
      setBooking(bookings)
    }
  }, [bookings])

  useEffect(() => {
    //const isToday = moment().isSame(today, "day")
    if (today) {
      setIsChecking(true)
    }
  }, [])

  /*
  ==================================================
  Changes Tabs
  ==================================================
  */

  //Father Tabs
  const toggleTab = index => {
    if (activeTab !== index) {
      setActiveTab(index)
      setSubActiveTab(0)
      const activeDate = weekDays[index].date
      dispatch(onGetBookingByDate(activeDate))
    }
  }

  //Nested Tabs
  const toggleSubTab = index => {
    setSubActiveTab(index)
  }

  /*
  ==================================================
  Filter with Status
  ==================================================
  */
  const tableBookings = index => {
    const filteredBookings = booking.filter(b => {
      if (index === 0) {
        return !b.isArrived && b.isActived
      } else if (index === 1) {
        return b.isArrived && b.isActived
      } else if (index === 2) {
        return !b.isArrived && !b.isActived
      }
    })
    return filteredBookings
  }

  const pendingBooking = tableBookings(subActiveTab)
  const arrivedBooking = tableBookings(subActiveTab)
  const cancelBooking = tableBookings(subActiveTab)

  /*
  ==================================================
  Check-in 
  ==================================================
  */

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

  // const [checkinModal, setCheckInModal] = useState(false)

  // const toggleViewModal = bookingData => {
  //   setBooking(bookingData)
  //   setCheckInModal(!checkinModal)
  // }

  // const handleCheckIn = () => {
  //   if (booking.id) {
  //     dispatch(checkInBooking(booking.id))
  //     onPaginationPageChange(1)
  //     setCheckInModal(false)
  //     toastr.success("Check-in thành công", "Thành công")
  //     dispatch(onGetBookings())
  //     history.push(`/booking-detail/${booking.id}`)
  //   }
  // }

  const handleCheckInClick = () => {
    history.push("/scanner")
  }

  /*
  ==================================================
  Column for each Table with Status
  =================================================
  */

  const columns = useMemo(
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
        Header: "Hãng xe",
        accessor: "car.carBrand",
        disableFilters: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Dòng xe",
        accessor: "car.carModel",
        disableFilters: true,
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
                history.push(`/bookings/${cellProps.row.original.id}`)
              }
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
      {/* {isLoading && <Loader />} */}

      {/* <CheckInModal
        isOpen={checkinModal}
        toggle={toggleViewModal}
        data={booking}
        handleCheckIn={handleCheckIn}
      /> */}
      <div className="page-content">
        <Container fluid>
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
                          {day.day} ({day.dateFormat})
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>

                  {isLoading && <Loading />}
                  {!isLoading &&
                    (bookings.length ? (
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
                                      {pendingBooking.length === 0 ? (
                                        <div className="row justify-content-center">
                                          <div className="col-xl-12">
                                            <div>
                                              <div className="text-center">
                                                <h4>
                                                  Không có phương tiện đặt ngày{" "}
                                                  {new Date(
                                                    activeDate
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                    }
                                                  )}
                                                </h4>
                                              </div>

                                              <img
                                                src={img1}
                                                alt=""
                                                className="mx-auto d-block"
                                                style={{ height: 400 }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <TableContainer
                                          columns={columns}
                                          data={pendingBooking}
                                          isGlobalFilter={true}
                                          isAddBookingOptions={false}
                                          //handleUserClick={handleUserClicks}
                                          isCheckin={isChecking}
                                          handleCheckInClick={
                                            handleCheckInClick
                                          }
                                          customPageSize={10}
                                          className="custom-header-css"
                                        />
                                      )}
                                    </TabPane>
                                  )}
                                  {subActiveTab === 1 && (
                                    <TabPane id="arrived">
                                      {arrivedBooking.length === 0 ? (
                                        <div className="row justify-content-center">
                                          <div className="col-xl-12">
                                            <div>
                                              <div className="text-center">
                                                <h4>
                                                  Không có phương tiện đã đến
                                                  ga-ra ngày{" "}
                                                  {new Date(
                                                    activeDate
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                    }
                                                  )}
                                                </h4>
                                              </div>

                                              <img
                                                src={img1}
                                                alt=""
                                                className="mx-auto d-block"
                                                style={{ height: 400 }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <TableContainer
                                          columns={columns}
                                          data={arrivedBooking}
                                          isGlobalFilter={true}
                                          isAddBookingOptions={false}
                                          //handleUserClick={handleUserClicks}
                                          customPageSize={10}
                                          className="custom-header-css"
                                        />
                                      )}
                                    </TabPane>
                                  )}
                                  {subActiveTab === 2 && (
                                    <TabPane id="cancel">
                                      {cancelBooking.length === 0 ? (
                                        <div className="row justify-content-center">
                                          <div className="col-xl-12">
                                            <div>
                                              <div className="text-center">
                                                <h4>
                                                  Không có đặt lịch hủy ngày{" "}
                                                  {new Date(
                                                    activeDate
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                    }
                                                  )}
                                                </h4>
                                              </div>

                                              <img
                                                src={img1}
                                                alt=""
                                                className="mx-auto d-block"
                                                style={{ height: 400 }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <TableContainer
                                          columns={columns}
                                          data={cancelBooking}
                                          isGlobalFilter={true}
                                          isAddBookingOptions={false}
                                          //handleUserClick={handleUserClicks}
                                          customPageSize={10}
                                          className="custom-header-css"
                                        />
                                      )}
                                    </TabPane>
                                  )}
                                </TabContent>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="pt-3">
                        <div className="row justify-content-center">
                          <div className="col-xl-12">
                            <div>
                              <div className="my-5">
                                <div className="text-center">
                                  <h4>
                                    Không có đặt lịch cho ngày{" "}
                                    {new Date(activeDate).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                      }
                                    )}
                                  </h4>
                                </div>

                                <img
                                  src={img1}
                                  alt=""
                                  className="mx-auto d-block"
                                  style={{ height: 400 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

BookingList.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(BookingList)
