import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import img1 from "../../assets/images/small/no-data.png"
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

const OrderServicesList = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Garage"

  const statusServices = [
    { id: "0", title: "Phân công" },
    { id: "1", title: "Đang chẩn đoán" },
    { id: "2", title: "Xác nhận thanh toán" },
    { id: "3", title: "Đang thực hiện" },
    { id: "4", title: "Chờ khách nhận xe" },
    { id: "5", title: "Hoàn thành" },
    { id: "-1", title: "Đã Hủy" },
  ]

  const { history } = props

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("0")
  const [orderService, setOrderService] = useState([])

  const { orderServicess, isLoading } = useSelector(state => ({
    orderServicess: state.orderServices.orderServicess,
    isLoading: state.orderServices.isLoading,
  }))

  //Change Tabs
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      dispatch(onGetOrderServicesListByStatus(tab))
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

  useEffect(() => {
    dispatch(onGetOrderServicesListByStatus(activeTab))
  }, [dispatch])

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
          <Breadcrumbs title="Theo dõi tiến trình" breadcrumbItem="Danh sách" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <ul
                    className="nav nav-tabs nav-tabs-custom nav-justified"
                    role="tablist"
                  >
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
                        <TabPane tabId="0" id="diagnosing">
                          <TableContainer
                            columns={columns}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="1" id="confirmPrice">
                          <TableContainer
                            columns={columns}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="2" id="confirmPaid">
                          <TableContainer
                            columns={columns}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="3" id="done">
                          <TableContainer
                            columns={columns}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="4" id="checkout">
                          <TableContainer
                            columns={columns}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="5" id="checkout">
                          <TableContainer
                            columns={columns}
                            data={orderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="-1" id="cancel">
                          <TableContainer
                            columns={columns}
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

OrderServicesList.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(OrderServicesList)
