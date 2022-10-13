const express = require("express")
const app = express()
const superTeamRouter = require("./routes/super_team_picker")
const logger = require("morgan")
const path = require("path")
const methodOverride = require("method-override")

app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/super_team_picker", superTeamRouter)

app.use(
    methodOverride((req, res) => {
        if (req.body && req.body._method) {
            const method = req.body._method;
            return method;
        }
    })
);

app.set('view engine', 'ejs')
app.set('views', 'views')

const PORT = 3000;
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})