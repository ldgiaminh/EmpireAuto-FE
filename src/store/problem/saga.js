import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States

import {
  getCarsProblemSuccess,
  getCarsProblemFail,
  addNewCarsProblemSuccess,
  addNewCarsProblemFail,
  getCarsProblemByModelSuccess,
  getCarsProblemByModelFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  addNewCarsProblem,
  getCarsProblem,
  getCarsProblemByModel,
} from "../../helpers/fakebackend_helper"
import {
  ADD_NEW_CAR_PROBLEM,
  GET_CARS_PROBLEM,
  GET_CAR_PROBLEM_BY_MODEL,
} from "./actionTypes"

import { toast } from "react-toastify"

function* fetchCarsProblem() {
  try {
    const response = yield call(getCarsProblem)
    yield put(getCarsProblemSuccess(response))
  } catch (error) {
    yield put(getCarsProblemFail(error))
  }
}

function* fetchCarsProblemByModel({ id }) {
  try {
    const response = yield call(getCarsProblemByModel, id)
    yield put(getCarsProblemByModelSuccess(response))
  } catch (error) {
    yield put(getCarsProblemByModelFail(error))
  }
}

function* onAddProblem({ payload: carsProblem }) {
  try {
    const response = yield call(addNewCarsProblem, carsProblem)
    toast.success("Tạo mới thành công " + response.name)
    yield put(addNewCarsProblemSuccess(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewCarsProblemFail(error))
  }
}

function* problemsSaga() {
  yield takeEvery(GET_CARS_PROBLEM, fetchCarsProblem)
  yield takeEvery(GET_CAR_PROBLEM_BY_MODEL, fetchCarsProblemByModel)
  yield takeEvery(ADD_NEW_CAR_PROBLEM, onAddProblem)
}

export default problemsSaga
