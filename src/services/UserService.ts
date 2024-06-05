import { IUser } from './IUserService'

const db = [
  {
    name: 'santos',
    email: 'santos@gmail.com',
  },
  {
    name: 'bela',
    email: 'bela@gmail.com',
  }
]

export class UserService {
  db: IUser []

  constructor(dataBase = db){
    this.db = dataBase
  }

  public criarUsuario = (name: string, email: string) => {
    const usuario = {
      name,
      email
    }

    this.db.push(usuario)
    console.log('DB atualizado', this.db)
  }
  
  deletarUsuario = (id: string) => {
    const index = this.db.findIndex((user) => {
      user.email === id
    })

    if (index == -1) {
      throw new Error('Usuário nao encontrado no banco')
    }

    this.db.splice(index, 1)
    return { message: 'Usuário deletado!' }
  }

  public getAllUsers(){
    return this.db
  }
}

export { IUser }
