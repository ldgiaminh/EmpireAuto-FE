import { onMessageListener } from "helpers/firebase"
import React, { useEffect, useState } from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"

const NotificationMessaging = () => {
  const [noti, setNoti] = useState({
    title: "",
    body: "",
  })

  const [isShow, setIsShow] = useState(false)

  const toggleToast = () => {
    setIsShow(!isShow)
  }

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
  }, [])

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
