import { Column, Entity, PrimaryColumn } from "typeorm";
import { randomUUID } from 'crypto'

@Entity('usuarios')
export class User {
  @PrimaryColumn({ nullable: false })
  user_id: string

  @Column({ nullable: false })
  nome: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  senha: string

  constructor(nome: string, email: string, senha: string ){
    this.user_id = randomUUID()
    this.nome = nome
    this.email = email
    this.senha = senha
  }
}