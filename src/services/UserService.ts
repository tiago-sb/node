import { sign } from 'jsonwebtoken'
import { AppDataSource } from '../database'
import { User } from '../entities/User'
import { UserRepository } from '../repositories/UserRepository'
import { IUser } from './IUserService'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository = new UserRepository(AppDataSource.manager)){
    this.userRepository = userRepository
  }

  public criarUsuario = async (nome: string, email: string, senha: string) => {
    const user = new User(nome, email, senha)
    return this.userRepository.createUser(user)
  }
  
  deletarUsuario = (id: string) => {}

  public getUser = async (user_id: string): Promise<User | null> => {
    return this.userRepository.getUsuario(user_id)
  }

  public getAutenticateUser = (nome: string, email: string, senha: string): Promise<User | null> => {
    return this.userRepository.getUsuarioEmailSenha(nome, email, senha)
  }

  getToken = async (nome: string, email: string, senha: string): Promise<string> => {
    const user = await this.getAutenticateUser(nome, email, senha)
    
    if(!user){ throw new Error('Erro') }

    const tokenData = {
      nome: user?.nome,
      email: user?.email,

    }

    const tokenKey = '1001'

    const tokenOptions = {
      subject: user?.user_id
    }

    const token = sign(tokenData, tokenKey, tokenOptions)

    return token
  }
}

export { IUser }
