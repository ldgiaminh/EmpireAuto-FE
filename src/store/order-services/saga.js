import { call, put, takeEvery } from "redux-saga/effects"

//OrderService Redux States
import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_DETAIL,
  PUT_ORDER_SERVICE,
  PUT_ASSIGN_EXPERT,
  PUT_CONFIRM_SERVICES,
  GET_STATUS_LOG,
  PUT_CONFIRM_PAID_SERVICES,
  POST_CHECKOUT_SERVICES,
  CHECKOUT_SERVICES,
} from "./actionTypes"

import {
  getOrderServicesDetailsFail,
  getOrderServicesDetailsSuccess,
  getOrderServicesListByStatusSuccess,
  getOrderServicesListByStatusFail,
  getStatusLogSuccess,
  putAssignExpertsSuccess,
  putAssignExpertsFail,
  checkOutServiceSuccess,
  checkOutServiceFail,
} from "./actions"

import {
  getOrderServicesListByStatus,
  getOrderServicesDetails,
  putAssignExperts,
  getStatusLog,
  checkOutService,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

// function* fetchOrderServicessLists() {
//   try {
//     const response = yield call(getOrderServicesLists)
//     yield put(getOrderServicesListsSuccess(response))
//   } catch (error) {
//     yield put(getOrderServicesListsFail(error))
//   }
// }

function* fetchOrderServiceListByStatus({ status, history }) {
  try {
    const response = yield call(getOrderServicesListByStatus, status)
    yield put(getOrderServicesListByStatusSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getOrderServicesListByStatusFail(error))
  }
}

function* fetchOrderServicesDetails({ orderServiceId, history }) {
  try {
    const response = yield call(getOrderServicesDetails, orderServiceId)
    yield put(getOrderServicesDetailsSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getOrderServicesDetailsFail(error))
  }
}

// function* onRecommendService({ payload: { orderServiceId, services } }) {
//   try {
//     const response = yield call(putOrderServices, orderServiceId, services)
//     yield put(putOrderServicesSuccess(response))
//   } catch (error) {
//     yield put(putOrderServicesFail(error))
//   }
// }

function* onAssignExpert({ payload: { orderServiceId, exId } }) {
  try {
    const response = yield call(putAssignExperts, orderServiceId, exId)
    yield put(putAssignExpertsSuccess(response))
    toast.success("Đã phân công cho " + response.expert.fullname)
  } catch (error) {
    yield put(putAssignExpertsFail(error))
  }
}

// function* onConfirmServices({ payload: { orderServiceId, services } }) {
//   try {
//     const response = yield call(putConfirmServices, orderServiceId, services)
//     yield put(putConfirmServicesSuccess(response))
//   } catch (error) {
//     yield put(putConfirmServicesFail(error))
//   }
// }

// function* onConfirmPaidServices({ payload: { orderServiceId, services } }) {
//   try {
//     const response = yield call(putConfirmPaid, orderServiceId, services)
//     yield put(putConfirmPaidSuccess(response))
//   } catch (error) {
//     yield put(putConfirmPaidFail(error))
//   }
// }

function* checkOutServices({ id, history }) {
  try {
    const response = yield call(checkOutService, id)
    history.push(`/order-services/${response[0].id}`)
    yield put(checkOutServiceSuccess(response))
    toast.success(
      "Check-out thành công phương tiện " + response[0].car.carLisenceNo
    )
  } catch (error) {
    console.log(error)
    if (error.response.status === 500) {
      toast.error(error.response.data.message)
      yield put(checkOutServiceFail(error))
    } else {
      toast.error("Check-out thất bại")
      yield put(checkOutServiceFail(error))
    }
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
  //yield takeEvery(GET_ORDER_SERVICE_LIST, fetchOrderServicessLists)
  yield takeEvery(
    GET_ORDER_SERVICE_LIST_BY_STATUS,
    fetchOrderServiceListByStatus
  )
  yield takeEvery(GET_ORDER_SERVICE_DETAIL, fetchOrderServicesDetails)
  // yield takeEvery(PUT_ORDER_SERVICE, onRecommendService)
  yield takeEvery(PUT_ASSIGN_EXPERT, onAssignExpert)
  //yield takeEvery(PUT_CONFIRM_SERVICES, onConfirmServices)
  // yield takeEvery(PUT_CONFIRM_PAID_SERVICES, onConfirmPaidServices)
  yield takeEvery(CHECKOUT_SERVICES, checkOutServices)
  yield takeEvery(GET_STATUS_LOG, fetchStatusLog)
}

export default orderServicesSaga
