import { call, put, takeEvery } from "redux-saga/effects"

//OrderService Redux States
import { GET_ORDER_SERVICE_LIST, GET_ORDER_SERVICE_DETAIL } from "./actionTypes"

import {
  getOrderServicesListsSuccess,
  getOrderServicesListsFail,
  getOrderServicesDetailsFail,
  getOrderServicesDetailsSuccess,
} from "./actions"

import {
  getOrderServicesLists,
  getOrderServicesDetails,
} from "../../helpers/fakebackend_helper"

function* fetchOrderServicessLists() {
  try {
    const response = yield call(getOrderServicesLists)
    yield put(getOrderServicesListsSuccess(response))
  } catch (error) {
    yield put(getOrderServicesListsFail(error))
  }
}

function* fetchOrderServicesDetails({ orderServiceId }) {
  try {
    const response = yield call(getOrderServicesDetails, orderServiceId)
    yield put(getOrderServicesDetailsSuccess(response))
  } catch (error) {
    yield put(getOrderServicesDetailsFail(error))
  }
}

function* orderServicesSaga() {
  yield takeEvery(GET_ORDER_SERVICE_LIST, fetchOrderServicessLists)
  yield takeEvery(GET_ORDER_SERVICE_DETAIL, fetchOrderServicesDetails)
}

export default orderServicesSaga
