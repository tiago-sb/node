import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mock__/mockEntityManager.mock"
import { User } from "../entities/User"
import { UserRepository } from "./UserRepository"

describe('UserRepository', () => {
  let userRepository: UserRepository
  let managerMock: Partial<EntityManager>

  beforeAll(async() => {
    const mock = await getMockEntityManager({})
    userRepository = new UserRepository(mock as EntityManager)
  })

  const mockUser: User = new User('testando','testando@gmail.com','1001')

  it('um usuario deve ser cadastrado no db', async() => {
    await userRepository.createUser(mockUser)
    expect(managerMock.save).toHaveBeenCalled()
  })
})