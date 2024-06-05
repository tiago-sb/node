export interface IUser {
  name: string
  email: string
}

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

  public createUser = (name: string, email: string) => {
    const usuario = {
      name,
      email
    }

    this.db.push(usuario)
    console.log('DB atualizado', this.db)
  }

  public getAllUsers(){
    return this.db
  }
}