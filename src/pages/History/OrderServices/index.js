import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../../components/Common/TableContainer"
import classnames from "classnames"
import img1 from "../../../assets/images/small/no-data.png"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

import {
  OrderCode,
  Name,
  DateCell,
  ModalCar,
  Plate,
  Expert,
} from "./OrderServiceCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getOrderServicesListByStatus as onGetOrderServicesListByStatus } from "store/order-services/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import Loading from "components/Loader/Loading"

const OrderServicesHistory = props => {
  //meta title
  document.title = "Lịch sử hóa đơn | Empire Garage"

  const statusServices = [
    { id: "5", title: "Hoàn thành" },
    { id: "-1", title: "Đã Hủy" },
  ]

  const { history } = props

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("5")
  const [orderService, setOrderService] = useState([])

  const { orderServicess, isLoading, isShow } = useSelector(state => ({
    orderServicess: state.orderServices.orderServicess,
    isLoading: state.orderServices.isLoading,
    isShow: state.Layout.isShow,
  }))

  //Change Tabs
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      dispatch(onGetOrderServicesListByStatus(tab, props.history))
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Mã đơn hàng",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: cellProps => {
          return <OrderCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "order.user.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Thời gian check-in",
        accessor: "order.createdAt",
        disableFilters: true,
        Cell: cellProps => {
          return <DateCell {...cellProps} />
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
        disableFilters: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Kỹ thuật viên",
        accessor: "expert.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Expert {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color={
                cellProps.row.original.expert !== null ? "primary" : "warning"
              }
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(`/order-services/${cellProps.row.original.id}`)
              }
            >
              {cellProps.row.original.expert !== null
                ? "Xem chi tiết"
                : "Phân công"}
            </Button>
          )
        },
      },
    ],
    []
  )

  const columnsDone = useMemo(
    () => [
      {
        Header: "Mã đơn hàng",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: cellProps => {
          return <OrderCode {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "order.user.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
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
        disableFilters: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Kỹ thuật viên",
        accessor: "expert.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Expert {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color={
                cellProps.row.original.expert !== null ? "primary" : "warning"
              }
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(`/order-services/${cellProps.row.original.id}`)
              }
            >
              {cellProps.row.original.expert !== null
                ? "Xem chi tiết"
                : "Phân công"}
            </Button>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    dispatch(onGetOrderServicesListByStatus(activeTab, props.history))
  }, [dispatch, activeTab])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetOrderServicesListByStatus(activeTab, props.history))
    }
  }, [dispatch, isShow, activeTab])

  useEffect(() => {
    setOrderService(orderServicess)
  }, [orderServicess])

  useEffect(() => {
    if (!isEmpty(orderServicess)) {
      setOrderService(orderServicess)
    }
  }, [orderServicess])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Lịch sử" breadcrumbItem="Danh sách hóa đơn" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                    {statusServices.map(tab => (
                      <NavItem key={tab.id}>
                        <NavLink
                          className={classnames({
                            active: activeTab === tab.id,
                          })}
                          onClick={() => {
                            toggleTab(tab.id)
                          }}
                        >
                          {tab.title}
                        </NavLink>
                      </NavItem>
                    ))}
                  </ul>
                  {isLoading && <Loading />}
                  {!isLoading &&
                    (orderService.length ? (
                      <TabContent activeTab={activeTab} className="p-3">
                        <TabPane tabId="5" id="checkout">
                          <TableContainer
                            columns={columnsDone}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="-1" id="cancel">
                          <TableContainer
                            columns={columnsDone}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                      </TabContent>
                    ) : (
                      <div className="pt-3">
                        <div className="row justify-content-center">
                          <div className="col-xl-12">
                            <div>
                              <div className="my-5">
                                <div className="text-center">
                                  <h4>Không có dữ liệu</h4>
                                </div>

                                <img
                                  src={img1}
                                  alt=""
                                  className="mx-auto d-block"
                                  style={{ maxWidth: "100%", height: 350 }}
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

OrderServicesHistory.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(OrderServicesHistory)
