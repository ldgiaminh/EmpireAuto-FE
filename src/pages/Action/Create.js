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
import AddNewCarProblem from "pages/Problem/AddNewProblem"
import AddNewCarItem from "pages/Item/AddNewItems"

const CreateNew = () => {
  //meta title
  document.title = "Tạo mới | Empire Garage"

  const [activeTab, setActiveTab] = useState("0")

  const numTabs = [
    { id: "0", title: "Dịch vụ" },
    { id: "1", title: "Vấn đề" },
    { id: "2", title: "Dòng xe" },
    { id: "3", title: "Thương hiệu xe" },
    { id: "4", title: "Triệu chứng" },
  ]

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
          <Breadcrumbs title="Tạo mới" breadcrumbItem="Tạo mới" />

          <div className="checkout-tabs">
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
    </>
  )
}

export default CreateNew
