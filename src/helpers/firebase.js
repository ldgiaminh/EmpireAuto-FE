// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyAPtftCfGOJfkIlRcoQ4QoJTwP1xXuBlm8",
  authDomain: "empirefirebase.firebaseapp.com",
  databaseURL:
    "https://empirefirebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "empirefirebase",
  storageBucket: "empirefirebase.appspot.com",
  messagingSenderId: "120247352484",
  appId: "1:120247352484:web:e267ed43c28f5ca580fa31",
  measurementId: "G-XBJLT0HTXL",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const storage = getStorage(app)
export const messaging = getMessaging(app)

export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload)
    })
  })

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
