const express = require('express')
let products = require('./produtos')

const app = express()

app.use(express.json())

app.get('/products', (req, res) => {
    res.status(200).json(products)
})

app.post('/products', (req, res) => {
    const content = req.body
    const newProducts = [...products, ...content]

    res.status(201).json(newProducts)
})

app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id)
    const content = req.body

    const product = products.find(product => product.id === id)

    if(!product) return res.status(400).json({"message": 'Produto não encontrado'})

    products = products.map(product => {
        if(product.id === id) return {...product, ...content}
        return product
    })

    res.status(200).json(products)
})

app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id)

    const product = products.find(product => product.id === id)

    if(!product) return res.status(400).json({"message": 'Produto não encontrado'})

    products = products.filter(product => product.id !== id)

    res.status(200).json(products)
})

app.listen(3000, () => console.log('Server rodando na porta 3000'))