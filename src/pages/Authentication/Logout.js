import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { logoutUser } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const Logout = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logoutUser(props.history))
  }, [dispatch])

  setTimeout(() => {
    dispatch(logoutUser(props.history))
  }, 6 * 60 * 60 * 1000)

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
