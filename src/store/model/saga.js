import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  ADD_NEW_CAR_BRAND,
  GET_CARS_BRAND,
  GET_CARS_MODEL_BY_BRAND,
} from "./actionTypes"

import {
  getCarsBrandSuccess,
  getCarsBrandFail,
  addNewCarsBrandSuccess,
  addNewCarsBrandFail,
  getCarsModelSuccess,
  getCarsModelFail,
  addNewCarsModelSuccess,
  addNewCarsModelFail,
  getCarsModelByBrandSuccess,
  getCarsModelByBrandFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  addNewCarsModel,
  getCarsModel,
  getCarsModelByBrand,
} from "../../helpers/fakebackend_helper"
import { GET_CARS_MODEL, ADD_NEW_CAR_MODEL } from "./actionTypes"

import { toast } from "react-toastify"

function* fetchCarsModel() {
  try {
    const response = yield call(getCarsModel)
    yield put(getCarsModelSuccess(response))
  } catch (error) {
    yield put(getCarsModelFail(error))
  }
}

function* fetchCarsModelByBrand({ id }) {
  try {
    const response = yield call(getCarsModelByBrand, id)
    yield put(getCarsModelByBrandSuccess(response))
  } catch (error) {
    yield put(getCarsModelByBrandFail(error))
  }
}

function* onAddModel({ payload: carsModel, history, brandName }) {
  try {
    const response = yield call(addNewCarsModel, carsModel)
    yield put(addNewCarsModelSuccess(response))
    toast.success("Tạo mới thành công " + response.name)
    history.push(`/brands/${carsModel.brandId}/${brandName}`)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
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
  yield takeEvery(GET_CARS_MODEL_BY_BRAND, fetchCarsModelByBrand)
  yield takeEvery(ADD_NEW_CAR_MODEL, onAddModel)
  // yield takeEvery(GET_USER_PROFILE, fetchUserProfile)

  // yield takeEvery(UPDATE_USER, onUpdateUser)
  // yield takeEvery(DELETE_USER, onDeleteUser)
}

export default modelsSaga
