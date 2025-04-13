const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://venlaveijalainenn:${password}@cluster0.9rhkpva.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[2]) {
    console.log("phonebook:")
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

else if (process.argv[3] && process.argv[4]) {
    const name = process.argv[3]
    const nro = process.argv[4]

    const person = new Person({
        name: name,
        number: nro,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${nro} to phonebook`)
        mongoose.connection.close()
      })
}

else {
    process.exit(1)
  }
