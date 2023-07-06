import {
  API_SUCCESS,
  API_FAIL,
  GET_CHARTS_DATA,
  SEARCH_ALL,
  SEARCH_ALL_SUCCESS,
  SEARCH_ALL_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  chartsData: [],
  searchResults: [],
  isLoadSearch: false,
  error: {},
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsData: action.payload.data,
          }
        default:
          return state
      }
    case API_FAIL:
      switch (action.payload.actionType) {
        case GET_CHARTS_DATA:
          return {
            ...state,
            chartsDataError: action.payload.error,
          }

        default:
          return state
      }

    case SEARCH_ALL:
      return {
        ...state,
        isLoadSearch: true,
      }

    case SEARCH_ALL_SUCCESS:
      return {
        ...state,
        searchResults: false,
        users: action.payload,
      }

    case SEARCH_ALL_FAIL:
      return {
        ...state,
        isLoadSearch: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default Dashboard
