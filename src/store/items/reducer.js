import {
  ADD_CAR_ITEM_FAIL,
  ADD_CAR_ITEM_SUCCESS,
  DELETE_CAR_ITEM_FAIL,
  DELETE_CAR_ITEM_SUCCESS,
  UPDATE_CAR_ITEM_FAIL,
  UPDATE_CAR_ITEM_SUCCESS,
  GET_CARS_ITEM_FAIL,
  GET_CARS_ITEM_SUCCESS,
  GET_CAR_ITEM_DETAIL_FAIL,
  GET_CAR_ITEM_DETAIL_SUCCESS,
  GET_CARS_ITEM_BY_PROBLEM,
  GET_CARS_ITEM_BY_PROBLEM_SUCCESS,
  GET_CARS_ITEM_BY_PROBLEM_FAIL,
  ADD_NEW_CAR_ITEM,
} from "./actionTypes"

const INIT_STATE = {
  carsItem: [],
  carsItemDetail: {},
  error: {},
  isLoading: false,
}

const items = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARS_ITEM_SUCCESS:
      return {
        ...state,
        carsItem: action.payload,
      }

    case GET_CARS_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CARS_ITEM_BY_PROBLEM_SUCCESS:
      return {
        ...state,
        carsItem: action.payload,
      }

    case GET_CARS_ITEM_BY_PROBLEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_NEW_CAR_ITEM:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_CAR_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsItem: [...state.carsItem, action.payload],
      }

    case ADD_CAR_ITEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case GET_CAR_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        carsItemDetail: action.payload,
      }

    case UPDATE_CAR_ITEM_SUCCESS:
      return {
        ...state,
        carsItem: state.carsItem.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_CAR_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CAR_ITEM_SUCCESS:
      return {
        ...state,
        carsItem: state.carsItem.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CAR_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_ITEM_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default items
