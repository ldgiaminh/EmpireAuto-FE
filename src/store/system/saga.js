import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import { GET_BOOKING_SLOT, GET_CAR_IN_GARAGE } from "./actionTypes"

import {
  getBookingSlotFail,
  getBookingSlotSuccess,
  getCarInGarageFail,
  getCarInGarageSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getBookingSlot,
  getCarInGarage,
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

function* systemSaga() {
  yield takeEvery(GET_BOOKING_SLOT, onGetBookingSlots)
  yield takeEvery(GET_CAR_IN_GARAGE, onCarInGarages)
}

export default systemSaga
