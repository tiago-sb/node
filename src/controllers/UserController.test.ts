import { makeMockRequest } from '../__mock__/mockRequest.mock'
import { makeMockResponse } from '../__mock__/mockResponse.mock'
import { UserService } from '../services/UserService'
import { UserController } from './UserController'
import { Request } from 'express'

const mockUserService = {
  criarUsuario: jest.fn()
}

jest.mock('../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return { criarUsuario: jest.fn() }
    })
  }
})

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

  it('informe do user_id do usuario', () => {
    const mockRequest = makeMockRequest({
      params: {
        user_id: '1001'
      }
    })
    const mockResponse = makeMockResponse()
    
    userController.getUsers(mockRequest, mockResponse)
    expect(mockUserService.getUser).toHaveBeenCalledWith('1001')
    expect(mockResponse.state.status).toBe(200)
  })
})