import {
  GET_ORDER_SERVICE_LIST_FAIL,
  GET_ORDER_SERVICE_LIST_SUCCESS,
  GET_ORDER_SERVICE_DETAIL_FAIL,
  GET_ORDER_SERVICE_DETAIL_SUCCESS,
  GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS,
  PUT_ORDER_SERVICE_FAIL,
  PUT_ORDER_SERVICE_SUCCESS,
  PUT_ASSIGN_EXPERT_FAIL,
  PUT_ASSIGN_EXPERT_SUCCESS,
  GET_STATUS_LOG_SUCCESS,
  GET_STATUS_LOG_FAIL,
  PUT_CONFIRM_SERVICES_SUCCESS,
  PUT_CONFIRM_SERVICES_FAIL,
  PUT_CONFIRM_PAID_SERVICES_SUCCESS,
  PUT_CONFIRM_PAID_SERVICES_FAIL,
  CHECKOUT_SERVICES_SUCCESS,
  CHECKOUT_SERVICES_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_DETAIL,
  PUT_ASSIGN_EXPERT,
  CHECKOUT_SERVICES,
  GET_EXPERTS_INTENDED_TIME_SUCCESS,
  GET_EXPERTS_INTENDED_TIME_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  orderServicess: [],
  orderServicesDetail: {},
  error: {},
  isLoading: false,
  isLoad: false,
  orderServiceLogs: [],
  checkOut: [],
  exDetails: {},
}

const orderServices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDER_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        orderServicess: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_BY_STATUS:
      return {
        ...state,
        isLoading: true,
      }

    case GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicess: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case GET_ORDER_SERVICE_DETAIL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_ORDER_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicesDetail: action.payload,
      }

    case GET_ORDER_SERVICE_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case GET_STATUS_LOG_SUCCESS:
      return {
        ...state,
        orderServiceLogs: action.payload,
      }

    case GET_STATUS_LOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // case PUT_ORDER_SERVICE_SUCCESS:
    //   return {
    //     ...state,
    //     orderServicess: state.orderServicess.map(service =>
    //       service.id.toString() === action.payload.id.toString()
    //         ? { ...action.payload, service }
    //         : service
    //     ),
    //   }

    // case PUT_ORDER_SERVICE_SUCCESS:
    //   return {
    //     ...state,
    //     orderServicesDetail: action.payload,
    //   }

    // case PUT_ORDER_SERVICE_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    case PUT_ASSIGN_EXPERT:
      return {
        ...state,
        isLoading: true,
      }

    case PUT_ASSIGN_EXPERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicesDetail: action.payload,
      }

    case PUT_ASSIGN_EXPERT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case GET_EXPERTS_INTENDED_TIME_SUCCESS:
      return {
        ...state,
        exDetails: action.payload,
      }

    case GET_EXPERTS_INTENDED_TIME_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // case PUT_CONFIRM_PAID_SERVICES_SUCCESS:
    //   return {
    //     ...state,
    //     orderServicesDetail: state.orderServicesDetail.map(service =>
    //       service.id.toString() === action.payload.id.toString()
    //         ? { ...action.pay.load, service }
    //         : service
    //     ),
    //   }

    // case PUT_CONFIRM_PAID_SERVICES_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    case CHECKOUT_SERVICES:
      return {
        ...state,
        isLoad: true,
      }

    case CHECKOUT_SERVICES_SUCCESS:
      return {
        ...state,
        isLoad: false,
        checkOut: action.payload,
        orderServicess: state.orderServicess.map(service =>
          service.id.toString() === action.payload[0].id.toString()
            ? { ...action.pay.load, service }
            : service
        ),
      }

    case CHECKOUT_SERVICES_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default orderServices
