const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.static('public'))

app.post('/cadastro', (req, res) => {
    const NewUser = req.body
    const user = JSON.parse(fs.readFileSync('users.json'))
    user.push(NewUser)
    fs.writeFileSync('users.json', JSON.stringify(user))
    res.json({mensagem: 'Usuario cadastrado!'})
})
app.post('/login', (req, res) => {
})

app.listen (3000)