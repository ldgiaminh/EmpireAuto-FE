import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import {
  GET_BOOKING_LIST,
  GET_BOOKING_DETAIL,
  ADD_NEW_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
} from "./actionTypes"

import {
  getBookingListsFail,
  getBookingListsSuccess,
  getBookingDetailsFail,
  getBookingDetailsSuccess,
  addNewBookingFail,
  addNewBookingSuccess,
  deleteBookingError,
  deleteBookingSuccess,
  updateBookingFail,
  updateBookingSuccess,
} from "./actions"

import {
  getBookingsLists,
  getBookingsDetails,
} from "../../helpers/fakebackend_helper"

function* fetchBookingsLists() {
  try {
    const response = yield call(getBookingsLists)
    yield put(getBookingListsSuccess(response))
  } catch (error) {
    yield put(getBookingListsFail(error))
  }
}

function* fetchBookingsDetails({ bookingId }) {
  try {
    const response = yield call(getBookingsDetails, bookingId)
    yield put(getBookingDetailsSuccess(response))
  } catch (error) {
    yield put(getBookingDetailsFail(error))
  }
}

function* bookingsSaga() {
  yield takeEvery(GET_BOOKING_LIST, fetchBookingsLists)
  yield takeEvery(GET_BOOKING_DETAIL, fetchBookingsDetails)
}

export default bookingsSaga
