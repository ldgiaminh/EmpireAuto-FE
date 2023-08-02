import React, { useEffect, useState } from "react"
import { Container, Row, Nav, NavItem, NavLink, Col } from "reactstrap"
import { withRouter } from "react-router-dom"

import classnames from "classnames"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import AddNewCarBrand from "pages/CarBrand/AddNewCarBrand"
import AddNewCarModel from "pages/Model/AddNewCarModel"
import AddNewCarProblem from "pages/Problem/AddNewProblem"
import AddNewCarItem from "pages/Item/AddNewItems"

const CreateNew = props => {
  //meta title
  document.title = "Tạo mới | Empire Garage"

  const [activeTab, setActiveTab] = useState("0")

  const createNew = [
    { link: "/create-new-symptom", icon: "bx bx-flag", title: "Triệu chứng" },
    { link: "/create-new-brand", icon: "bx bx-planet", title: "Thương Hiệu" },
    { link: "/create-new-model", icon: "bx bxs-car", title: "Dòng xe" },
    {
      link: "/create-new-problem",
      icon: "bx bx-cog",
      title: "Vấn đề",
    },
    {
      link: "/create-new-item",
      icon: "bx bx-wrench",
      title: "Dịch vụ",
    },
  ]

  const handleItemClick = link => {
    props.history.push(link)
  }

  /*
  ==================================================
  MODEL
  ==================================================
  */

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Tạo mới" breadcrumbItem="Thêm mới" />

          {/* <div className="checkout-tabs">
            <Row>
              <Col xl="2" sm="3">
                <Nav pills className="flex-column">
                  {numTabs.map(tab => (
                    <NavItem key={tab.id}>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          "mb-2": true,
                          active: activeTab === tab.id,
                        })}
                        onClick={() => {
                          setActiveTab(tab.id)
                        }}
                      >
                        {tab.title}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </Col>
              <Col xl="10" sm="9">
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="0">
                        <AddNewCarItem />
                      </TabPane>
                      <TabPane tabId="1">
                        <AddNewCarProblem />
                      </TabPane>
                      <TabPane tabId="2">
                        <AddNewCarModel />
                      </TabPane>
                      <TabPane tabId="3">
                        <AddNewCarBrand />
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
                <Row className="mt-4">
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
                </Row>
              </Col>
            </Row>
          </div> */}

          <div className="checkout-tabs">
            <Row>
              <Col className="create-new">
                <Nav className="flex-row" pills>
                  {createNew.map((item, index) => (
                    <Col xl="3" sm="2" className="link-body" key={index}>
                      <NavItem>
                        <NavLink onClick={() => handleItemClick(item.link)}>
                          <i
                            className={
                              item.icon + " d-block check-nav-icon mt-4 mb-2"
                            }
                          />
                          <p className="mb-4">{item.title}</p>
                        </NavLink>
                      </NavItem>
                    </Col>
                  ))}
                </Nav>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default withRouter(CreateNew)
