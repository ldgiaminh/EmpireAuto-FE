import {
  ADD_CAR_MODEL_FAIL,
  ADD_CAR_MODEL_SUCCESS,
  DELETE_CAR_MODEL_FAIL,
  DELETE_CAR_MODEL_SUCCESS,
  UPDATE_CAR_MODEL_FAIL,
  UPDATE_CAR_MODEL_SUCCESS,
  GET_CARS_MODEL_FAIL,
  GET_CARS_MODEL_SUCCESS,
  GET_CAR_MODEL_DETAIL_FAIL,
  GET_CAR_MODEL_DETAIL_SUCCESS,
  GET_CARS_MODEL_BY_BRAND_SUCCESS,
  GET_CARS_MODEL_BY_BRAND_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  carsModel: [],
  carsModelDetail: {},
  error: {},
}

const models = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARS_MODEL_SUCCESS:
      return {
        ...state,
        carsModel: action.payload,
      }

    case GET_CARS_MODEL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CARS_MODEL_BY_BRAND_SUCCESS:
      return {
        ...state,
        carsModel: action.payload,
      }

    case GET_CARS_MODEL_BY_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CAR_MODEL_SUCCESS:
      return {
        ...state,
        carsModel: [...state.carsModel, action.payload],
      }

    case ADD_CAR_MODEL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_MODEL_DETAIL_SUCCESS:
      return {
        ...state,
        carsModelDetail: action.payload,
      }

    case UPDATE_CAR_MODEL_SUCCESS:
      return {
        ...state,
        carsModel: state.carsModel.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_CAR_MODEL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CAR_MODEL_SUCCESS:
      return {
        ...state,
        carsModel: state.carsMODEL.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CAR_MODEL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_MODEL_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default models
