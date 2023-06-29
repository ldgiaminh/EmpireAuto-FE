import {
  GET_BOOKING_SLOT,
  GET_BOOKING_SLOT_FAIL,
  GET_BOOKING_SLOT_SUCCESS,
  GET_CAR_IN_GARAGE,
  GET_CAR_IN_GARAGE_FAIL,
  GET_CAR_IN_GARAGE_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET Booking Slot
================================================
*/
export const getBookingSlot = () => ({
  type: GET_BOOKING_SLOT,
})

export const getBookingSlotSuccess = bookingSlot => ({
  type: GET_BOOKING_SLOT_SUCCESS,
  payload: bookingSlot,
})

export const getBookingSlotFail = error => ({
  type: GET_BOOKING_SLOT_FAIL,
  payload: error,
})

/*
================================================ 
GET Car In Garage
================================================
*/
export const getCarInGarage = () => ({
  type: GET_CAR_IN_GARAGE,
})

export const getCarInGarageSuccess = carInGarage => ({
  type: GET_CAR_IN_GARAGE_SUCCESS,
  payload: carInGarage,
})

export const getCarInGarageFail = error => ({
  type: GET_CAR_IN_GARAGE_FAIL,
  payload: error,
})
