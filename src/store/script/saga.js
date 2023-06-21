import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  RUN_REMOVE_SCRIPT_BOOKING,
  RUN_SCRIPT_BOOKING,
  RUN_SCRIPT_CUSTOMER,
} from "./actionTypes"

import {
  runRemoveScriptBookingFail,
  runRemoveScriptBookingSuccess,
  runScriptBookingFail,
  runScriptBookingSuccess,
  runScriptCustomerFail,
  runScriptCustomerSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  runRemoveScriptBookings,
  runScriptBookings,
  runScriptCustomers,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* onRunScriptCustomers({ number }) {
  try {
    const response = yield call(runScriptCustomers, number)
    yield put(runScriptCustomerSuccess(response))
    toast.success("Tạo mới thành công " + number + " khách hàng")
    localStorage.setItem("scriptCustomer", JSON.stringify(response))
  } catch (error) {
    yield put(runScriptCustomerFail(error))
    toast.error("Đã có lỗi xảy ra")
  }
}

function* onRunScriptBookings({ number }) {
  try {
    const response = yield call(runScriptBookings, number)
    yield put(runScriptBookingSuccess(response))
    toast.success("Tạo mới thành công " + number + " đặt lịch")
    localStorage.setItem("scriptBooking", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptBookingFail(error))
  }
}

function* onRemoveRunScriptBookings({ payload: numberId }) {
  try {
    const response = yield call(runRemoveScriptBookings, numberId)
    yield put(runRemoveScriptBookingSuccess(response))
    toast.success("Hủy thành công đặt lịch")
  } catch (error) {
    yield put(runRemoveScriptBookingFail(error))
    toast.error("Đã có lỗi xảy ra")
  }
}

function* scriptSaga() {
  yield takeEvery(RUN_SCRIPT_CUSTOMER, onRunScriptCustomers)
  yield takeEvery(RUN_SCRIPT_BOOKING, onRunScriptBookings)
  yield takeEvery(RUN_REMOVE_SCRIPT_BOOKING, onRemoveRunScriptBookings)
}

export default scriptSaga
