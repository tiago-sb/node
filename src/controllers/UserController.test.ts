import { makeMockResponse } from '../__mock__/mockResponse'
import { UserService } from '../services/UserService'
import { UserController } from './UserController'
import { Request } from 'express'

describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    criarUsuario: jest.fn()
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

  it('Deve retornar erro se o nome do usuario não for informado', () => {
    const mockRequest = {
        body: {
            email: 'tiago@gmail.com'
        }
    } as Request

    const mockResponse = makeMockResponse()
    userController.criarUsuario(mockRequest, mockResponse)
    
    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({ message: 'Nome é obrigatório' })
  })

  it('Deve chamar a função getAllUsers para verificar se ela esta sendo chamada', () => {
      mockUserService.getAllUsers = jest.fn();
      userController.getAllUsers({} as Request,
          { status: jest.fn(), json: jest.fn() } as any,
      )
      
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
  })
})