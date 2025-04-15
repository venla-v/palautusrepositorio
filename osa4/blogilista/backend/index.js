const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

app.use('/api/login', loginRouter)