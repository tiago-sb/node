import { IUser, UserService } from "./UserService"

jest.mock('../repository/UserRepository')
jest.mock('../database', () => {
  initialize: jest.fn()
})

const mockUserRepository = require('../repository/UserRepository')

describe('UserService', () => {
  const userService = new UserService(mockUserRepository)  

  // realiza o teste unitario no metodo especifico
  it('Deve adicionar novo usuário', async () => {
    mockUserRepository.criarUsuario = jest.fn().mockImplementation(() => Promise.resolve({
      id_user: '1001',
      name: 'tiago',
      email: 'tiago@gmail.com',
      senha: '1001'
    }))
    
    const response = await userService.criarUsuario('tiago', 'tiago@gmail.com','1001')
    expect(mockUserRepository.criarUsuario).toHaveBeenCalled()
    expect(response).toMatchObject({
      id_user: '1001',
      name: 'tiago',
      email: 'tiago@gmail.com',
      senha: '1001'
    })
  })
})