import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { UserService } from '../services/UserService'

export class LoginController {
  userService: UserService

  constructor(userService = new UserService()){
    this.userService = userService
  }

  // retorna um json de usuario com sinal de status 200
  login = async (request: Request, response: Response) => {
    const {nome, email, senha} = request.body
    try {
      const token = await this.userService.getToken(nome, email, senha)
      return response.status(200).json(token)
    } catch(error){
      return response.status(500).json(error)
    }
  }
}