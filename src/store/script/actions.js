import {
  RUN_REMOVE_SCRIPT_BOOKING,
  RUN_REMOVE_SCRIPT_BOOKING_FAIL,
  RUN_REMOVE_SCRIPT_BOOKING_SUCCESS,
  RUN_SCRIPT_BOOKING,
  RUN_SCRIPT_BOOKING_FAIL,
  RUN_SCRIPT_BOOKING_SUCCESS,
  RUN_SCRIPT_CUSTOMER,
  RUN_SCRIPT_CUSTOMER_FAIL,
  RUN_SCRIPT_CUSTOMER_SUCCESS,
} from "./actionTypes"

/*
================================================ 
POST Script Customer 
================================================
*/
export const runScriptCustomer = number => ({
  type: RUN_SCRIPT_CUSTOMER,
  number,
})

export const runScriptCustomerSuccess = scriptCustomer => ({
  type: RUN_SCRIPT_CUSTOMER_SUCCESS,
  payload: scriptCustomer,
})

export const runScriptCustomerFail = error => ({
  type: RUN_SCRIPT_CUSTOMER_FAIL,
  payload: error,
})

/*
================================================ 
POST Script Booking 
================================================
*/
export const runScriptBooking = number => ({
  type: RUN_SCRIPT_BOOKING,
  number,
})

export const runScriptBookingSuccess = scriptBooking => ({
  type: RUN_SCRIPT_BOOKING_SUCCESS,
  payload: scriptBooking,
})

export const runScriptBookingFail = error => ({
  type: RUN_SCRIPT_BOOKING_FAIL,
  payload: error,
})

/*
================================================ 
DELETE Script Booking 
================================================
*/
export const runRemoveScriptBooking = numberId => ({
  type: RUN_REMOVE_SCRIPT_BOOKING,
  payload: numberId,
})

export const runRemoveScriptBookingSuccess = scriptRemoveBooking => ({
  type: RUN_REMOVE_SCRIPT_BOOKING_SUCCESS,
  payload: scriptRemoveBooking,
})

export const runRemoveScriptBookingFail = error => ({
  type: RUN_REMOVE_SCRIPT_BOOKING_FAIL,
  payload: error,
})
