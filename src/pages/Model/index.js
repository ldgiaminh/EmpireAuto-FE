import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import { isEmpty, map } from "lodash"
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter, useParams } from "react-router-dom"

import { Name } from "./CarModellistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsModelByBrand as onGetCarsModelByBrand } from "store/actions"
import ModelGrid from "./ModelGrid"

const CarModel = props => {
  const {
    match: { params },
  } = props

  const dispatch = useDispatch()

  //meta title
  useEffect(() => {
    if (params) {
      document.title = `Dòng xe ${params.name} | Empire Garage`
    } else {
      document.title = "Empire Garage"
    }
  })

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsModel } = useSelector(state => ({
    carsModel: state.models.carsModel,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [models, setModels] = useState([])

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCarsModelByBrand(params.id))
    }
  }, [params, dispatch])

  useEffect(() => {
    setModels(carsModel)
  }, [carsModel])

  useEffect(() => {
    if (!isEmpty(carsModel)) {
      setModels(carsModel)
    }
  }, [carsModel])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Quản lý"
            breadcrumbItem={`Dòng xe - ${params.name}`}
          />
          <Row>
            <ModelGrid models={models} brand={params} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

CarModel.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarModel)
