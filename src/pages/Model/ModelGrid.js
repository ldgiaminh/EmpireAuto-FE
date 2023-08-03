import React, { useState } from "react"
import { Link } from "react-router-dom"
import { map } from "lodash"
import slugify from "slugify"
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
} from "reactstrap"

const ModelGrid = ({ models, brand }) => {
  const [options, setOptions] = useState(false)
  return (
    <React.Fragment>
      {map(models, model => (
        <Col xl="4" sm="6" key={model.id}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="avatar-md me-4">
                  <span className="avatar-title rounded-circle bg-transparent text-danger font-size-16">
                    <img
                      src={model.brand && model.brand.photo}
                      alt=""
                      height="55"
                    />
                  </span>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="text-truncate font-size-17 contact-links d-flex justify-content-between">
                    <strong className="text-black">{model.name}</strong>
                    {/* <Dropdown
                      isOpen={options}
                      toggle={() => {
                        setOptions(!options)
                      }}
                    >
                      <DropdownToggle
                        tag="a"
                        className="btn nav-btn"
                        type="button"
                        id={"model" + model.id}
                      >
                        <i className="fa fa-fw fa-bars" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem
                          id={"model" + model.id}
                          href={`/edit-model/${model.id}`}
                        >
                          Ưu tiên
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}
                    <Link
                      to={`/edit-model/${model.id}`}
                      id={"model" + model.id}
                      className="font-size-20"
                    >
                      <i className="mdi mdi-playlist-edit" />
                      <UncontrolledTooltip
                        placement="top"
                        target={"model" + model.id}
                      >
                        Cập nhật
                      </UncontrolledTooltip>
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
