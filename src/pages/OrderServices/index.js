import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"

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
  Button,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

import { OrderId, Name, DateCell, ModalCar, Plate } from "./OrderServiceCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getOrderServicesLists as onGetOrderServices,
  getOrderServicesListByStatus as onGetOrderServicesListByStatus,
} from "store/order-services/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const OrderSerives = props => {
  //meta title
  document.title = "Dịch Vụ | Empire Admin"

  const statusServices = [
    { id: "1", title: "Chẩn đoán" },
    { id: "0", title: "Chờ xác nhận" },
    { id: "2", title: "Đã xác nhận và thanh toán" },
    { id: "3", title: "Hoàn tất dịch vụ" },
    { id: "4", title: "Đã lấy xe" },
    { id: "-1", title: "Hủy" },
  ]

  const { history } = props

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("1")
  const [orderService, setOrderService] = useState()

  const { orderServicess } = useSelector(state => ({
    orderServicess: state.orderServices.orderServicess,
  }))

  //Change Tabs
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const columnsDiagnose = useMemo(
    () => [
      {
        Header: "Tên khách hàng",
        accessor: "order.user.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Ngày đến",
        accessor: "order.updatedAt",
        disableFilters: true,
        Cell: cellProps => {
          return <DateCell {...cellProps} />
        },
      },
      {
        Header: "Modal xe",
        accessor: "car.carBrand",
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
        Header: "Chẩn đoán",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(
                  `/order-service-detail/${cellProps.row.original.id}`
                )
              }
            >
              Chẩn đoán
            </Button>
          )
        },
      },
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: "Tên khách hàng",
        accessor: "order.user.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Ngày đến",
        accessor: "order.updatedAt",
        disableFilters: true,
        Cell: cellProps => {
          return <DateCell {...cellProps} />
        },
      },
      {
        Header: "Modal xe",
        accessor: "car.carBrand",
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
        Header: "Chẩn đoán",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(
                  `/order-service-detail/${cellProps.row.original.id}`
                )
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

  useEffect(() => {
    if (orderServicess && !orderServicess.length) {
      dispatch(onGetOrderServices())
    }
  }, [dispatch, orderServicess])

  useEffect(() => {
    setOrderService(orderServicess)
  }, [orderServicess])

  const diagnosingList = orderServicess.filter(service => service.status === 0)
  const pendingList = orderServicess.filter(service => service.status === 1)
  const confirmList = orderServicess.filter(service => service.status === 2)
  const doneList = orderServicess.filter(service => service.status === 3)
  const checkoutList = orderServicess.filter(service => service.status === 4)
  const cancelList = orderServicess.filter(service => service.status === -1)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Dịch Vụ" breadcrumbItem="Dịch Vụ" />
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
                  <TabContent activeTab={activeTab} className="p-3">
                    <TabPane tabId="1" id="diagnosing">
                      <TableContainer
                        columns={columnsDiagnose}
                        data={diagnosingList}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="0" id="diagnosing">
                      <TableContainer
                        columns={columnsDiagnose}
                        data={pendingList}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="2" id="pending">
                      <TableContainer
                        columns={columns}
                        data={confirmList}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="3" id="done">
                      <TableContainer
                        columns={columns}
                        data={doneList}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="4" id="checkout">
                      <TableContainer
                        columns={columns}
                        data={checkoutList}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
                        customPageSize={10}
                        className="custom-header-css"
                      />
                    </TabPane>
                    <TabPane tabId="-1" id="cancel">
                      <TableContainer
                        columns={columns}
                        data={cancelList}
                        isGlobalFilter={true}
                        // isAddUserList={true}
                        // handleUserClick={handleUserClicks}
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

export default withRouter(OrderSerives)
