import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Nav,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import classnames from "classnames"

import BookingScript from "./RunScript/booking-script"
import BookingRemoveScript from "./RunScript/booking-remove-script"
import CustomerScript from "./RunScript/customer-script"

const ConfigScriptGarage = props => {
  //meta title
  document.title = "Cấu hình | Empire Garage"

  const [activeTab, setactiveTab] = useState("1")

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Cấu hình" breadcrumbItem="Cấu hình dữ liệu" />

          <Row>
            <Col xl="3">
              <Card style={{ padding: "20px", borderRadius: "5px" }}>
                {/* <Button
                  type="button"
                  color="danger"
                  onClick={() => {
                    setmodal(!modal)
                  }}
                  block
                >
                  Compose
                </Button> */}
                <h6>Chạy script</h6>
                <div className="mail-list">
                  <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          setactiveTab("1")
                        }}
                      >
                        <i className="mdi font-size-15 mdi-account-circle me-2"></i>{" "}
                        Tạo khách hàng{" "}
                        {/* <span className="ml-1 float-end">(18)</span> */}
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={
                          (`font-size-15`,
                          classnames({
                            active: activeTab === "2",
                          }))
                        }
                        onClick={() => {
                          setactiveTab("2")
                        }}
                      >
                        <i className="mdi font-size-15 mdi-calendar-month me-2"></i>
                        Tạo đặt lịch
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          setactiveTab("3")
                        }}
                      >
                        <i className="mdi font-size-15 mdi-calendar-remove me-2"></i>
                        Hủy đặt lịch
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          setactiveTab("4")
                        }}
                      >
                        <i className="mdi font-size-15 mdi-calendar-check me-2"></i>
                        Check-in
                      </NavLink>
                    </NavItem>

                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          setactiveTab("3")
                        }}
                      >
                        <i className="mdi mdi-diamond-stone me-2"></i>Important
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          setactiveTab("4")
                        }}
                      >
                        <i className="mdi mdi-file-outline me-2"></i>Draft
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "5",
                        })}
                        onClick={() => {
                          setactiveTab("5")
                        }}
                      >
                        <i className="mdi mdi-email-check-outline me-2"></i>Sent
                        Mail
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "6",
                        })}
                        onClick={() => {
                          setactiveTab("6")
                        }}
                      >
                        <i className="mdi mdi-trash-can-outline me-2"></i>Trash
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                </div>

                {/* <h6 className="mt-4">Cấu hình</h6> */}
              </Card>
            </Col>
            <Col xl="9">
              <div className="mb-3">
                <Card>
                  {/* Render Email Top Tool Bar */}

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <CustomerScript />
                    </TabPane>
                    <TabPane tabId="2">
                      <BookingScript />
                    </TabPane>
                    <TabPane tabId="3">
                      <BookingRemoveScript />
                    </TabPane>
                    <TabPane tabId="4"></TabPane>
                    <TabPane tabId="5"></TabPane>
                    <TabPane tabId="6"></TabPane>
                  </TabContent>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ConfigScriptGarage.propTypes = {
  inboxmails: PropTypes.array,
  starredmails: PropTypes.array,
  onGetInboxMails: PropTypes.func,
  onGetStarredMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
}

export default withRouter(ConfigScriptGarage)
