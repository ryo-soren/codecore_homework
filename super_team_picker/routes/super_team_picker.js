const express = require("express")
const knex = require("../db/client")
const router = express.Router()


router.get("/new", (req,res) => {
    res.render("super_team/new")
})

router.get("/", (req,res) => {
    knex("super_teams")
    .orderBy('id', "desc")
    .then(cohorts => {
    res.render("super_team/index", {cohorts: cohorts})
    })
})

router.get("/:id", (req,res) => {
    knex("super_teams")
    .where("id", req.params.id)
    .first()
    .then(cohort => {
        if (!cohort) {
            res.send("super_team/view", {cohort: false})
        } else {
            res.render("super_team/view", {cohort: cohort})
        }
    })
})

router.get("/:id/split_teams", (req,res) => {
    knex("super_teams")
    .where("id", req.params.id)
    .first()
    .then(cohort => {

        const method = req.query.teamMethod
        let quantity = parseFloat(req.query.quantity)
        const members = cohort.members.split(", ")
        let team_members = parseFloat(cohort.team_members)
        let memberSplit = []
        console.log(quantity);
        console.log(team_members+quantity);
        if (!cohort) {
            res.send("super_team/view", {cohort: false})
        } else {
            if (method === "team_count") {
                for (let i = 0; i < members.length; i += quantity) {
                    const sliced = members.slice(i, i+ quantity).join(", ")
                    memberSplit.push(sliced)
                }
                console.log(memberSplit);
                res.render("super_team/view", {cohort: cohort, memberSplit : memberSplit})
            } else {
                console.log(members.length);
                console.log(Math.ceil(team_members/quantity))
                for (let i = 0; i < members.length; i += team_members) {
                    const sliced = members.slice(i, i+(team_members/quantity)).join(", ")
                    console.log(sliced);
                    memberSplit.push(sliced)
                }
                console.log(memberSplit);
                res.render("super_team/view", {cohort: cohort, memberSplit : memberSplit})
            }

        }
    })
})


router.post("/", (req,res) =>{
    knex("super_teams")
    .insert({
        team_name: req.body.team_name,
        members: req.body.members,
        image_url: req.body.image_url
    })
    .returning("*")
    .then(cohorts => {
        const cohort = cohorts[0]
        res.redirect(`super_team_picker/${cohort.id}`)
    })
})

// router.post("/:id/split_teams", (req,res) =>{


//     knex("super_teams")
//     .returning("*")
//     .then(cohorts => {
//         console.log("I am here");
//         const cohort = cohorts[0]
//         res.redirect(`super_team_picker/${cohort.id}`)
//     })
// })





module.exports = router
