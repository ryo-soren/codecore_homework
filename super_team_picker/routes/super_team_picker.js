const express = require("express")
const knex = require("../db/client")
const router = express.Router()


router.get("/", (req,res) => {
    res.render("super_team/home")
})
router.get("/new", (req,res) => {
    res.render("super_team/new")
})
router.get("/cohorts", (req,res) => {
    res.render("super_team/cohorts")
})


module.exports = router
