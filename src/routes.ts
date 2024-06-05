// para trabalhar com as rotas no contexto do backand
import { Router, Request, Response } from "express";
import { UserController } from './controllers/UserController'

const userController = new UserController()

export const router = Router()

// criando um novo usuario 
router.post('/user', userController.criarUsuario)

// obtendo os dados de todos os usuarios presentes em meu db
router.get('/user', userController.getAllUsers)

// metodo para simular um usuario deletado
router.delete('/user', (request: Request, response: Response) => {
  const usuario = request.body
  console.log(usuario)
  return response.status(200).json({ message: 'usuario deletado' })
})