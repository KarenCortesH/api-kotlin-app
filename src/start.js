const environment = require('./environment')

const app = require('./app')

const port = environment.APP_PORT

app.listen(port, () => {
  console.log('NODE JS app is running on port:', port, 'at', environment.NODE_ENV, 'environment.')
})
