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
  Button,
} from "reactstrap"

import { OrderId, Name, Date, ModalCar, Plate } from "./OrderServiceCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import { getOrderServicesLists as onGetOrderServices } from "store/order-services/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const OrderSerives = props => {
  //meta title
  document.title = "Dịch Vụ | Empire Admin"

  const dispatch = useDispatch()
  const [orderService, setOrderService] = useState()

  const { orderServicess } = useSelector(state => ({
    orderServicess: state.orderServices.orderServicess,
  }))

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      // {
      //   Header: "Mã đơn",
      //   accessor: "code",
      //   width: "150px",
      //   style: {
      //     textAlign: "center",
      //     width: "10%",
      //     background: "#0000",
      //   },
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <OrderId {...cellProps} />
      //   },
      // },
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
          return <Date {...cellProps} />
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
              onClick={() => history.push(`/order-service-diagnose`)}
            >
              Chẩn đoán
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
                  <TableContainer
                    columns={columns}
                    data={orderServicess}
                    isGlobalFilter={true}
                    // isAddUserList={true}
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

export default withRouter(OrderSerives)
