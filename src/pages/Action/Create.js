import React, { useEffect, useState } from "react"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Button,
  Label,
  Row,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  CardSubtitle,
} from "reactstrap"

import classnames from "classnames"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import AddNewCarBrand from "pages/CarBrand/AddNewCarBrand"
import AddNewCarModel from "pages/Model/AddNewCarModel"

const CreateNew = () => {
  //meta title
  document.title = "Tạo mới | Empire Garage"

  const [activeTab, setactiveTab] = useState("1")

  /*
  ==================================================
  MODEL
  ==================================================
  */

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Checkout" />

          <div className="checkout-tabs">
            <Row>
              <Col xl="2" sm="3">
                <Nav className="flex-column" pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        setactiveTab("1")
                      }}
                    >
                      <i className="bx bxs-truck d-block check-nav-icon mt-4 mb-2" />
                      <p className="font-weight-bold mb-4">Shipping Info</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        setactiveTab("2")
                      }}
                    >
                      <i className="bx bx-money d-block check-nav-icon mt-4 mb-2" />
                      <p className="font-weight-bold mb-4">Payment Info</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        setactiveTab("3")
                      }}
                    >
                      <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                      <p className="font-weight-bold mb-4">Confirmation</p>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col xl="10" sm="9">
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <AddNewCarBrand />
                      </TabPane>
                      <TabPane
                        tabId="2"
                        id="v-pills-payment"
                        role="tabpanel"
                        aria-labelledby="v-pills-payment-tab"
                      >
                        <AddNewCarModel />
                      </TabPane>
                      <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                        <Card className="shadow-none border mb-0">
                          <CardBody>
                            <CardTitle className="mb-4">
                              Order Summary
                            </CardTitle>
                          </CardBody>
                        </Card>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
                {/* <Row className="mt-4">
                  <Col sm="6">
                    <Link
                      to="/ecommerce-cart"
                      className="btn text-muted d-none d-sm-inline-block btn-link"
                    >
                      <i className="mdi mdi-arrow-left me-1" /> Back to Shopping
                      Cart{" "}
                    </Link>
                  </Col>
                  <Col sm="6">
                    <div className="text-sm-end">
                      <Link
                        to="/ecommerce-checkout"
                        className="btn btn-success"
                      >
                        <i className="mdi mdi-truck-fast me-1" /> Proceed to
                        Shipping{" "}
                      </Link>
                    </div>
                  </Col>
                </Row> */}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CreateNew
