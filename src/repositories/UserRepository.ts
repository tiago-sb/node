import { EntityManager } from 'typeorm'
import { User } from '../entities/User'

export class UserRepository {
  private manager: EntityManager

  constructor(manager: EntityManager){
    this.manager = manager
  }

  // cria um usuario no banco de dados
  createUser = async (user: User) => {
    return this.manager.save(user)
  }

  getUsuario = async(userId: string): Promise<User | null> => {
    return this.manager.findOne(User, {where: { user_id: userId }})
  }
}
