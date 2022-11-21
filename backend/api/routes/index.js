const bodyParser = require('body-parser')
const cadastro = require('./cadastrosRoute')

module.exports = app =>{
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        cadastro
        )
}

