import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Modal } from "reactstrap"

import { useDispatch } from "react-redux"

const ConfirmAutoAssign = props => {
  const { isOpen, toggle, order, handleAutoAssignExpert } = props

  const dispatch = useDispatch()

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h4 className="modal-title mt-0" id="myModalLabel">
            Chỉ định kỹ thuật viên
          </h4>
          <button
            type="button"
            onClick={toggle}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {order.expert !== null ? (
            <>
              <h5>
                Chỉ định kỹ thuật viên khác ngoài {order.expert.fullname} cho
                phương tiện {order.car.carLisenceNo} ?
              </h5>
            </>
          ) : (
            <>
              <h5>
                Chỉ định kỹ thuật viên cho phương tiện {order.car.carLisenceNo}{" "}
                ?
              </h5>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={handleAutoAssignExpert}
            className="btn btn-success "
          >
            Xác nhận
          </button>
          <button
            type="button"
            onClick={toggle}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </Modal>
    </>
  )
}

ConfirmAutoAssign.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  expert: PropTypes.object,
  order: PropTypes.object,
}

export default ConfirmAutoAssign
