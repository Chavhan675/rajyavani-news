import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"

const firebaseConfig = {
 apiKey: "YOUR_API_KEY",
 authDomain: "YOUR_AUTH_DOMAIN",
 projectId: "YOUR_PROJECT_ID",
 messagingSenderId: "YOUR_SENDER_ID",
 appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)

export const requestNotificationPermission = async () => {

 if (typeof window === "undefined") return

 try {

  const messaging = getMessaging(app)

  const permission = await Notification.requestPermission()

  if (permission === "granted") {

   const token = await getToken(messaging, {
    vapidKey: "YOUR_VAPID_KEY"
   })

   console.log("Notification token:", token)

  }

 } catch (err) {

  console.error(err)

 }

}