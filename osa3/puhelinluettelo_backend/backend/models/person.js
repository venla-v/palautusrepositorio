const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI



console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const validate = function(number) {
    const nroOsat = number.split('-')

    if (nroOsat.length !== 2){
      return false
    }
    
    if (nroOsat[0].length === 2 || nroOsat[0].length === 3) {
      if (nroOsat[1].length >= 7){
        return true
      }
    }
    return false
  }

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: validate,
      message: 'Phone number format is invalid. Correct format: "000-000000" or "00-000000"'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
