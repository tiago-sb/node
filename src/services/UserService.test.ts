import { IUser, UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repository/UserRepository')
jest.mock('../database', () => {
  initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repository/UserRepository')

describe('UserService', () => {
  const userService = new UserService(mockUserRepository)  
  const mockUser = {
    id_user: '1001',
    nome: 'tiago',
    email: 'tiago@gmail.com',
    senha: '1001'
  }

  // realiza o teste unitario no metodo especifico
  it('Deve adicionar novo usuário', async () => {
    mockUserRepository.criarUsuario = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    
    const response = await userService.criarUsuario('tiago', 'tiago@gmail.com','1001')
    expect(mockUserRepository.criarUsuario).toHaveBeenCalled()
    expect(response).toMatchObject({
      id_user: '1001',
      name: 'tiago',
      email: 'tiago@gmail.com',
      senha: '1001'
    })
  })

  it('teste que verifica um tokem de usuario', async () => {
    jest.spyOn(userService, 'getAutenticateUser').mockImplementation(() => Promise.resolve<any>(mockUser))
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
    
    const token = await userService.getToken('tiago', 'tiago@gmail.com', '1001')
    expect(token).toBe('token')
  })

  it('excessao caso nao encontre usuario', async() => {
    jest.spyOn(userService, 'getAutenticateUser').mockImplementation(() => Promise.resolve<any>(null))
    await expect(userService.getToken('invalido', 'invalido@gmail.com', '1001')).rejects.toThrow(new Error('Erro'))
  })
})