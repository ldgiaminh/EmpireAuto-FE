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
  ADD_NEW_CAR_MODEL,
  RESET_CARS_MODEL,
} from "./actionTypes"

const INIT_STATE = {
  carsModel: [],
  carsModelDetail: {},
  error: {},
  isLoading: false,
}

const models = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET MODEL */
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

    /* GET MODEL BY BRAND */
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

    /* ADD NEW MODEL */
    case ADD_NEW_CAR_MODEL:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_CAR_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsModel: [...state.carsModel, action.payload],
      }

    case ADD_CAR_MODEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET CAR MODEL */
    case GET_CAR_MODEL_DETAIL_SUCCESS:
      return {
        ...state,
        carsModelDetail: action.payload,
      }

    case GET_CAR_MODEL_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* UPDATE MODEL */
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

    /* DELETE MODEL */
    case DELETE_CAR_MODEL_SUCCESS:
      return {
        ...state,
        carsModel: state.carsModel.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CAR_MODEL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* RESET MODEL */
    case RESET_CARS_MODEL:
      return {
        ...state,
        carsModel: [],
      }

    default:
      return state
  }
}

export default models
