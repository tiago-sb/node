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

  public getAllUsers(){}
}

export { IUser }
