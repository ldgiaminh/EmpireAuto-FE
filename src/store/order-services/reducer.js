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
  POST_CHECKOUT_SERVICES_SUCCESS,
  POST_CHECKOUT_SERVICES_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_DETAIL,
  PUT_ASSIGN_EXPERT,
} from "./actionTypes"

const INIT_STATE = {
  orderServicess: [],
  orderServicesDetails: {},
  orderServiceLogs: [],
  error: {},
  isLoading: false,
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
        orderServicesDetails: action.payload,
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

    case PUT_ORDER_SERVICE_SUCCESS:
      return {
        ...state,
        orderServicesDetails: action.payload,
      }

    case PUT_ORDER_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case PUT_ASSIGN_EXPERT:
      return {
        ...state,
        isLoading: true,
      }

    case PUT_ASSIGN_EXPERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicesDetails: {
          ...state.orderServicesDetails,
        },
      }

    case PUT_ASSIGN_EXPERT_FAIL:
      console.log(state.error)
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case PUT_CONFIRM_SERVICES_SUCCESS:
      return {
        ...state,
        orderServicesDetails: state.orderServicesDetails.map(service =>
          service.id.toString() === action.payload.id.toString()
            ? { ...action.pay.load, service }
            : service
        ),
      }

    case PUT_CONFIRM_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case PUT_CONFIRM_PAID_SERVICES_SUCCESS:
      return {
        ...state,
        orderServicesDetails: state.orderServicesDetails.map(service =>
          service.id.toString() === action.payload.id.toString()
            ? { ...action.pay.load, service }
            : service
        ),
      }

    case PUT_CONFIRM_PAID_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_CHECKOUT_SERVICES_SUCCESS:
      return {
        ...state,
        orderServiceLogs: action.payload,
        orderServicesDetails: state.orderServicesDetails.map(service =>
          service.id.toString() === action.payload.orderServiceId.toString()
            ? { ...action.pay.load, service }
            : service
        ),
      }

    case POST_CHECKOUT_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default orderServices
