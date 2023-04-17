import {
  ADD_NEW_CAR_MODEL,
  ADD_CAR_MODEL_FAIL,
  ADD_CAR_MODEL_SUCCESS,
  DELETE_CAR_MODEL,
  DELETE_CAR_MODEL_FAIL,
  DELETE_CAR_MODEL_SUCCESS,
  UPDATE_CAR_MODEL,
  UPDATE_CAR_MODEL_FAIL,
  UPDATE_CAR_MODEL_SUCCESS,
  GET_CARS_MODEL,
  GET_CARS_MODEL_FAIL,
  GET_CARS_MODEL_SUCCESS,
  GET_CAR_MODEL_DETAIL,
  GET_CAR_MODEL_DETAIL_FAIL,
  GET_CAR_MODEL_DETAIL_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET MODELs 
================================================
*/
export const getCarsModel = () => ({
  type: GET_CARS_MODEL,
})

export const getCarsModelSuccess = carsModel => ({
  type: GET_CARS_MODEL_SUCCESS,
  payload: carsModel,
})

export const getCarsModelFail = error => ({
  type: GET_CARS_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
GET MODELs Detail
================================================
*/
export const getCarsModelDetail = () => ({
  type: GET_CAR_MODEL_DETAIL,
})

export const getCarsModelDetailSuccess = carsModelDetail => ({
  type: GET_CAR_MODEL_DETAIL_SUCCESS,
  payload: carsModelDetail,
})

export const getCarsModelDetailFail = error => ({
  type: GET_CAR_MODEL_DETAIL_FAIL,
  payload: error,
})

/*
================================================ 
POST Add New MODEL
================================================
*/

export const addNewCarsModel = carsModel => ({
  type: ADD_NEW_CAR_MODEL,
  payload: carsModel,
})

export const addNewCarsModelSuccess = carsModel => ({
  type: ADD_CAR_MODEL_SUCCESS,
  payload: carsModel,
})

export const addNewCarsModelFail = error => ({
  type: ADD_CAR_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
PUT MODELs Update
================================================
*/

export const updateCarsModel = carsModel => ({
  type: UPDATE_CAR_MODEL,
  payload: carsModel,
})

export const updateCarsModelSuccess = carsModel => ({
  type: UPDATE_CAR_MODEL_SUCCESS,
  payload: carsModel,
})

export const updateCarsModelFail = error => ({
  type: UPDATE_CAR_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
DELETE MODELs 
================================================
*/

export const deleteCarsModel = carsModel => ({
  type: DELETE_CAR_MODEL,
  payload: carsModel,
})

export const deleteCarsModelSuccess = carsModel => ({
  type: DELETE_CAR_MODEL_SUCCESS,
  payload: carsModel,
})

export const deleteCarsModelFail = error => ({
  type: DELETE_CAR_MODEL_FAIL,
  payload: error,
})
