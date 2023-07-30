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
  GET_CARS_PROBLEM,
  ADD_NEW_CAR_PROBLEM,
} from "./actionTypes"

const INIT_STATE = {
  carsProblem: [],
  carsProblemDetail: {},
  error: {},
  isLoading: false,
}

const problems = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET PROBLEM */
    case GET_CARS_PROBLEM:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CARS_PROBLEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblem: action.payload,
      }

    case GET_CARS_PROBLEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET PROBLEM BY MODEL */

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

    /* ADD NEW PROBLEM */

    case ADD_NEW_CAR_PROBLEM:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_CAR_PROBLEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblem: [...state.carsProblem, action.payload],
      }

    case ADD_CAR_PROBLEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET PROBLEM DETAIL */

    case GET_CAR_PROBLEM_DETAIL_SUCCESS:
      return {
        ...state,
        carsProblemDetail: action.payload,
      }

    case GET_CAR_PROBLEM_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* UPDATE PROBLEM  */

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

    /* DELETE PROBLEM  */

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

    default:
      return state
  }
}

export default problems
