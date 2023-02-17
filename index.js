const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

let notes = [
    {
        id: 1,
        content: 'As long as you dont give up, you are the winner!',
        important: true
    },
    {
        id: 2,
        content: 'Be as the best forgiver!!!',
        important: false
    },
    {
        id: 3,
        content: 'em ro soosthannav, gun is the beautiful myan!',
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = parseInt(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    }
    else {
        response.status(404).end()
    }
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    console.log('post: body content', body.content)

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: (notes.length > 0) ? 1 + Math.max(...notes.map(n => n.id)) : 0
    }

    notes = [...notes, note]

    response.status(201).json(note)
})

app.put('/api/notes/:id', (request, response) => {
    const body = request.body

    console.log(body)

    let id = Number(request.params.id)

    notes = notes.map(note => note.id !== id ? note : body)
    const updatedNote = notes.find(note => note.id === id)
    response.status(200).json(updatedNote).end()
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3007
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})