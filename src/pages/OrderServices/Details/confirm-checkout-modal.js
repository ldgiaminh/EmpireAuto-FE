import React from "react"
import PropTypes from "prop-types"
import { Modal } from "reactstrap"

const ConfirmCheckOut = props => {
  const { isOpen, toggle, order, handleCheckOut } = props

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h4 className="modal-title mt-0" id="myModalLabel">
            Check-out phương tiện ?
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
          {(() => {
            switch (order.status) {
              case 0:
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình phân công kỹ thuật viên
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 1:
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình chẩn đoán
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 2:
                // Code for status 2
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình xác nhận và thanh toán các dịch vụ
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 3:
                // Code for status 3
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình thực hiện dịch vụ
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 4:
                // Code for status 4
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đã
                    hoàn tất dịch vụ
                    <br />
                    Vui lòng kiểm tra phương tiện trước khi khách nhận xe
                  </p>
                )
              default:
                return null // Return null or fallback JSX for other status values
            }
          })()}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={handleCheckOut}
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

ConfirmCheckOut.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  expert: PropTypes.object,
  order: PropTypes.object,
}

export default ConfirmCheckOut
