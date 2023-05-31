import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  ADD_NEW_CAR_BRAND,
  GET_CARS_BRAND,
  UPDATE_CAR_BRAND,
} from "./actionTypes"

import {
  getCarsBrandSuccess,
  getCarsBrandFail,
  addNewCarsBrandSuccess,
  addNewCarsBrandFail,
  getCarsBrandDetailSuccess,
  getCarsBrandDetailFail,
  updateCarsBrandSuccess,
  updateCarsBrandFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  addNewCarsBrand,
  getCarsBrand,
  getCarsBrandDetails,
  updateCarsBrand,
} from "../../helpers/fakebackend_helper"
import { GET_CAR_BRAND_DETAIL } from "./actionTypes"

import { toast } from "react-toastify"

function* fetchCarsBrand() {
  try {
    const response = yield call(getCarsBrand)
    yield put(getCarsBrandSuccess(response))
  } catch (error) {
    yield put(getCarsBrandFail(error))
  }
}

function* fetchCarsBrandDetail({ carsBrandId }) {
  try {
    const response = yield call(getCarsBrandDetails, carsBrandId)
    yield put(getCarsBrandDetailSuccess(response))
  } catch (error) {
    yield put(getCarsBrandDetailFail(error))
  }
}

function* onAddBrand({ payload: carBrand }) {
  try {
    const response = yield call(addNewCarsBrand, carBrand)
    yield put(addNewCarsBrandSuccess(response))
    toast.success("Tạo mới thành công " + response.name)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewCarsBrandFail(error))
  }
}

function* onUpdateCarBrand({ payload: carBrand }) {
  try {
    const response = yield call(updateCarsBrand, carBrand)
    yield put(updateCarsBrandSuccess(response))
  } catch (error) {
    yield put(updateCarsBrandFail(error))
  }
}

function* brandsSaga() {
  yield takeEvery(GET_CARS_BRAND, fetchCarsBrand)
  yield takeEvery(GET_CAR_BRAND_DETAIL, fetchCarsBrandDetail)
  yield takeEvery(ADD_NEW_CAR_BRAND, onAddBrand)
  yield takeEvery(UPDATE_CAR_BRAND, onUpdateCarBrand)
}

export default brandsSaga
