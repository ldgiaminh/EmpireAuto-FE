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

const INIT_STATE = {
  scriptBooking: [],
  scriptCustomer: [],
  scriptRemoveBooking: [],
  isLoadScript: false,
}

const scripts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case RUN_SCRIPT_CUSTOMER:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptCustomer: action.payload,
      }

    case RUN_SCRIPT_CUSTOMER_FAIL:
      return {
        ...state,
        isLoadScript: false,
        error: action.payload,
      }
    case RUN_SCRIPT_BOOKING:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_BOOKING_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptBooking: action.payload,
      }

    case RUN_SCRIPT_BOOKING_FAIL:
      return {
        ...state,
        isLoadScript: false,
        error: action.payload,
      }

    case RUN_REMOVE_SCRIPT_BOOKING:
      return {
        ...state,
        isLoadScriptBooking: true,
      }
    case RUN_REMOVE_SCRIPT_BOOKING_SUCCESS:
      return {
        ...state,
        isLoadScriptBooking: true,
        scriptRemoveBooking: action.payload,
      }

    case RUN_REMOVE_SCRIPT_BOOKING_FAIL:
      return {
        ...state,
        isLoadScriptBooking: true,
        error: action.payload,
      }

    default:
      return state
  }
}

export default scripts
