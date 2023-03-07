import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_FAIL,
  GET_ORDER_SERVICE_LIST_SUCCESS,
  GET_ORDER_SERVICE_DETAIL,
  GET_ORDER_SERVICE_DETAIL_FAIL,
  GET_ORDER_SERVICE_DETAIL_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET OrderServices LIST 
================================================
*/
export const getOrderServicesLists = () => ({
  type: GET_ORDER_SERVICE_LIST,
})

export const getOrderServicesListsSuccess = orderServicess => ({
  type: GET_ORDER_SERVICE_LIST_SUCCESS,
  payload: orderServicess,
})

export const getOrderServicesListsFail = error => ({
  type: GET_ORDER_SERVICE_LIST_FAIL,
  payload: error,
})

/*
================================================ 
GET OrderServices list by date
================================================
*/
export const getOrderServicesListByStatus = status => ({
  type: GET_ORDER_SERVICE_LIST,
  status,
})

export const getOrderServicesListByStatusSuccess = orderServicess => ({
  type: GET_ORDER_SERVICE_LIST_SUCCESS,
  payload: orderServicess,
})

export const getOrderServicesListByStatusFail = error => ({
  type: GET_ORDER_SERVICE_LIST_FAIL,
  payload: error,
})

/*
================================================ 
GET OrderServices Detail 
================================================
*/
export const getOrderServicesDetails = orderServiceId => ({
  type: GET_ORDER_SERVICE_DETAIL,
  orderServiceId,
})

export const getOrderServicesDetailsSuccess = orderServicesDetails => ({
  type: GET_ORDER_SERVICE_DETAIL_SUCCESS,
  payload: orderServicesDetails,
})

export const getOrderServicesDetailsFail = error => ({
  type: GGET_ORDER_SERVICE_DETAIL_FAIL,
  payload: error,
})
