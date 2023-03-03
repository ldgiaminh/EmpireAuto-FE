import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { isEmpty, map } from "lodash"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"

const CheckInModal = props => {
  const { isOpen, toggle, data, handleCheckIn } = props

  return (
    <>
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
        key={data.id}
      >
        <div className="modal-content">
          <ModalHeader toggle={toggle}>Order Details</ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Mã code: <span className="text-primary">#{data.code}</span>
            </p>
            <p className="mb-4">
              Ngày đặt:{" "}
              <span className="text-primary">
                {new Date(data.date).toLocaleDateString()}
              </span>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="success"
              onClick={() => handleCheckIn(data.id)}
            >
              Check-in
            </Button>
            <Button type="button" color="secondary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  )
}

CheckInModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  handleCheckIn: PropTypes.func,
}

export default CheckInModal
