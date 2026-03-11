"use client"

import { useEffect, useState } from "react"
import api from "../lib/api"

export default function AdBanner({ position }) {

  const [ads, setAds] = useState([])

  useEffect(() => {

    const fetchAds = async () => {

      try {
        const res = await api.get(`/api/ads/position/${position}`)
        setAds(res.data || [])
      } catch (err) {
        console.log("Ads disabled or API not available")
        setAds([])
      }

    }

    fetchAds()

  }, [position])

  if (!ads.length) return null

  return (
    <div>
      {ads.map(ad => (
        <a key={ad._id} href={ad.link} target="_blank">

          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${ad.image}`}
            alt="Advertisement"
            style={{ width: "100%", margin: "10px 0" }}
          />

        </a>
      ))}
    </div>
  )
}