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

/* CUSTOMER */

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

/* BOOKING */

function* onRunScriptBookings({ number, payload: { data } }) {
  try {
    const response = yield call(runScriptBookings, number, data)
    yield put(runScriptBookingSuccess(response))
    const countSuccess = response.filter(b => b.statusCode === 201).length
    const countFail = response.filter(b => b.statusCode === 500).length

    if (countSuccess > 0) {
      toast.success("Tạo mới thành công " + countSuccess + " đặt lịch")
    } else {
      toast.error("Tạo thất bại " + countFail + " đặt lịch")
    }
    localStorage.setItem("scriptBooking", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptBookingFail(error))
  }
}

/* REMOVE BOOKING */

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

/* CHECK-IN */

function* onRunScriptCheckIns({ number1, number2, payload: { data } }) {
  try {
    const response = yield call(runScriptCheckIn, number1, number2, data)
    yield put(runScriptCheckInSuccess(response))
    const countSuccess = response.filter(
      b => b.isArrived === true && b.isActived === true
    ).length
    const countFail = response.filter(
      b => b.isArrived === false && b.isActived === false
    ).length

    if (countSuccess > 0) {
      toast.success("Check-in thành công " + countSuccess + " đặt lịch")
    } else {
      toast.error("Check-in thất bại " + countFail + " đặt lịch")
    }
    localStorage.setItem("scriptCheckIn", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptCheckInFail(error.response.data.message))
  }
}

/* DIAGNOSE */

function* onRunScriptDiagnoses({ payload: { data } }) {
  try {
    const response = yield call(runScriptDiagnose, data)
    yield put(runScriptDiagnoseSuccess(response))
    const countSuccess = response.filter(o => o.statusCode === 200).length
    const countFail = response.filter(b => b.statusCode === 500).length
    if (countSuccess > 0) {
      toast.success("Chẩn đoán thành công " + countSuccess + " phương tiện")
    } else {
      toast.error("Chẩn đoán thất bại " + countFail + " phương tiện")
    }
    localStorage.setItem("scriptDiagnose", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptDiagnoseFail(error))
  }
}

/* CONFIRM & PAID */

function* onRunScriptConfirmPaids({ number1, number2, payload: { data } }) {
  try {
    const response = yield call(runScriptConfirmPaid, number1, number2, data)
    yield put(runScriptConfirmPaidSuccess(response))
    const countSuccess = response.filter(o => o.statusCode === 200).length
    const countFail = response.filter(b => b.statusCode === 500).length
    if (countSuccess > 0) {
      toast.success(
        "Xác nhận & Thanh toán thành công " + countSuccess + " hóa đơn"
      )
    } else {
      toast.error("Xác nhận & Thanh toán thất bại " + countFail + " hóa đơn")
    }
    localStorage.setItem("scriptConfirmPaid", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptConfirmPaidFail(error.response.data))
  }
}

/* DONE */

function* onRunScriptDones({ payload: data }) {
  try {
    const response = yield call(runScriptDone, data)
    yield put(runScriptDoneSuccess(response))
    const countSuccess = response.filter(o => o.statusCode === 200).length
    const countFail = response.filter(b => b.statusCode === 500).length
    if (countSuccess > 0) {
      toast.success("Hoàn tất thành công " + countSuccess + " hóa đơn")
    } else {
      toast.error("Hoàn tất thất bại " + countFail + " hóa đơn")
    }
    localStorage.setItem("scriptDone", JSON.stringify(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(runScriptDoneFail(error))
  }
}

/* CHECK-OUT */

function* onRunScriptCheckOuts({ payload: data }) {
  try {
    const response = yield call(runScriptCheckOut, data)
    yield put(runScriptCheckOutSuccess(response))
    const countSuccess = response.filter(o => o.statusCode === 200).length
    const countFail = response.filter(b => b.statusCode === 500).length
    if (countSuccess > 0) {
      toast.success("Check-out thành công " + countSuccess + " phương tiện")
    } else {
      toast.error("Check-out thất bại " + countFail + " phương tiện")
    }
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
