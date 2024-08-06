import { request, Request, response, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
  userService: UserService

  constructor(userService = new UserService()){
    this.userService = userService
  }

  // metodo para criacao de um novo usuario no db
  public criarUsuario = (request: Request, response: Response) => {
    const novoUsuario = request.body
    
    if(!novoUsuario.name){
      return response.status(400).json({ message: 'nome obrigatório'})
    }

    if (!novoUsuario.email){
      return response.status(400).json({ message: 'email obrigatório'})
    }

    if(!novoUsuario.senha){
      return response.status(400).json({message: 'senha obrigatória'})
    }

    this.userService.criarUsuario(novoUsuario.name, novoUsuario.email, novoUsuario.senha)
    return response.status(201).json({ message: 'USUARIO CRIADO' })
  }

  public getUsers = async (request: Request, response: Response) => {
    const {user_id} = request.params
    const user = await this.userService.getUser(user_id)
    
    return response.status(200).json(user)
  }

  deletarUsuario(request: Request, response: Response){
    const user = request.body
    return response.status(200).json({ message: 'deletado' })
  }
}
