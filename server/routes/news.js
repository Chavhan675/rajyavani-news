const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    message: "News API working",
    news: [
      {
        title: "Rajyavani News Portal Launched",
        content: "This is a demo news article"
      }
    ]
  })
})

module.exports = router