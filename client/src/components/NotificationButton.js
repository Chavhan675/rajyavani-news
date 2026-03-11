"use client"

import { requestNotificationPermission } from "../firebase"

export default function NotificationButton(){

 return(

  <button
   onClick={requestNotificationPermission}
   className="bg-red-600 text-white px-4 py-2 rounded"
  >
   Enable Notifications
  </button>

 )

}