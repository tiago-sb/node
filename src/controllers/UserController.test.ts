import { makeMockResponse } from '../__mock__/mockResponse'
import { UserService } from '../services/UserService'
import { UserController } from './UserController'
import { Request } from 'express'

describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn()
  }
  
  const userController = new UserController(mockUserService as UserService)

  it('deve adicionar um novo usuario', () => {
    const mockRequest = {
      body: {
        name: 'tiago',
        email: 'tiago@gmail.com'
      }
    } as Request

    const mockResponse = makeMockResponse()
    userController.criarUsuario(mockRequest, mockResponse)
    
    expect(mockResponse.state.status).toBe(201)
    expect(mockResponse.state.json).toMatchObject({ message: 'USUARIO CRIADO' })
  })
})