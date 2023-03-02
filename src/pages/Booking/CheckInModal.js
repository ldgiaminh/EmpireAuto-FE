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
import { useSelector, useDispatch } from "react-redux"

import { getBookingDetails as onGetBookingDetail } from "store/bookings/actions"

const CheckInModal = props => {
  const { isOpen, toggle, bookingId } = props

  const dispatch = useDispatch()

  const { bookingDetail } = useSelector(state => ({
    bookingDetail: state.bookings.bookingDetail,
  }))

  useEffect(() => {
    if (bookingId) {
      dispatch(onGetBookingDetail(bookingId))
    }
  }, [bookingId, onGetBookingDetail])
  return (
    <>
      {!isEmpty(bookingDetail) && (
        <Modal
          isOpen={isOpen}
          role="dialog"
          autoFocus={true}
          centered={true}
          className="exampleModal"
          tabIndex="-1"
          toggle={toggle}
        >
          <div className="modal-content">
            <ModalHeader toggle={toggle}>Order Details</ModalHeader>
            <ModalBody>
              <p className="mb-2">
                Product id:{" "}
                <span className="text-primary">#{bookingDetail.code}</span>
              </p>
              <p className="mb-4">
                Billing Name:{" "}
                <span className="text-primary">
                  {bookingDetail.user.fullname}
                </span>
              </p>

              {/* <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div>
                      <img src={img7} alt="" className="avatar-sm" />
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">
                        Wireless Headphone (Black)
                      </h5>
                      <p className="text-muted mb-0">$ 225 x 1</p>
                    </div>
                  </td>
                  <td>$ 255</td>
                </tr>
                <tr>
                  <th scope="row">
                    <div>
                      <img src={img4} alt="" className="avatar-sm" />
                    </div>
                  </th>
                  <td>
                    <div>
                      <h5 className="text-truncate font-size-14">
                        Hoodie (Blue)
                      </h5>
                      <p className="text-muted mb-0">$ 145 x 1</p>
                    </div>
                  </td>
                  <td>$ 145</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-end">Sub Total:</h6>
                  </td>
                  <td>$ 400</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-end">Shipping:</h6>
                  </td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-end">Total:</h6>
                  </td>
                  <td>$ 400</td>
                </tr>
              </tbody>
            </Table>
          </div> */}
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="secondary" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      )}
    </>
  )
}

CheckInModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  bookingId: PropTypes.string,
}

export default CheckInModal
