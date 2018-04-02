import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './schema'
import { Employee, Survey, Company, Result } from './models'
import resolvers from './resolvers'

require('dotenv').config()
const { DB_USER, DB_PASS, DB_SECRET } = process.env
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@ds119059.mlab.com:19059/fuckit`

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, { useMongoClient: true })
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const app = express()


app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { Employee, Survey, Company, Result } })
)

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

module.exports = app
