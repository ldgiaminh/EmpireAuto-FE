import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States

import {
  getCarsItemSuccess,
  getCarsItemFail,
  addNewCarsItemSuccess,
} from "./actions"
import { addNewCarsItem, getCarsItem } from "helpers/fakebackend_helper"
import { ADD_NEW_CAR_ITEM, GET_CARS_ITEM } from "./actionTypes"

//Include Both Helper File with needed methods

function* fetchCarsItem() {
  try {
    const response = yield call(getCarsItem)
    yield put(getCarsItemSuccess(response))
  } catch (error) {
    yield put(getCarsItemFail(error))
  }
}

function* onAddItem({ payload: carsItem }) {
  try {
    const response = yield call(addNewCarsItem, carsItem)
    yield put(addNewCarsItemSuccess(response))
  } catch (error) {
    yield put(addNewCarsItemFail(error))
  }
}

// function* fetchUserProfile() {
//   try {
//     const response = yield call(getUserProfile)
//     yield put(getUserProfileSuccess(response))
//   } catch (error) {
//     yield put(getUserProfileFail(error))
//   }
// }

// function* onUpdateUser({ payload: user }) {
//   try {
//     const response = yield call(updateUser, user)
//     yield put(updateUserSuccess(response))
//   } catch (error) {
//     yield put(updateUserFail(error))
//   }
// }

// function* onDeleteUser({ payload: user }) {
//   try {
//     const response = yield call(deleteUser, user)
//     yield put(deleteUserSuccess(response))
//   } catch (error) {
//     yield put(deleteUserFail(error))
//   }
// }

function* itemsSaga() {
  yield takeEvery(GET_CARS_ITEM, fetchCarsItem)
  // yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_CAR_ITEM, onAddItem)
  // yield takeEvery(UPDATE_USER, onUpdateUser)
  // yield takeEvery(DELETE_USER, onDeleteUser)
}

export default itemsSaga
