import PropTypes from "prop-types"
import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"

const CheckinModal = ({ show, onCheckinClick, onCloseClick }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h2>Xe đã đến?</h2>
              <h4>
                {"Hãy đảm bảo xe đã đến ga-ra, bạn sẽ không thể hoàn tác"}
              </h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2"
                onClick={onCheckinClick}
              >
                Check-in
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-2"
                onClick={onCloseClick}
              >
                Hủy
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

CheckinModal.propTypes = {
  onCloseClick: PropTypes.func,
  onCheckinClick: PropTypes.func,
  show: PropTypes.any,
}

export default CheckinModal
