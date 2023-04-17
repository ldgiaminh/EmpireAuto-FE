import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import { ADD_NEW_CAR_BRAND, GET_CARS_BRAND } from "./actionTypes"

import {
  getCarsBrandSuccess,
  getCarsBrandFail,
  addNewCarsBrandSuccess,
  addNewCarsBrandFail,
  getCarsModelSuccess,
  getCarsModelFail,
  addNewCarsModelSuccess,
  addNewCarsModelFail,
} from "./actions"

//Include Both Helper File with needed methods
import { addNewCarsModel, getCarsModel } from "../../helpers/fakebackend_helper"
import { GET_CARS_MODEL } from "./actionTypes"
import { ADD_NEW_CAR_MODEL } from "./actionTypes"

function* fetchCarsModel() {
  try {
    const response = yield call(getCarsModel)
    yield put(getCarsModelSuccess(response))
  } catch (error) {
    yield put(getCarsModelFail(error))
  }
}

function* onAddModel({ payload: carsModel }) {
  try {
    const response = yield call(addNewCarsModel, carsModel)
    yield put(addNewCarsModelSuccess(response))
  } catch (error) {
    yield put(addNewCarsModelFail(error))
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

function* modelsSaga() {
  yield takeEvery(GET_CARS_MODEL, fetchCarsModel)
  // yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_CAR_MODEL, onAddModel)
  // yield takeEvery(UPDATE_USER, onUpdateUser)
  // yield takeEvery(DELETE_USER, onDeleteUser)
}

export default modelsSaga
