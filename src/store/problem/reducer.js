import {
  ADD_CAR_PROBLEM_FAIL,
  ADD_CAR_PROBLEM_SUCCESS,
  DELETE_CAR_PROBLEM_FAIL,
  DELETE_CAR_PROBLEM_SUCCESS,
  UPDATE_CAR_PROBLEM_FAIL,
  UPDATE_CAR_PROBLEM_SUCCESS,
  GET_CARS_PROBLEM_FAIL,
  GET_CARS_PROBLEM_SUCCESS,
  GET_CAR_PROBLEM_DETAIL_FAIL,
  GET_CAR_PROBLEM_DETAIL_SUCCESS,
  GET_CAR_PROBLEM_BY_MODEL_SUCCESS,
  GET_CAR_PROBLEM_BY_MODEL_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  carsProblem: [],
  carsProblemDetail: {},
  error: {},
}

const problems = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARS_PROBLEM_SUCCESS:
      return {
        ...state,
        carsProblem: action.payload,
      }

    case GET_CARS_PROBLEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_PROBLEM_BY_MODEL_SUCCESS:
      return {
        ...state,
        carsProblem: action.payload,
      }

    case GET_CAR_PROBLEM_BY_MODEL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CAR_PROBLEM_SUCCESS:
      return {
        ...state,
        carsProblem: [...state.carsProblem, action.payload],
      }

    case ADD_CAR_PROBLEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_PROBLEM_DETAIL_SUCCESS:
      return {
        ...state,
        carsProblemDetail: action.payload,
      }

    case UPDATE_CAR_PROBLEM_SUCCESS:
      return {
        ...state,
        carsProblem: state.carsProblem.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_CAR_PROBLEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CAR_PROBLEM_SUCCESS:
      return {
        ...state,
        carsProblem: state.carsProblem.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CAR_PROBLEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_PROBLEM_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default problems
