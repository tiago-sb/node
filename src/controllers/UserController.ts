import { Request, Response } from 'express'
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
      return response.status(400).json({ message: 'nome invalido' })
    }

    this.userService.createUser(novoUsuario.name, novoUsuario.email)
    return response.status(201).json({ message: 'USUARIO CRIADO' })
  }

  public getAllUsers(request: Request, response: Response){
    const users = this.userService.getAllUsers()
    return response.status(200).json(users)
  }
}