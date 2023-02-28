import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_FAIL,
  GET_ORDER_SERVICE_LIST_SUCCESS,
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
