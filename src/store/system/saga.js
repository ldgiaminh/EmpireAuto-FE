import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  GET_BOOKING_SLOT,
  GET_CAR_IN_GARAGE,
  PUT_CONFIG_SYSTEM,
} from "./actionTypes"

import {
  getBookingSlotFail,
  getBookingSlotSuccess,
  getCarInGarageFail,
  getCarInGarageSuccess,
  putConfigSystemFail,
  putConfigSystemSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getBookingSlot,
  getCarInGarage,
  onConfigSystem,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

/* BOOKING SLOT */

function* onGetBookingSlots() {
  try {
    const response = yield call(getBookingSlot)
    yield put(getBookingSlotSuccess(response))
  } catch (error) {
    yield put(getBookingSlotFail(error))
  }
}

/* CAR IN GARAGE */

function* onCarInGarages() {
  try {
    const response = yield call(getCarInGarage)
    yield put(getCarInGarageSuccess(response))
  } catch (error) {
    yield put(getCarInGarageFail(error))
  }
}

/* CONFIG SYSTEM */

function* onConfigSystems({ payload: config, history }) {
  try {
    const response = yield call(onConfigSystem, config)
    yield put(putConfigSystemSuccess(response))
    toast.success("Cập nhật hệ thống thành công")
    history.push("/dashboard")
  } catch (error) {
    yield put(putConfigSystemFail(error))
    toast.error("Cập nhất hệ thống thất bại")
  }
}

function* systemSaga() {
  yield takeEvery(GET_BOOKING_SLOT, onGetBookingSlots)
  yield takeEvery(GET_CAR_IN_GARAGE, onCarInGarages)
  yield takeEvery(PUT_CONFIG_SYSTEM, onConfigSystems)
}

export default systemSaga
