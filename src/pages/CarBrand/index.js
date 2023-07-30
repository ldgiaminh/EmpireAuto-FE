import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Container, Row } from "reactstrap"
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

import Loading from "components/Loader/Loading"

const CarBrand = props => {
  //meta title
  document.title = "Thương hiệu xe | Empire Garage"

  const dispatch = useDispatch()

  const { carsBrand, isLoading } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
    isLoading: state.brands.isLoading,
  }))

  useEffect(() => {
    if (carsBrand && !carsBrand.length) {
      dispatch(onGetCarsBrand())
    }
  }, [dispatch])

  const sortedCarsBrand = [...carsBrand].sort((a, b) => b.id - a.id)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Quản lý" breadcrumbItem="Thương hiệu xe" />

          <Row>
            {isLoading && <Loading />}
            {map(sortedCarsBrand, (brand, key) => (
              <CardBrand brand={brand} key={"_brand_" + key} />
            ))}
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
