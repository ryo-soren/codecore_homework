const express = require("express")
const knex = require("../db/client")
const router = express.Router()


router.get("/", (req,res) => {
    knex("super_teams")
    .orderBy('id')
    .then(cohorts => {
    res.render("super_team/index", {cohorts: cohorts})
    })
})
router.get("/new", (req,res) => {
    res.render("super_team/new")
})
router.get("/index", (req,res) => {
    res.render("super_team/index")
})
router.get("/:id", (req,res) => {
    res.render("super_team/view")
})


module.exports = router
