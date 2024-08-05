// arquivo para as rotas do sistema
import 'reflect-metadata'
import express, { Request, Response } from 'express'
import { router } from './routes'
import { AppDataSource } from './database'

const server = express()

AppDataSource.initialize()
  .then(() => {console.log('inicializado com sucesso')})
  .catch((error) => console.log(error))
  
server.use(express.json())
server.use(router)

server.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'API DO DIOBANK' })
})

server.listen(5000, () => console.log('server online'))
