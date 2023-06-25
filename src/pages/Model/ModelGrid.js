import React from "react"
import { Link } from "react-router-dom"
import { map } from "lodash"
import slugify from "slugify"
import { Card, CardBody, Col } from "reactstrap"

const ModelGrid = ({ models, brand }) => {
  return (
    <React.Fragment>
      {map(models, model => (
        <Col xl="4" sm="6" key={model.id}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="avatar-md me-4">
                  <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                    {/* <img src={companies[model.img]} alt="" height="30" /> */}
                  </span>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="text-truncate font-size-15">
                    <Link
                      to={`/brands/${brand.id}/${brand.name}/models/${
                        model.id
                      }/${slugify(model.name, { lower: true })}`}
                      className="text-dark"
                    >
                      {model.name}
                    </Link>
                  </h5>
                  <p className="text-muted mb-3 text-uppercase">{brand.name}</p>
                  <Link
                    to={`/brands/${brand.id}/${brand.name}/models/${
                      model.id
                    }/${slugify(model.name, { lower: true })}`}
                    className="text-decoration-underline text-primary"
                  >
                    Xem các vấn đề <i className="mdi mdi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

export default ModelGrid
