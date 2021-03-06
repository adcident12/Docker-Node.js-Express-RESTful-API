const express = require('express')
const bodyParser = require('body-parser')

const store = require('./store')

const app = express()
app.use(bodyParser.json())

store.init()

app.get('/', (req, res) => {
    res.send('Hello World API!')
})

app.get('/item/', (req, res) => {
    res.send({ items: store.getAllItems() })
})

app.get('/item/:index', (req, res) => {
    const index = Number(req.params.index)
    const item = store.getItem(index)
    if(item === undefined) {
        res.status(404).end()
        return
    }
    res.send({ item })
})

app.post('/item/', (req, res) => {
    if(typeof req.body.item !== 'string') {
        res.status(400).end()
        return
    }

    store.addItem(req.body.item)

    res.status(201).end()
})

app.put('/item/:index', (req, res) => {
    if(store.getItem(Number(req.params.index)) === undefined) {
        res.status(404).end()
        return
    }

    if(typeof req.body.item !== 'string') {
        res.status(400).end()
        return
    }

    const oldItem = store.updateItem(Number(req.params.index), req.body.item)

    res.send({ oldItem })
})

app.delete('/item/:index', (req, res) => {
    if(store.getItem(Number(req.params.index)) === undefined) {
        res.status(404).end()
        return
    }

    const removeItem = store.removeItem(Number(req.body.index))

    res.send({ removeItem })
})

app.listen(3000,() => {
    console.log('Example app listening on port 3000!')
})
