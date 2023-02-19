const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@firstcluster.legrnuq.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const SplNoteSchema = new mongoose.Schema({
    author: String,
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
const SplNote = mongoose.model('SplNote', SplNoteSchema)

// const splNote = new SplNote({
//     author: "Pavan",
//     content: 'Never blame another person for your failure!!!',
//     important: true,
// })

// splNote.save().then(result => {
//     console.log('special note is saved!')
//     mongoose.connection.close()
// })

// const note = new Note({
//     content: 'Need to explore MangoDB more and become handy of it!!!',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// Note.find({ important: true }).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })

SplNote.find({}).then(result => {
    result.forEach(splNote => {
        console.log(splNote)
    })
    mongoose.connection.close()
})
