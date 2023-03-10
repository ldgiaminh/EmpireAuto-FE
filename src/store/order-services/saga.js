import { call, put, takeEvery } from "redux-saga/effects"

//OrderService Redux States
import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_DETAIL,
  PUT_ORDER_SERVICE,
  PUT_ASSIGN_EXPERT,
  GET_STATUS_LOG,
} from "./actionTypes"

import {
  getOrderServicesListsSuccess,
  getOrderServicesListsFail,
  getOrderServicesDetailsFail,
  getOrderServicesDetailsSuccess,
  getOrderServicesListByStatusSuccess,
  getOrderServicesListByStatusFail,
  putOrderServicesFail,
  putOrderServicesSuccess,
  putAssginExpertsFail,
  putAssginExpertsSuccess,
  getStatusLogFail,
  getStatusLogSuccess,
} from "./actions"

import {
  getOrderServicesLists,
  getOrderServicesListByStatus,
  getOrderServicesDetails,
  putOrderServices,
  putAssignExperts,
  getStatusLog,
} from "../../helpers/fakebackend_helper"
import { take } from "lodash"

function* fetchOrderServicessLists() {
  try {
    const response = yield call(getOrderServicesLists)
    yield put(getOrderServicesListsSuccess(response))
  } catch (error) {
    yield put(getOrderServicesListsFail(error))
  }
}

function* fetchOrderServiceListByStatus({ status }) {
  try {
    const response = yield call(getOrderServicesListByStatus, status)
    yield put(getOrderServicesListByStatusSuccess(response))
  } catch (error) {
    yield put(getOrderServicesListByStatusFail(error))
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

function* onRecommendService({ payload: { orderServiceId, services } }) {
  try {
    const response = yield call(putOrderServices, orderServiceId, services)
    yield put(putOrderServicesSuccess(response))
  } catch (error) {
    yield put(putOrderServicesFail(error))
  }
}

function* onAssignExpert({ payload: { orderServiceId, exId } }) {
  try {
    const response = yield call(putAssignExperts, orderServiceId, exId)
    yield put(putAssginExpertsSuccess(response))
  } catch (error) {
    yield put(putAssginExpertsFail(error))
  }
}

function* fetchStatusLog({ orderServiceId }) {
  try {
    const response = yield call(getStatusLog, orderServiceId)
    yield put(getStatusLogSuccess(response))
  } catch (error) {
    yield put(getStatusLogFail(error))
  }
}

function* orderServicesSaga() {
  yield takeEvery(GET_ORDER_SERVICE_LIST, fetchOrderServicessLists)
  // yield takeEvery(
  //   GET_ORDER_SERVICE_LIST_BY_STATUS,
  //   fetchOrderServiceListByStatus
  // )
  yield takeEvery(GET_ORDER_SERVICE_DETAIL, fetchOrderServicesDetails)
  yield takeEvery(PUT_ORDER_SERVICE, onRecommendService)
  yield takeEvery(PUT_ASSIGN_EXPERT, onAssignExpert)
  yield takeEvery(GET_STATUS_LOG, fetchStatusLog)
}

export default orderServicesSaga
