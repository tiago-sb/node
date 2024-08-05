import { EntityManager } from "typeorm";

interface MockManager {
  saveReturn?: object | [object]
}

export const getMockEntityManager = async({saveReturn = undefined}: MockManager): Promise<EntityManager> => {
  const manager: Partial<EntityManager> = {}

  manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn))

  return manager as EntityManager
}