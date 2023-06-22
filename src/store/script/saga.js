import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  RUN_REMOVE_SCRIPT_BOOKING,
  RUN_SCRIPT_BOOKING,
  RUN_SCRIPT_CHECKIN,
  RUN_SCRIPT_CHECKOUT_ORDER,
  RUN_SCRIPT_CONFIRM_PAID_ORDER,
  RUN_SCRIPT_CUSTOMER,
  RUN_SCRIPT_DIAGNOSE_ORDER,
  RUN_SCRIPT_DONE_ORDER,
} from "./actionTypes"

import {
  runRemoveScriptBookingFail,
  runRemoveScriptBookingSuccess,
  runScriptBookingFail,
  runScriptBookingSuccess,
  runScriptCheckInFail,
  runScriptCheckInSuccess,
  runScriptCheckOutFail,
  runScriptCheckOutSuccess,
  runScriptConfirmPaidFail,
  runScriptConfirmPaidSuccess,
  runScriptCustomerFail,
  runScriptCustomerSuccess,
  runScriptDiagnoseFail,
  runScriptDiagnoseSuccess,
  runScriptDoneFail,
  runScriptDoneSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  runRemoveScriptBookings,
  runScriptBookings,
  runScriptCheckIn,
  runScriptCheckOut,
  runScriptConfirmPaid,
  runScriptCustomers,
  runScriptDiagnose,
  runScriptDone,
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

function* onRunScriptCheckIns({ number }) {
  try {
    const response = yield call(runScriptCheckIn, number)
    yield put(runScriptCheckInSuccess(response))
    toast.success("Checkin thành công " + number + " đặt lịch")
    localStorage.setItem("scriptCheckIn", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptCheckInFail(error))
  }
}

function* onRunScriptDiagnoses({ number }) {
  try {
    const response = yield call(runScriptDiagnose, number)
    yield put(runScriptDiagnoseSuccess(response))
    toast.success("Chẩn đoán thành công " + number + " đặt lịch")
    localStorage.setItem("scriptDiagnose", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptDiagnoseFail(error))
  }
}

function* onRunScriptConfirmPaids({ payload: { data } }) {
  try {
    const response = yield call(runScriptConfirmPaid, data)
    yield put(runScriptConfirmPaidSuccess(response))
    toast.success(
      "Xác nhận & Thanh toán thành công " + response.length + " hóa đơn"
    )
    localStorage.setItem("scriptConfirmPaid", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptConfirmPaidFail(error))
  }
}

function* onRunScriptDones({ payload: data }) {
  try {
    const response = yield call(runScriptDone, data)
    yield put(runScriptDoneSuccess(response))
    toast.success("Hoàn tất thành công " + data.length + " dịch vụ")
    localStorage.setItem("scriptDone", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptDoneFail(error))
  }
}

function* onRunScriptCheckOuts({ payload: data }) {
  try {
    const response = yield call(runScriptCheckOut, data)
    yield put(runScriptCheckOutSuccess(response))
    toast.success("Check-out thành công " + data.length + " phương tiện")
    localStorage.setItem("scriptCheckOut", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptCheckOutFail(error))
  }
}

function* scriptSaga() {
  yield takeEvery(RUN_SCRIPT_CUSTOMER, onRunScriptCustomers)
  yield takeEvery(RUN_SCRIPT_BOOKING, onRunScriptBookings)
  yield takeEvery(RUN_REMOVE_SCRIPT_BOOKING, onRemoveRunScriptBookings)
  yield takeEvery(RUN_SCRIPT_DIAGNOSE_ORDER, onRunScriptDiagnoses)
  yield takeEvery(RUN_SCRIPT_CHECKIN, onRunScriptCheckIns)
  yield takeEvery(RUN_SCRIPT_CONFIRM_PAID_ORDER, onRunScriptConfirmPaids)
  yield takeEvery(RUN_SCRIPT_DONE_ORDER, onRunScriptDones)
  yield takeEvery(RUN_SCRIPT_CHECKOUT_ORDER, onRunScriptCheckOuts)
}

export default scriptSaga
