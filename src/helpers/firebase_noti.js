import { getToken, onMessage } from "firebase/messaging"
import { messaging } from "helpers/firebase"
import { useEffect } from "react"

async function requestPermission() {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    // Generate Token
    const token = await getToken(messaging, {
      vapidKey:
        "BJjxtgb-iAq8YgbzV2bSIHxRjMLFTs39YpX5qeZBzxXM4yeOnr0HbyTCNCmEhm6LkM1-f4UvzDdWxtDLphFSg-8",
    })
    console.log("Token Gen", token)
    // Send this token  to server ( db)
  } else if (permission === "denied") {
    alert("You denied for the notification")
  }
}

requestPermission()
