import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mock__/mockEntityManager.mock"
import { User } from "../entities/User"
import { UserRepository } from "./UserRepository"

describe('UserRepository', () => {
  let userRepository: UserRepository
  let managerMock: Partial<EntityManager>

  beforeAll(async() => {
    const mock = await getMockEntityManager({saveReturn: mockUser})

    userRepository = new UserRepository(mock as EntityManager)
  })

  const mockUser: User = new User('testando','testando@gmail.com','1001')

  it('um usuario deve ser cadastrado no db', async() => {
    const response = await userRepository.createUser(mockUser)
    expect(managerMock.save).toHaveBeenCalled()
    expect(response).toMatchObject(mockUser)
  })
})