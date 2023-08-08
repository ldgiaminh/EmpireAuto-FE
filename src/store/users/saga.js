import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  GET_USERS,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_EXPERTS,
  PUT_STATUS_EXPERTS,
} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
  getExpertsFail,
  getExpertsSuccess,
  putChangeStatusExpertSuccess,
  putChangeStatusExpertFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getUsers,
  getUserProfile,
  addNewUser,
  updateUser,
  deleteUser,
  getExperts,
  onChangeStatusExpert,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* fetchExperts() {
  try {
    const response = yield call(getExperts)
    yield put(getExpertsSuccess(response))
  } catch (error) {
    yield put(getExpertsFail(error))
  }
}

function* onChangeStatusExperts({ payload: expert }) {
  try {
    const response = yield call(onChangeStatusExpert, expert.id)
    yield put(putChangeStatusExpertSuccess(expert))

    expert.isAvailable &&
      toast.success("Đã bật trạng thái hoạt động của " + expert.fullname)
    !expert.isAvailable &&
      toast.success("Đã tắt trạng thái hoạt động của " + expert.fullname)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(putChangeStatusExpertFail(error))
  }
}

// function* fetchUserProfile() {
//   try {
//     const response = yield call(getUserProfile)
//     yield put(getUserProfileSuccess(response))
//   } catch (error) {
//     yield put(getUserProfileFail(error))
//   }
// }

// function* onUpdateUser({ payload: user }) {
//   try {
//     const response = yield call(updateUser, user)
//     yield put(updateUserSuccess(response))
//   } catch (error) {
//     yield put(updateUserFail(error))
//   }
// }

// function* onDeleteUser({ payload: user }) {
//   try {
//     const response = yield call(deleteUser, user)
//     yield put(deleteUserSuccess(response))
//   } catch (error) {
//     yield put(deleteUserFail(error))
//   }
// }

// function* onAddNewUser({ payload: user }) {
//   try {
//     const response = yield call(addNewUser, user)

//     yield put(addUserSuccess(response))
//   } catch (error) {
//     yield put(addUserFail(error))
//   }
//}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_EXPERTS, fetchExperts)
  yield takeEvery(PUT_STATUS_EXPERTS, onChangeStatusExperts)

  // yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  // yield takeEvery(ADD_NEW_USER, onAddNewUser)
  // yield takeEvery(UPDATE_USER, onUpdateUser)
  // yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
