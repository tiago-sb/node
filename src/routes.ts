// para trabalhar com as rotas no contexto do backand
import { Router, Request, Response } from 'express';
import { UserController } from './controllers/UserController'
import { UserService } from "./services/UserService";
import { LoginController } from './controllers/LoginController';

const userController = new UserController()
const loginController = new LoginController()
export const router = Router()


// criando um novo usuario 
router.post('/user', userController.criarUsuario)

// obtendo os dados de todos os usuarios presentes em meu db
router.get('/user/:user_id', userController.getUsers)

// metodo para simular um usuario deletado
router.delete('/user/:id', async (request: Request, response: Response) => {
  const userService = new UserService()

  try{
    const resultado = await userService.deletarUsuario(request.params.id)
    
    response.status(200).json(resultado)
  } catch(error){
    response.status(500).json({ message: 'Erro ao deletar usuario' })
  }
})

router.post('/login', loginController.login)