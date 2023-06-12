import React, { useState } from "react"
import PropTypes from "prop-types"
import { Modal } from "reactstrap"

import { useDispatch } from "react-redux"

import { putAssignExperts as assignExpert } from "store/actions"

const ConfirmReassign = props => {
  const { isOpen, toggle, expert, order } = props

  const dispatch = useDispatch()

  const handleAssignExpert = () => {
    const exId = expert.value
    const orderId = order.id
    if ((orderId, exId)) {
      dispatch(assignExpert(orderId, exId))
    }
    toggle(false)
  }

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Chỉ định kỹ thuật viên
          </h5>
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
          <h5>
            Chỉ định {expert && expert.name} cho phương tiện{" "}
            {order.car.carLisenceNo} ?
          </h5>
          {expert && expert.isMax && (
            <p>
              Số xe mà kỹ thuật viên {expert && expert.name} nhận đã đầy. Nếu
              "Xác nhận" chủ xe sẽ phải vào hàng chờ. Vui lòng thông báo cho chủ
              xe để xác nhận !!!{" "}
            </p>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={handleAssignExpert}
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

ConfirmReassign.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  expert: PropTypes.object,
  order: PropTypes.object,
}

export default ConfirmReassign
