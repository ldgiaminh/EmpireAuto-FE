import { messaging, onMessageListener } from "helpers/firebase"
import React, { useEffect, useState } from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"
import PropTypes from "prop-types"

//Import dispatch
import { useDispatch } from "react-redux"
import { getToken } from "firebase/messaging"
import { postFcmToken } from "store/actions"

import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

const NotificationMessaging = props => {
  const dispatch = useDispatch()

  const [noti, setNoti] = useState({
    title: "",
    body: "",
  })

  const [uuid, setUuid] = useState("")

  const [isShow, setIsShow] = useState(false)

  const toggleToast = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setUuid(obj.firebaseUuid)

      // Get Fcm Token
      getToken(messaging, {
        vapidKey:
          "BJjxtgb-iAq8YgbzV2bSIHxRjMLFTs39YpX5qeZBzxXM4yeOnr0HbyTCNCmEhm6LkM1-f4UvzDdWxtDLphFSg-8",
      })
        .then(currentToken => {
          if (currentToken) {
            //console.log("Token ", currentToken)
            dispatch(postFcmToken(uuid, currentToken))
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            )
          }
        })
        .catch(err => {
          console.log("An error occurred while retrieving token. ", err)
        })
    }
  })

  //Listen Notification
  useEffect(() => {
    onMessageListener()
      .then(payload => {
        console.log("Received foreground message: ", payload)
        const notification = payload
        setNoti({
          title: notification.notification.title,
          body: notification.notification.body,
        })
        setIsShow(true)

        //Set a timeout for 10 seconds to close the notification
        setTimeout(() => {
          setIsShow(false)
        }, 5000)
      })
      .catch(err =>
        console.log(
          "An error occured while retrieving foreground message. ",
          err
        )
      )
  })

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
      <Toast isOpen={isShow}>
        <ToastHeader toggle={toggleToast}>
          {/* <img src={logo} alt="" className="me-2" height="18" /> */}
          {noti.title}
        </ToastHeader>
        <ToastBody>{noti.body}</ToastBody>
      </Toast>
    </div>
  )
}

export default NotificationMessaging

// NotificationMessaging.propTypes = {
//   success: PropTypes.any,
//   t: PropTypes.any,
// }

// const mapStateoProps = state => {
//   const { error, success } = state.Profile
//   return { error, success }
// }

// export default withRouter(connect(mapStateoProps, {})(NotificationMessaging))
