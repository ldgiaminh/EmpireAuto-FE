import PropTypes from "prop-types"
import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  UncontrolledTooltip,
} from "reactstrap"
import { isEmpty, size, map } from "lodash"

const CardBrand = props => {
  const { brand } = props

  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <CardBody>
            {!brand.photo ? (
              <div className="avatar-md mx-auto mb-4">
                <span
                  className={
                    "avatar-title bg-soft bg-" +
                    brand.name +
                    " text-" +
                    brand.name +
                    " font-size-16"
                  }
                >
                  {brand.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <img className="avatar-md rounded" src={brand.photo} alt="" />
              </div>
            )}

            <h5 className="font-size-15 mb-1">
              <Link
                to={`/brands/${brand.id}/${brand.name}`}
                className="text-dark"
              >
                {brand.name}
              </Link>
            </h5>
            {/* <p className="text-muted">{user.designation}</p> */}
          </CardBody>
          <CardFooter className="bg-transparent border-top">
            <div className="contact-links d-flex font-size-20">
              <div className="flex-fill">
                <Link
                  to={`/brands/${brand.id}/${brand.name}`}
                  id={"brand" + brand.id}
                >
                  <i className="mdi mdi-eye-circle-outline" />
                  <UncontrolledTooltip
                    placement="top"
                    target={"brand" + brand.id}
                  >
                    Xem dòng xe
                  </UncontrolledTooltip>
                </Link>
              </div>
              <div className="flex-fill">
                <Link to="#" id={"project" + brand.id}>
                  <i className="mdi mdi-file-document-edit-outline" />
                  <UncontrolledTooltip
                    placement="top"
                    target={"project" + brand.id}
                  >
                    Chỉnh sửa
                  </UncontrolledTooltip>
                </Link>
              </div>
              {/* <div className="flex-fill">
                <Link to="#" id={"profile" + brand.id}>
                  <i className="bx bx-user-circle" />
                  <UncontrolledTooltip
                    placement="top"
                    target={"profile" + brand.id}
                  >
                    Profile
                  </UncontrolledTooltip>
                </Link>
              </div> */}
            </div>
          </CardFooter>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardBrand.propTypes = {
  brand: PropTypes.object,
}

export default CardBrand
