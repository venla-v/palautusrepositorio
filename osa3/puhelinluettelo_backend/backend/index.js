const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

const Person = require('./models/person.js')
app.use(express.static('dist'))


const logger= morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})

app.use(logger)




let persons = [
    {
      id: "1",
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: "2",
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: "3",
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
  ]

  
  app.get('/api/persons', (req, res, next) => {
    Person.find({}).then((people) => {
      res.json(people)
    })
    .catch(error => next(error))
  })
 

  app.get('/info', (request, response, next) => {
    const nro = persons.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${nro} people</p>
        <p>${date}</p>`)
        .catch(error => next(error))
  })
  
  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
    .catch(error => next(error))
  })
  
  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

  const generateId = () => {
    const personid = Math.floor(Math.random() * 10000)
    return String(personid)
  }
  
  app.post('/api/persons', (request, response, next) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }

    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === body.name) {
            return response.status(400).json({ 
                error: 'name must be unique' 
        })
        }
    }
  
    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId(),
    })
    
    person.save().then(savedPerson => {
            response.json(savedPerson)
          })
          .catch(error => next(error))
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    }
    next(error)
  }
  
  // tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
  app.use(errorHandler)

  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })