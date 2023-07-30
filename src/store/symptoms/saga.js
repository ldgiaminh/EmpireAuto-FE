import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import { ADD_NEW_SYMPTOMS, GET_SYMPTOMS_LIST } from "./actionTypes"

import {
  getSymptomsListsFail,
  getSymptomsListsSuccess,
  addNewBookingFail,
  addNewBookingSuccess,
  deleteBookingError,
  deleteBookingSuccess,
  updateBookingFail,
  updateBookingSuccess,
  addNewSymptomsSuccess,
  addNewSymptomsFail,
} from "./actions"

import { addNewSymptoms, getSymptoms } from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* fetchSymptomsLists() {
  try {
    const response = yield call(getSymptoms)
    yield put(getSymptomsListsSuccess(response))
  } catch (error) {
    yield put(getSymptomsListsFail(error))
  }
}

function* onAddSymptoms({ payload: symptoms, history }) {
  try {
    const response = yield call(addNewSymptoms, symptoms)
    yield put(addNewSymptomsSuccess(response))
    toast.success("Tạo mới thành công " + response.name)
    history.push("/symptoms")
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewSymptomsFail(error))
  }
}

// function* fetchBookingsDetails({ bookingId }) {
//   try {
//     const response = yield call(getBookingsDetails, bookingId)
//     yield put(getBookingDetailsSuccess(response))
//   } catch (error) {
//     yield put(getBookingDetailsFail(error))
//   }
// }

function* symptomsSaga() {
  yield takeEvery(GET_SYMPTOMS_LIST, fetchSymptomsLists)
  yield takeEvery(ADD_NEW_SYMPTOMS, onAddSymptoms)
}

export default symptomsSaga
