import colors from 'colors/safe'

import { Server } from 'http'
import config from '../config/config'
import app from '../index'

let server: Server
export const databaseConnect = async () => {
  try {
    console.log(colors.bgBlack('Database is connected!'))
    server = app.listen(config.port, () => {
      console.log(colors.blue(`Our server listen port is: ${config.port}`))
    })
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
}

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      console.log(error)
      process.exit(1)
    })
  } else {
    process.exit(2)
  }
})

process.on('SIGTERM', () => {
  console.log('SIGTERM is received!')
  if (server) {
    server.close()
  }
})
