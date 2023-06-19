import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap"
import { isEmpty, map } from "lodash"

import { Name } from "./CarBrandCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsBrand as onGetCarsBrand } from "store/actions"
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter } from "react-router-dom"
import CardBrand from "./CardBrand"

const CarBrand = props => {
  //meta title
  document.title = "Thương hiệu xe | Empire Garage"

  const dispatch = useDispatch()

  const { carsBrand } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
  }))

  useEffect(() => {
    if (carsBrand && !carsBrand.length) {
      dispatch(onGetCarsBrand())
    }
  }, [dispatch, carsBrand])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Quản lý" breadcrumbItem="Thương hiệu xe" />

          <Row>
            {map(carsBrand, (brand, key) => (
              <CardBrand brand={brand} key={"_brand_" + key} />
            ))}
          </Row>

          <Row>
            {/* <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-hourglass bx-spin me-2" />
                  Load more
                </Link>
              </div>
            </Col> */}
          </Row>
        </Container>
        {/* <Container fluid={true}>
          <Breadcrumbs title="Quản lý" breadcrumbItem="Danh sách các hãng xe" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={brands}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                    className="custom-header-css"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container> */}
      </div>
    </React.Fragment>
  )
}

CarBrand.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(CarBrand)
