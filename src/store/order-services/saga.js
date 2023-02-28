import { call, put, takeEvery } from "redux-saga/effects"

//OrderService Redux States
import { GET_ORDER_SERVICE_LIST } from "./actionTypes"

import {
  getOrderServicesListsSuccess,
  getOrderServicesListsFail,
} from "./actions"

import { getOrderServicesLists } from "../../helpers/fakebackend_helper"

function* fetchOrderServicessLists() {
  try {
    const response = yield call(getOrderServicesLists)
    yield put(getOrderServicesListsSuccess(response))
  } catch (error) {
    yield put(getOrderServicesListsFail(error))
  }
}

function* orderServicesSaga() {
  yield takeEvery(GET_ORDER_SERVICE_LIST, fetchOrderServicessLists)
}

export default orderServicesSaga
