import { IUser, UserService } from "./UserService"

describe('UserService', () => {
  const mockDb: IUser[] = []
  // instanciando o objeto para realizar os testes posteriores
  const userService = new UserService(mockDb)

  // realiza o teste unitario no metodo especifico
  it('Deve adicionar novo usuário', () => {
    const mockConsole = jest.spyOn(global.console, 'log')
    userService.criarUsuario('tiago', 'tiago@gmail.com')

    // esperamos que o mockConsole seja chamado
    expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
  })
})