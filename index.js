// It's important that dotenv gets imported before the note model is imported. This ensures that the environment variables from the .env file are available globally before the code from the other modules is imported.
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('combined'))
app.use(cors())

const Note = require('./models/note')


// let notes = [
//     {
//         id: 1,
//         content: 'As long as you dont give up, you are the winner!',
//         important: true
//     },
//     {
//         id: 2,
//         content: 'Be as the best forgiver!!!',
//         important: false
//     },
//     {
//         id: 3,
//         content: 'em ro soosthannav, gun is the beautiful myan!',
//         important: true
//     }
// ]

app.get('/api/notes', (request, response) => {
    Note.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    Note.find({ _id: id }).then(result => {
        response.json(result)
    }).catch(error => {
        response.json(error)
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body
    console.log('post: body content', body.content)

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = {
        content: body.content,
        important: body.important
    }

    Note.create(note).then(result => {
        console.log(result)
        response.json(result)
    })

})

app.put('/api/notes/:id', (request, response) => {
    const body = request.body

    console.log('seeing body: ', body)

    let id = request.params.id
    // response.json(request.body)

    Note.updateOne({ _id: id }, { important: body.important }).then(result => {
        console.log('put result:', result)
        response.status(200).end()
    })

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