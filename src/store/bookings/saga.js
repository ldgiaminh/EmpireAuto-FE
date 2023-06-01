import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import {
  GET_BOOKING_DETAIL,
  CHECKIN_BOOKING,
  GET_BOOKING_LIST_BY_DATE,
  CHECKIN_QRCODE,
} from "./actionTypes"

import {
  getBookingListsFail,
  getBookingListsSuccess,
  getBookingListsByDateFail,
  getBookingListsByDateSuccess,
  getBookingDetailsFail,
  getBookingDetailsSuccess,
  checkinBookingFail,
  checkinBookingSuccess,
  checkinQRCodeFail,
  checkinQRCodeSuccess,
} from "./actions"

import {
  getBookingsLists,
  getBookingListsByDate,
  getBookingsDetails,
  checkinBooking,
  checkinQRCode,
} from "../../helpers/fakebackend_helper"

// function* fetchBookingsLists() {
//   try {
//     const response = yield call(getBookingsLists)
//     yield put(getBookingListsSuccess(response))
//   } catch (error) {
//     yield put(getBookingListsFail(error))
//   }
// }

function* fetchBookingsListByDate({ date, history }) {
  try {
    const response = yield call(getBookingListsByDate, date)
    yield put(getBookingListsByDateSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getBookingListsByDateFail(error))
  }
}

function* fetchBookingsDetails({ bookingId, history }) {
  try {
    const response = yield call(getBookingsDetails, bookingId)
    yield put(getBookingDetailsSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getBookingDetailsFail(error))
  }
}

function* checkInBookings({ payload: { bookingId, isAssign } }) {
  try {
    const response = yield call(checkinBooking, bookingId, isAssign)
    yield put(checkinBookingSuccess(response))
  } catch (error) {
    yield put(checkinBookingFail(error))
  }
}

function* checkInQRCodes({ data }) {
  try {
    const response = yield call(checkinQRCode, data)
    yield put(checkinQRCodeSuccess(response))
  } catch (error) {
    yield put(checkinQRCodeFail(error))
  }
}

function* bookingsSaga() {
  // yield takeEvery(GET_BOOKING_LIST, fetchBookingsLists)
  yield takeEvery(GET_BOOKING_LIST_BY_DATE, fetchBookingsListByDate)
  yield takeEvery(GET_BOOKING_DETAIL, fetchBookingsDetails)
  yield takeEvery(CHECKIN_BOOKING, checkInBookings)
  yield takeEvery(CHECKIN_QRCODE, checkInQRCodes)
}

export default bookingsSaga
